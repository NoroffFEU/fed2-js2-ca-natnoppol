import utils from '../utilities/utils';
import AuthController from './AuthController';
// import LoginController from './LoginController';

class LogoutController {
  constructor(authController) {
    this.authController = AuthController;
    this.initEvents();
  }

  initEvents() {
    const logoutButton = document.getElementsByClassName('btn-danger')
    Array.from(logoutButton).forEach(button => {
      button.addEventListener('click', (e) => this.handleLogout(e));
    });
  }

  handleLogout(event) {
    event.preventDefault();
    this.authController.logout();
    utils.redirectTo('/auth/login/');
  }
}

export default LogoutController;