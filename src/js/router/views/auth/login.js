import controllers from '../../../controllers/index';

const form = document.forms.login;

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    controllers.LoginController.onLogin(event);
  });
}