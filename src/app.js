import "./css/style.css";
import controllers from "./js/controllers/index";

import router from "./js/router";

await router(window.location.pathname);

const logoutListener = new controllers.LogoutController(controllers.AuthController);
