import utils from '../../../utilities/utils';
import controllers from '../../../controllers/index';
import { renderPosts } from '../home';

async function init() {
  const user = getAuthorOrAuthUser();
  const { data, meta } = await controllers.ProfileController.profile(user);
  const response = await controllers.ProfileController.posts(user);
  const profileContainer = document.querySelector('.profile-layout');
  const articleContainer = document.querySelector('.articles-list');

  isAuthUser();

  renderProfile(profileContainer, data);
  renderPosts(articleContainer, response.data.posts);
  attachProfileEditEvent();
}

function getAuthorOrAuthUser() {
  const author = utils.getUrlParams('author');
  const user = controllers.AuthController.authUser;
  return author ? author : user.name;
}

function renderProfile(target, user) {
  renderOverlay(target);
  setProfileBanner(target, user.banner.url);

  const profileElement = `
    <header class="profile-header mt-2">
      <div class="profile-header__top">
        <span class="profile-avatar">
          <img class="avatar__image" src="${user.avatar.url}" alt="${
    user.avatar.alt
  }" width="128" height="128"/>
        </span>
        <div class="profile-header__actions">
          ${
            !isAuthUser()
              ? '<button class="btn btn-solid btn-primary btn-follow" type="button">Follow</button>'
              : '<button class="btn btn-solid btn-primary btn-edit-profile" type="button">Edit Profile</button>'
          }
        </div>
      </div>
      <div class="profile-header__details">
        <div class="username-container mb-2">
          <h1 class="title lh-tight text-white">${user.name}</h1>
        </div>
        <p class="profile-header__bio mb-4 max-w-75 mx-auto text-white">${
          user.bio
        }</p>
      </div>
    </header>
  `;

  target.innerHTML += profileElement;
}

function renderOverlay(target) {
  const overlay = document.createElement('div');
  overlay.classList.add('profile-overlay');
  target.appendChild(overlay);
}

function setProfileBanner(target, background) {
  target.style.backgroundImage = `url(${background})`;
}

function isAuthUser() {
  const author = utils.getUrlParams('author');
  if (!author) return true;
  return false;
}

function attachProfileEditEvent() {
  const editProfileButton = document.querySelector('.btn-edit-profile');
  editProfileButton.addEventListener('click', () => {
    utils.redirectTo('/profile/edit/');
  });
}

init();
