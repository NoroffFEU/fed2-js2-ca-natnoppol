import utils from '../utilities/utils';
import AuthController from './AuthController';
// import LoginController from './LoginController';

class LogoutController {
  constructor(authController) {
    this.authController = AuthController;
    this.initEvents();
  }

  initEvents() {
    const logoutButton = document.getElementById('btn-logout');
    if (logoutButton) 
      logoutButton.addEventListener('click', (e) => this.handleLogout(e));
  }

  handleLogout(event) {
    event.preventDefault();
    this.authController.logout();
    utils.redirectTo('/auth/login/');
  }
}

export default LogoutController;