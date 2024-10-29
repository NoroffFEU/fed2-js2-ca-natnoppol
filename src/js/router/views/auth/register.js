import controllers from "../../../controllers/index";

const form = document.forms.register;

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    controllers.RegisterController.onRegister(event);
  });
}
