import controllers from '../../../controllers/index';
import utils from '../../../utilities/utils';

async function init() {
  const container = document.querySelector('.container');
  clearContent(container);
  try {
    const id = utils.getUrlParams('id');
    const post = await controllers.PostController.post(id);
    const { data } = post;
    renderPost(data, container)

    attachEditEvent(id);
    attachDeleteEvent(id);
    
  } catch (error) {
    console.error('Error fetching posts:', error);
    container.innerHTML = '<p>Error loading post. Please try again later.</p>';
  }
}

function clearContent(target) {
  target.innerHTML = '';
}

async function renderPost(post, target) {
  const postElement = document.createElement('article');
  postElement.classList.add('article');
  const postCreated = utils.date(post.created);
  const tags = utils.formatTags(post.tags);

  postElement.innerHTML = `
    <header id="main-title" class="article__header">
      <img class="article__cover__image" src="${
        post.media?.url ? post.media?.url : ''
      }" style="aspect-ratio: auto 1000/420;" width="1000" height="420" alt="${
    post.media?.alt ? post.media?.alt : ''
  }" />
    </header>
    <div class="article__header__meta">
      <div class="article__post-info">
        <a class="profile-link" href="/profile/?author=${post.author.name}">
          <span class="profile-avatar avatar-l">
            <img class="avatar__image" src="${post.author.avatar?.url}" alt="${
    post.author.avatar?.alt
  }" />
          </span>
        </a>
        <div class="pl-3 flex-1 mt-1">
          <div class="author-name">
            <a class="profile-link" href="/profile/?author=${post.author.name}">
              ${post.author.name}
            </a>
          </div>
          <p class="article__created fs-xs">Posted on ${postCreated}</p>
          <div class="article__actions">
            ${
              isAuthor(post.author.name)
                ? `<button class="btn btn-pill btn-primary btn__edit-post" id="editPost">Edit Post</button>
                  <button class="btn btn-pill btn-danger  btn__delete-post" id="deletePost">Delete Post</button>`
                : ''
            }
          </div>
        </div>
      </div>
      <div class="multiple_reactions_engagement"></div>
      <h1 class="l:fs-5xl lh-tight mb-2">${post.title}</h1>
      <div class="spec__tags flex flex-wrap">${tags}</div>
    </div>
    <div class="article__main">
      <div id="article-body" class="article__body text-styles spec__body">
        ${post.body}
      </div>
    </div>
  `;
  target.appendChild(postElement);
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

init();
