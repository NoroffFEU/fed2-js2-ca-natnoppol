import controllers from '../../../controllers/index';
import utils from '../../../utilities/utils';
import { renderPosts } from '../home';

const tag = utils.getUrlParams('tag');

async function init() {
  const container = document.querySelector('.container');
  try {
    const { data, meta } = await controllers.TagsController.tags(tag);
    const tagLayout = renderLayout(container, data);
    renderPostsByTag(tagLayout, data)

  } catch (error) {
    console.error('Error fetching tags:', error);
    container.innerHTML = `<p>Error loading tag details.</p>`;
  }
}

function renderLayout(target, data) {
  const tagElement = document.createElement('div');
  tagElement.classList.add('tag-layout');

  tagElement.innerHTML = `
    <header class="tag-header l:p-6">
      <h1 class="tag__list-title">#${tag}</h1>
    </header>
  `;

  // Append tagElement to the target container
  target.innerHTML = ''; // Clear existing content
  target.appendChild(tagElement);

  return tagElement
}

function renderPostsByTag(target, data) {
  if (data.posts && data.posts.length > 0) {
    renderPosts(target, data.posts); // This will render posts inside the tag layout after the header
  } else {
    console.warn('No posts found for this tag.');
    target.innerHTML += `<p>No posts available for this tag.</p>`;
  }
}

init();
