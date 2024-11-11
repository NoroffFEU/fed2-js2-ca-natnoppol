import controllers from "../../controllers/index";
import utils from "../../utilities/utils";
import InfiniteScroll from '../../utilities/infiniteScroll';

async function init() {
  const menuButton = document.getElementById("menuButton");
  const menuIcon = document.getElementById("menuIcon");
  const closeIcon = document.getElementById("closeIcon");
  const mobileMenu = document.getElementById("mobile-menu");

  menuButton.addEventListener("click", () => {
    menuIcon.classList.toggle("hidden"); // Toggle 'hamburger' icon
    closeIcon.classList.toggle("hidden"); // Toggle 'close' icon
    mobileMenu.classList.toggle("hidden");// Toggle mobile menu visibility
  });

  const container = document.querySelector(".main-content");
  clearContent(container);

  const infiniteScroll = new InfiniteScroll({
    container: container,
    threshold: 200,
    onLoad: async () => {
      try {
        if (infiniteScroll.nextPage <= infiniteScroll.totalPages) {
          const { data, meta } = await fetchPosts(infiniteScroll.nextPage);
          await renderPosts(data, container);

          // Update pagination
          infiniteScroll.currentPage = meta.currentPage;
          infiniteScroll.totalPages = meta.pageCount;
          infiniteScroll.nextPage = meta.nextPage;
        }
      } catch (error) {
        console.error('Error loading more posts:', error);
        container.innerHTML +=
          '<p>Error loading more posts. Please try again later.</p>';
      }
    },
  });

  // Load the first page of posts initially
  const { data, meta } = await fetchPosts(1);
  renderPosts(data, container);

  // Set initial pagination details
  infiniteScroll.currentPage = meta.currentPage;
  infiniteScroll.totalPages = meta.pageCount;
  infiniteScroll.nextPage = meta.nextPage;
}

function clearContent(target) {
  if (target) target.innerHTML = "";
}

async function fetchPosts(page = 1) {
  const { data, meta } = await controllers.PostController.posts(page);
  
  return { data: data.posts, meta };
}

export async function renderPosts(posts, target) {
  if (target) {
    const postsElement = posts.map((post) => {
      const createdDate = utils.date(post.created);
      const tags = utils.formatTags(post.tags);

      const postElement = document.createElement("div");
      postElement.setAttribute(
        'class',
        'p-4 bg-white rounded shadow-md mx-auto mb-2 w-full max-w-[616px] w-full'
      );
      postElement.innerHTML = `

  <div class="p-4 max-w-xl w-full">
    <div class="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
      <div class="flex items-center mb-3">
        <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
          <a class="" href="/profile/?author=${post.author.name}">
            <img class="" src="${
              post.author.avatar.url
            }" alt="${post.author.avatar.alt} width="32" height="32" />
          </a>
        </div>

        <div>
          <div>
            <a href="/profile/?author=
            ${post.author.name}">
            <h2 class="text-white dark:text-white text-lg font-medium hover:text-blue-600">${post.author.name}</h2>
            </a>
          </div>
          <div>
            <h2 class="text-white dark:text-white text-lg font-medium">${createdDate}</h2>
          </div>
        </div>

      </div>
      <div class="flex flex-col justify-between flex-grow gap-1">
        <a href="/post/?id=${post.id}">
          <h2 class="leading-relaxed text-xl text-white dark:text-gray-300 hover:text-blue-600 inline-flex items-center break-all">
          ${post.title}
          </h2>
        </a>
        <div class="leading-relaxed text-base text-white dark:text-gray-300">
        ${tags}
      </div>
        <a class="mt-3 text-black dark:text-white hover:text-blue-600 inline-flex items-center" href="/post/?id=${post.id}#comments">
          <div class="flex items-center gap-1">
                    <ion-icon class="icon-comment" name="chatbubble-outline"></ion-icon>
                    ${
                      post._count.comments === 0
                        ? "Add Comment"
                        : post._count.comments > 1
                          ? ` ${post._count.comments} comments`
                          : `${post._count.comments} comment`
                    }
          </div>
        </a>
      </div>
    </div>
  </div>

      `;
      return postElement;
    });

    postsElement.forEach((element) => target.appendChild(element));
  }
}

init();


