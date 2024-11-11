import utils from '../../../utilities/utils';
import controllers from '../../../controllers/index';
import { renderPosts } from '../home';
import InfiniteScroll from '../../../utilities/infiniteScroll';

async function init() {
  const author = getAuthor();
  const profile = await fetchProfile(author);
  const articleContainer = document.querySelector('.articles-list');

  const infiniteScroll = new InfiniteScroll({
    container: articleContainer,
    threshold: 200,
    onLoad: async () => {
      try {
        const currentRenderedCount = articleContainer.children.length;
        const { data, meta } = await fetchAuthorPosts(
          author,
          infiniteScroll.nextPage
        );
        const { posts } = data;

        // Stop loading if all items are rendered
        if (currentRenderedCount >= meta.totalItems) {
          infiniteScroll.isLastPage = true;
          return;
        }

        await renderPosts(posts, articleContainer);
        infiniteScroll.currentPage = meta.currentPage;
        infiniteScroll.totalPages = meta.pageCount;
        infiniteScroll.nextPage = meta.nextPage;

        if (articleContainer.children.length >= meta.totalItems) {
          infiniteScroll.isLastPage = true;
        }
      } catch (error) {
        console.error('Error loading more posts:', error);
        articleContainer.innerHTML +=
          '<p>Error loading more posts. Please try again later.</p>';
        infiniteScroll.isLastPage = true;
      }
    },
  });

  const { data, meta } = await fetchAuthorPosts(author, 1);
  renderProfileData(profile);
  renderPostsData(data.posts);

  await setupFollowButton(profile.name);
  attachProfileEditEvent();

  // Initialize pagination state
  infiniteScroll.currentPage = meta.currentPage;
  infiniteScroll.totalPages = meta.pageCount;
  infiniteScroll.nextPage = meta.nextPage;
  infiniteScroll.isLastPage = meta.isLastPage;
}

function renderProfileData(profile) {
  const profileContainer = document.querySelector('.profile-layout');
  renderProfile(profile, profileContainer);
}

function renderPostsData(posts) {
  const articleContainer = document.querySelector('.articles-list');
  renderPosts(posts, articleContainer);
}

async function setupFollowButton(userName) {
  const followButton = document.querySelector('#followProfile');
  if (!followButton) return;
  // Set an initial loading state
  followButton.textContent = 'Loading...';

  // Initialize the button text before checking if the user is following
  const followingStatus = await isFollowing(userName);

  // Update the button text based on the following status
  updateFollowButton(
    followButton,
    followingStatus === false ? 'unfollow' : 'follow'
  );

  initFollowButton(followButton, userName);
}

async function fetchProfile(user) {
  const { data, meta } = await controllers.ProfileController.profile(user);
  return data;
}

async function fetchAuthorPosts(user, page = 1) {
  const { success, data, meta } = await controllers.ProfileController.posts(
    user,
    page
  );
  return { data, meta };
}

function getAuthor() {
  if (isAuthUser()) {
    const { name } = controllers.AuthController.authUser;
    return name;
  }
  return utils.getUrlParams('author');
}

/**
 * Checks if the current authenticated user is following the author.
 * @returns {Promise<boolean>} - True if the user is following the author, false otherwise.
 */
async function isFollowing() {
  try {
    const { name: authUserName } = controllers.AuthController.authUser; // Destructure auth user
    const {
      data: { following: followingUsers },
    } = await controllers.ProfileController.profile(authUserName);

    

    // Check if the current user is following the author
    return filterUsersByName(followingUsers, getAuthor()).length > 0;
  } catch (error) {
    console.error('Error fetching following status:', error);
    return false; // Return false in case of error
  }
}

/**
 * Filters users by name.
 * @param {Array} users - List of user objects.
 * @param {string} searchName - Name to filter by.
 * @returns {Array} - Filtered list of users.
 */
function filterUsersByName(users, searchName) {
  if (!Array.isArray(users)) {
    console.log('Users list is not an array or is undefined');
    return []; 
  }
  return users.filter((user) =>
    user.name.toLowerCase().includes(searchName.toLowerCase())
  );
}

function renderProfile(profile, target) {
  renderOverlay(target);
  setProfileBanner(target, profile.banner?.url);

  const profileElement = `
    <header class="w-full mt-2 z-10 my-8">
      <div class="flex justify-center relative">
        <span>
          <img class="h-32 w-32 rounded-full block" src="${
            profile.avatar?.url
          }" alt="${profile.avatar?.alt}" width="128" height="128"/>
        </span>
        <div class="flex w-full gap-4 absolute right-4 -top-8 justify-end">
          ${
            !isAuthUser()
              ? `<button id="followProfile" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 z-10" type="button">Follow</button>`
              : '<button id="editProfile" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 z-10" type="button">Edit Profile</button>'
          }
        </div>
      </div>
      <div class="flex justify-center flex-col">
        <div class="my-4 flex justify-center">
          <h1 class="text-4xl font-bold leading-tight text-white">${profile?.name}</h1>
        </div>
        <p class="mb-4 max-w-xl flex justify-center mx-auto space-y-8 text-white">${
          profile.bio
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
  return !author; // Return true if there is no author in URL, meaning user is authenticated
}

function attachProfileEditEvent() {
  const editProfileButton = document.querySelector('#editProfile');
  if (editProfileButton) {
    editProfileButton.addEventListener('click', () => {
      utils.redirectTo('/profile/edit/');
    });
  }
}

/**
 * Initializes the follow button by binding the event listener and setting initial state.
 * @param {HTMLElement} button - The follow button element.
 * @param {string} userName - The name of the user being followed/unfollowed.
 */
function initFollowButton(button, userName) {
  button.addEventListener('click', async function () {
    const action = getFollowAction(button);
    await handleFollowAction(action, userName, button);
  });
}

/**
 * Determines the current action based on the button's text.
 * @param {HTMLElement} button - The follow button element.
 * @returns {string} - The action to perform: 'follow' or 'unfollow'.
 */
function getFollowAction(button) {
  console.log(button.textContent.trim());
  return button.textContent.trim() === 'Follow' ? 'follow' : 'unfollow';
}

/**
 * Handles the follow or unfollow action by calling the appropriate API and updating the UI.
 * @param {string} action - The action to perform: 'follow' or 'unfollow'.
 * @param {string} userName - The name of the user being followed/unfollowed.
 * @param {HTMLElement} button - The follow button element.
 */
async function handleFollowAction(action, userName, button) {
  try {
    const response = await handleApiCall(action, userName);
    if (response.success) {
      updateFollowButton(button, action);
    }
  } catch (error) {
    console.error(`Error during ${action} action:`, error);
  }
}

/**
 * Calls the appropriate API based on the action ('follow' or 'unfollow').
 * @param {string} action - The action to perform: 'follow' or 'unfollow'.
 * @param {string} userName - The name of the user being followed/unfollowed.
 * @returns {Promise<object>} - The API response.
 */
async function handleApiCall(action, userName) {
  if (action === 'follow') {
    return await controllers.FollowController.follow(userName);
  } else {
    return await controllers.FollowController.unfollow(userName);
  }
}

/**
 * Updates the follow button's text based on the action performed.
 * @param {HTMLElement} button - The follow button element.
 * @param {string} action - The action that was performed: 'follow' or 'unfollow'.
 */
function updateFollowButton(button, action) {
  button.textContent = action === 'follow' ? 'Unfollow' : 'Follow';
}

init();
