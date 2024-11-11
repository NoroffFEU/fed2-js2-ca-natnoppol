import utils from '../../../utilities/utils';
import { renderPosts } from '../home';
import InfiniteScroll from '../../../utilities/infiniteScroll';
import controllers from '../../../controllers/index';

async function init() {
  const container = document.querySelector('#main-content');
  const query = utils.getUrlParams('q');
  container.appendChild(renderPageHeader(query));

  const articleList = renderStoryContainer(); // Call function to create article list
  container.appendChild(articleList);

  const infiniteScroll = new InfiniteScroll({
    container: articleList,
    threshold: 200,
    onLoad: async () => {
      try {
        const currentRenderedCount = articleList.children.length;
        const { data, meta } = await performSearch(query, infiniteScroll.nextPage);

        const posts = data?.posts;
        if (posts) {
          renderSearchResult(posts, articleList);

          // Stop loading if all items are rendered
          if (currentRenderedCount >= meta.totalItems) {
            infiniteScroll.isLastPage = true;
            return;
          }

          infiniteScroll.currentPage = meta.currentPage;
          infiniteScroll.totalPages = meta.pageCount;
          infiniteScroll.nextPage = meta.nextPage;

          if (articleList.children.length >= meta.totalItems) {
            infiniteScroll.isLastPage = true;
          }
        } else {
          throw new Error("No posts found.");
        }
      } catch (error) {
        console.error('Error loading more posts:', error);
        articleList.innerHTML += '<p>Error loading more posts. Please try again later.</p>';
        infiniteScroll.isLastPage = true;
      }
    },
  });

  const { data, meta } = await performSearch(query, 1);
  const posts = data?.posts;
  if (posts) {
    renderSearchResult(posts, articleList);
    infiniteScroll.currentPage = meta.currentPage;
    infiniteScroll.totalPages = meta.pageCount;
    infiniteScroll.nextPage = meta.nextPage;
  }
}

function renderStoryContainer() {
  const articleList = document.createElement('div');
  articleList.id = 'article-list';
  articleList.classList.add('article-list', 'layout-content');

  const subStories = document.createElement('div');
  subStories.id = 'substories';
  subStories.classList.add('substories', 'search-result-loaded');

  articleList.appendChild(subStories);
  return articleList;
}

function renderPageHeader(query) {
  const header = document.createElement('div');
  header.setAttribute('class', 'page-header w-full mx-auto max-w-2xl my-4');

  // Create the title element
  const title = document.createElement('h1');
  title.setAttribute('class', 'title text-3xl font-bold w-full max-w-2xl');
  title.textContent = `Search results for ${query}`;

  // Append the title element to the header
  header.appendChild(title);

  return header;
}

async function performSearch(query, page = 1) {
  if (query) {
    try {
      const { data, meta } = await controllers.SearchController.posts(
        query,
        page
      );

      return { data, meta };
    } catch (error) {
      console.error(error);
    }
  }
}

function renderArticleWrapper(posts, subStories) {
  posts.forEach((post) => {
    const article = document.createElement('article');
    article.id = `article-${post.id}`;
    article.classList.add('story');
    article.setAttribute('data-article-path', `/post/?id=${post.id}`);
    article.setAttribute('data-feed-content-id', post.id);
    subStories.appendChild(article);
  });
}

function renderSearchResult(posts, target) {
  const subStories = target.querySelector('#substories');
  if (subStories) {
    renderArticleWrapper(posts, subStories);
  }

  renderPosts(posts, target);
}

init();
