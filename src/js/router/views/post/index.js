import controllers from '../../../controllers/index';
import utils from '../../../utilities/utils';
import { initComment } from './comment';

async function init() {
  const menuIcon = document.getElementById("menuIcon");
  const closeIcon = document.getElementById("closeIcon");
  const mobileMenu = document.getElementById("mobile-menu");

  menuButton.addEventListener("click", () => {
    menuIcon.classList.toggle("hidden"); // Toggle 'hamburger' icon
    closeIcon.classList.toggle("hidden"); // Toggle 'close' icon
    mobileMenu.classList.toggle("hidden");// Toggle mobile menu visibility
  });


  const container = document.querySelector('.container');
  clearContent(container);

  try {
    const id = utils.getUrlParams('id');
    const post = await fetchPost(id);

    await renderPostElement(post, id, container);
    await renderCommentElement(post, id, container);

    attachEditEvent(id);
    attachDeleteEvent(id);
    
  } catch (error) {
    console.error('Error fetching posts:', error);
    container.innerHTML = '<p>Error loading post. Please try again later.</p>';
  }
}

function renderPostElement(post, id, target) {
  renderPost(post, target);
  attachEditEvent(id);
  attachDeleteEvent(id);
}

async function fetchPost(id) {
  const { data } = await controllers.PostController.post(id);
  return data;
}

function clearContent(target) {
  target.innerHTML = '';
}

async function renderPost(post, target) {
  const postElement = document.createElement('article');
  const SecondPostElement = document.createElement('div');

  postElement.classList.add('max-w-full', 'mx-auto', 'p-4', 'w-full','sm:w-1/2', 'lg:w-2/3');
  SecondPostElement.classList.add('max-w-full','mx-auto', 'p-4', 'w-full','sm:w-1/2', 'lg:w-2/3');

  const postCreated = utils.date(post.created);
  const tags = utils.formatTags(post.tags);


  postElement.innerHTML = `
      <img class="article__cover__image w-full h-auto object-cover md:rounded-lg" src="${
        post.media?.url ? post.media?.url : ''
      }" style="aspect-ratio: auto 1000/420;" width="1000" height="420" alt="${
    post.media?.alt ? post.media?.alt : ''
    }" />

  `;

  SecondPostElement.innerHTML= `
    <div class="p-4 max-w-full mx-auto break-all">
      <div class="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
        <div class="flex items-center mb-3">
          <div class="w-20 h-20 mr-4 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
             <a class="" href="/profile/?author=${post.author.name}">
              <img class="" src="${
              post.author.avatar.url
              }" alt="${post.author.avatar.alt} width="32" height="32" />
            </a>
          </div>
            <div class="">
              <div>
                <div>
                  <a href="/profile/?author=${post.author.name}">
                    <h2 class="text-white dark:text-white text-lg   font-medium hover:text-blue-600">
                      ${post.author.name}
                    </h2>
                  </a>
                </div>
                <div>
                  <h2 class="text-white dark:text-white text-lg font-medium">Posted on: ${postCreated}</h2>
                </div>
              </div>             

              <div class="flex flex-col justify-between flex-grow">
                <h2 class="leading-relaxed text-xl text-white dark:text-gray-300 ">
                  ${post.title}
                </h2>
      
                <div class="leading-relaxed text-base text-white dark:text-gray-300">
                  ${tags}
                </div>

                <div>
                  <div id="article-body" class="leading-relaxed text-xl text-white dark:text-gray-300 ">
                  ${post.body}
                </div>
              </div>
              <div class=" flex gap-4 ">
                  ${
                  isAuthor(post.author.name)
                  ? `<button class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" id="editPost">Edit Post</button>
                  <button class="w-full text-white btn-danger-cancel hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" id="deletePost">Delete Post</button>`
                  : ''
                  }
              </div>
            </div>
          </div>
        </div> 
      </div>   
    </div>     
  
  `
 
  target.appendChild(postElement);
  target.appendChild(SecondPostElement);
}

function attachEditEvent(id) {
  const editButton = document.getElementById('editPost');
  if (editButton) {
    editButton.addEventListener('click', () => {
      utils.redirectTo(`/post/edit/?id=${id}`);
    });
  }
}

function attachDeleteEvent(id) {
  const deleteButton = document.getElementById('deletePost');
  if (deleteButton) {
    deleteButton.addEventListener('click', async () => {
      const confirmed = window.confirm(
        'Are you sure you want to delete this post?'
      );
      if (confirmed) {
        controllers.PostController.onDeletePost(id);
      } else {
        console.log('Delete action canceled');
      }
    });
  }
}

function isAuthor(author) {
  const authUser = controllers.AuthController.authUser;
  if (authUser.name === author) return true;
  return false;
}

function renderCommentElement(post, id, target) {
  renderCommentInput(post.author, target);
  submitCommentHandler(id);
  const commentContainer = createCommentContainer();
  initComment(post.comments, commentContainer);
}

function renderCommentInput(user, target) {
  const commentElement = document.createElement('section');
  commentElement.id = 'comments';
  commentElement.setAttribute('class', 'flex flex-col max-w-screen-md mx-auto');

  commentElement.innerHTML = `
    <div id="comment-container" class="max-w-xl">
      <form name="comment" id="new_comment" class="flex">
        <span class=" mr-2 shrink-0">
          <img class="h-8 w-8 rounded-full" src="${user.avatar.url}" alt="${user.avatar.alt}" width="32" height="32" loading="lazy">
        </span>
        <div class="comment-form__inner">
          <div class="comment-form__field" data-tracking-name="comment_form_textfield">
            <textarea placeholder="Add to the discussion" (event)" id="text-area" class="crayons-textfield comment-textarea textfield--ghost" aria-label="Add a comment to the discussion" name="comment" rows="3" cols="50"></textarea>
          </div>
          <div class="my-4">
            <button type="submit" class="flex w-fit justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600btn-submit-comment mr-2" data-tracking-name="comment_submit_button">Submit</button>
          </div>
        </div>
      </form>
    </div>
  `;
  target.appendChild(commentElement);
}

function submitCommentHandler(id) {
  const form = document.forms.comment;
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      controllers.CommentController.onComment(event, id);
    });
  }
}

function createCommentContainer() {
  const section = document.querySelector('section');
  const commentContainer = document.getElementById('comments-container');
  if (commentContainer) {
    commentContainer = document.createElement('div');
    commentContainer.id = 'comments-container';
    commentContainer.setAttribute('class', 'comments flex');
    section.appendChild(commentContainer);
  }
  return section;
}




init();


