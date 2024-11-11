import controllers from '../../../controllers/index';
import utils from '../../../utilities/utils';

const form = document.forms.updatePost;
const id = utils.getUrlParams('id');

async function init() {
  try {
    const post = await controllers.PostController.post(id);
    const { data } = post;
    populatePostData(data);
    attachUpdateEvent();
    attachCancelEvent(id);
  } catch (error) {
    console.error('Error fetching posts:', error);
    container.innerHTML = '<p>Error loading posts. Please try again later.</p>';
  }
}

async function populatePostData(post) {
  form.title.value = post.title;
  form.body.value = post.body || '';
  form.tags.value = post.tags ? post.tags.join(', ') : '';
  form.media.value = post.media?.url || '';
  form.alt.value = post.media?.alt || '';
}

function attachUpdateEvent() {
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      controllers.PostController.onUpdatePost(event, id);
    });
  }
}

function attachCancelEvent(id) {
  const cancelButton = document.getElementById('cancelAction');
  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      controllers.PostController.onCancelPost(id);
    });
  }
}

init();
