alert("Single Post Page");

import NoroffAPI from "../../api";
import { renderPagination } from "../../utilities/pagination";
import { searchPosts } from "../../utilities/search";

const api = new NoroffAPI();

export async function displayAllPost(posts) {
  const postsHTML = posts
    .map(
      (posts) => `
    <div class="post" onclick="window.location.href='/post/detail/?id=${
      posts.id
    }'">
    <h2>${posts.title}</h2>
    <p>${posts.body}</p>
    <p><strong>Tags:</strong> ${posts.tags.join(", ")}</p>
    ${
      posts.media && posts.media.url
        ? `<img src="${posts.media.url}" alt="${
            posts.media.alt || "posts Media"
          }">`
        : ""
    }
    </div>
    </div>
    `
    )
    .join("");

  const postsContainer = document.getElementById("getAllPosts");

  if (!postsContainer) {
    // console.error("The posts container was not found.");
    return; // Exit the function if the container isn't found
  }

  postsContainer.innerHTML = postsHTML;
}

async function onPageChange(page) {
  const data = await api.Pagination.readPosts(12, page);
  const { posts, totalPages, currentPage } = data;
  displayAllPost(posts);
  renderPagination(totalPages, currentPage, onPageChange);
}

async function displayPagination(page = 1) {
  try {
    const data = await api.Pagination.readPosts(12, page);

    const { posts, totalPages, currentPage } = data;

    const seachBtn = document.getElementById("searchSubmitBtn");
    if (!seachBtn) {
      return;
    }
    seachBtn.addEventListener("click", searchPosts);

    displayAllPost(posts);
    renderPagination(totalPages, currentPage, onPageChange);
  } catch (error) {
    console.error("Error fetching posts or rendering pagination:", error);
  }
}

displayPagination();
