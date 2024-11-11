import controllers from '../../../controllers/index';
import utils from '../../../utilities/utils';

const form = document.forms.createPost;
const id = utils.getUrlParams('id');

function init() {
  const menuIcon = document.getElementById("menuIcon");
  const closeIcon = document.getElementById("closeIcon");
  const mobileMenu = document.getElementById("mobile-menu");

  menuButton.addEventListener("click", () => {
    menuIcon.classList.toggle("hidden"); // Toggle 'hamburger' icon
    closeIcon.classList.toggle("hidden"); // Toggle 'close' icon
    mobileMenu.classList.toggle("hidden");// Toggle mobile menu visibility
  });


  attachCreateEvent();
  attachCancelEvent(event);
}

function attachCreateEvent() {
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      controllers.PostController.onCreatePost(event);
    });
  }
}

function attachCancelEvent() {
  const cancelButton = document.getElementById('cancelAction');
  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      controllers.PostController.onCancelPost(id);
    });
  }
}

init();