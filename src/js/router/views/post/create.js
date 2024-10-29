import controllers from '../../../controllers/index';
import utils from '../../../utilities/utils';

const form = document.forms.createPost;
const id = utils.getUrlParams('id');

function init() {
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