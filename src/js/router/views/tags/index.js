import controllers from '../../../controllers/index';
import utils from '../../../utilities/utils';
import { renderPosts } from '../home';
import InfiniteScroll from '../../../utilities/infiniteScroll';

const tag = utils.getUrlParams('tag');

async function init() {
  const container = document.querySelector('.container');
  try {
    const infiniteScroll = new InfiniteScroll({
      container: container,
      threshold: 200,
      onLoad: async () => {
        try {
          const currentRenderedCount = container.children.length;
          const { data, meta } = await fetchTags(tag, infiniteScroll.nextPage);
          const { posts } = data;

          // Stop loading if all items are rendered
          if (currentRenderedCount >= meta.totalItems) {
            infiniteScroll.isLastPage = true;
            return;
          }

          const tagLayout = renderLayout(data, container);
          renderPostsByTag(posts, tagLayout);
          infiniteScroll.currentPage = meta.currentPage;
          infiniteScroll.totalPages = meta.pageCount;
          infiniteScroll.nextPage = meta.nextPage;

          if (container.children.length >= meta.totalItems) {
            infiniteScroll.isLastPage = true;
          }
        } catch (error) {
          console.error('Error loading more posts:', error);
          container.innerHTML +=
            '<p>Error loading more posts. Please try again later.</p>';
          infiniteScroll.isLastPage = true;
        }
      },
    });

    const { data, meta } = await fetchTags(tag, 1);
    const { posts } = data;
    const tagLayout = renderLayout(data, container);
    renderPostsByTag(posts, tagLayout);
    
    // Initialize pagination state
    infiniteScroll.currentPage = meta.currentPage;
    infiniteScroll.totalPages = meta.pageCount;
    infiniteScroll.nextPage = meta.nextPage;
    infiniteScroll.isLastPage = meta.isLastPage;
  } catch (error) {
    console.error('Error fetching tags:', error);
    container.innerHTML = `<p>Error loading tag details.</p>`;
  }
}

async function fetchTags(tag, page = 1) {
  const { data, meta } = await controllers.TagsController.tags(tag, page);
  return { data, meta };
}

function renderLayout(data, target) {
  const tagElement = document.createElement('div');
  tagElement.setAttribute('class', 'max-w-screen-xl w-full mx-auto flex flex-col');

  tagElement.innerHTML = `
    <header class="page-header w-full mx-auto max-w-2xl my-4">
      <h1 class="title text-3xl font-bold w-full max-w-2xl">#${tag}</h1>
    </header>
  `;

  // Append tagElement to the target container
  target.innerHTML = ''; // Clear existing content
  target.appendChild(tagElement);

  return tagElement;
}

function renderPostsByTag(data, target) {
  if (data && data.length > 0) {
    renderPosts(data, target);
  } else {
    console.warn('No posts found for this tag.');
    target.innerHTML += `<p>No posts available for this tag.</p>`;
  }
}

init();
