import controllers from '../../controllers/index';
import utils from '../../utilities/utils';

async function init() {
  const container = document.querySelector('.main-content');
  clearContent(container);
  try {
    const posts = await controllers.PostController.posts();
    const { data } = posts;
    
    renderPosts(container, data.posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    container.innerHTML = '<p>Error loading posts. Please try again later.</p>';
  }
}

function clearContent(target) {
  if (target) target.innerHTML = '';
}

export async function renderPosts(target, posts) {
  if (target) {
    const postsElement = posts.map((post) => {
      const createdDate = utils.date(post.created);
      const tags = utils.formatTags(post.tags);

      const postElement = document.createElement('div');
      postElement.classList.add('story');
      postElement.innerHTML = `
        <div class="story__top">
          <div class="story__meta">
            <a class="story__author-link" href="/profile/?author=${
              post.author.name
            }">
              <div class="story__author-pic">
                <span class="profile-avatar avatar-md">
                  <img class="avatar__image" src="${
                    post.author.avatar.url
                  }" alt="${post.author.avatar.alt} width="32" height="32" />
                </span>
              </div>
            </a>
            <div class="sotry__publish-info">
              <div class="story__secondary">
                <a class="story__author-link" href="/profile/?author=${
                  post.author.name
                }">${post.author.name}</a>
              </div>
              <div class="story__tertiary">
                ${createdDate}
              </div>
            </div>
          </div>
        </div>
        <div class="story__identation">
          <div class="">
            <a class="article-link" href="/post/?id=${post.id}">
              <h2 class="story__title">${post.title}</h2>
            </a>
            <div class="story__tags">${tags}</div>
          </div>
          <div class="story__bottom">
            <a class="story__comment-link" href="/post/?id=${post.id}#comments">
              <div class="story__comment">
                <ion-icon class="icon-comment" name="chatbubble-outline"></ion-icon>
                ${
                  post._count.comments === 0
                    ? 'Add Comment'
                    : post._count.comments > 1
                    ? ` ${post._count.comments} comments`
                    : `${post._count.comments} comment`
                }
              </div>
            </a>
          </div>
        </div>
      `;
      return postElement;
    });

    postsElement.forEach((element) => target.appendChild(element));
  }
}

init();
