import './css/style.css';
import controllers from './js/controllers/index';

import router from './js/router';
import utils from './js/utilities/utils';

await router(window.location.pathname);

const logoutListener = new controllers.LogoutController(
  controllers.AuthController
);

function init() {
//   updateUserAvatar();
//   updateUserAvatarMeta();
//   onAvatarClick();
  setupSearchListener();
}

// function updateUserAvatar() {
//   const userAvatar = document.querySelectorAll('.avatar-image');
//   if (controllers.AuthController.authUser) {
//     const { avatar } = controllers.AuthController.authUser;
//     userAvatar.forEach((elem) => {
//       elem.src = avatar.url;
//       elem.alt = avatar.alt;
//     });
//   }
// }

// function updateUserAvatarMeta() {
//   const username = document.getElementById('user-name');
//   const userEmail = document.getElementById('user-email');
//   if (username && userEmail) {
//     const { name, email } = controllers.AuthController.authUser;
//     username.textContent = name;
//     userEmail.textContent = email;
//   }
// }

// function onAvatarClick() {
//   const userMenuButton = document.getElementById('user-menu-button');
//   const userMenu = document.querySelector(
//     '[aria-labelledby="user-menu-button"]'
//   );
//   if (userMenu) {
//     userMenuButton.addEventListener('click', () => {
//       userMenu.classList.toggle('hidden');
//     });
//   }
// }

function setupSearchListener() {
  const searchForm = document.querySelector('form[name="search"]');
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keypress', handleSearchSubmit);
  }
}

function handleSearch(event) {
  event.preventDefault();

  const searchInput = document.getElementById('search-input');
  const query = searchInput.value.trim();
  if (query) {
    controllers.SearchController.onSearch(query);
  }
}

function handleSearchSubmit(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent default form submission
    const query = event.target.value.trim();
    if (query) controllers.SearchController.onSearch(query);
  }
}

init();