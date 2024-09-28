
/**
 * Render pagination buttons and handle page changes.
 * @param {number} totalPages - Total number of pages.
 * @param {number} currentPage - The current active page.
 * @param {function} onPageChange
 */
export function renderPagination(totalPages, currentPage, onPageChange) {
  const paginationContainer = document.getElementById("paginationContainer");
  if (!paginationContainer) {
    console.error("Pagination container not found.");
    return;
  }
  paginationContainer.innerHTML = "";

  // Helper function to create and append page buttons
  const createPageButton = (page, isCurrent = false) => {
      const pageButton = document.createElement("button");
      pageButton.innerText = page;
      pageButton.disabled = isCurrent; 
      pageButton.addEventListener("click", () =>  onPageChange(page)); 
      paginationContainer.appendChild(pageButton);
  };

  // Helper to add an ellipsis
  const appendEllipsis = () => {
      const ellipsis = document.createElement("span");
      ellipsis.innerText = "...";
      paginationContainer.appendChild(ellipsis);
  };

  // Previous button
  if (currentPage > 1) {
      const prevButton = document.createElement("button");
      prevButton.innerHTML = "&lt;";
      prevButton.addEventListener("click", () =>  onPageChange(currentPage - 1));
      paginationContainer.appendChild(prevButton);
  }

  // First few pages
  for (let page = 1; page <= Math.min(3, totalPages); page++) {
      createPageButton(page, page === currentPage);
  }

  // Ellipsis before middle pages
  if (currentPage > 5) {
      appendEllipsis();
  }

  // Pages around the current page
  const startPage = Math.max(currentPage - 2, 4);
  const endPage = Math.min(currentPage + 2, totalPages - 3);
  for (let page = startPage; page <= endPage; page++) {
      createPageButton(page, page === currentPage);
  }

  // Ellipsis after middle pages
  if (currentPage < totalPages - 4) {
      appendEllipsis();
  }

  // Last few pages
  for (let page = Math.max(totalPages - 2, endPage + 1); page <= totalPages; page++) {
      createPageButton(page, page === currentPage);
  }

  // Next button
  if (currentPage < totalPages) {
      const nextButton = document.createElement("button");
      nextButton.innerHTML = "&gt;";
      nextButton.addEventListener("click", () =>  onPageChange(currentPage + 1));
      paginationContainer.appendChild(nextButton);
  }
}