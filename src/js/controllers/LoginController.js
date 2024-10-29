import services from '../services/index';
import utils from '../utilities/utils';
import AuthController from './AuthController';

class LoginController {
  constructor(authController) {
    this.authController = AuthController; // Dependency Injection (use the AuthController)
  }

  async onLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    await this.handleLogin(data);
  }

  async handleLogin(data) {
    try {
      const { email, password } = data;
      const { token, user } = await this.authController.login({
        email,
        password,
      });
      console.log('Login success:', { user });
      // Handle successful login, e.g., redirect
      services.AuthService.authToken = token
      services.AuthService.authUser = user
      utils.redirectTo('/')
    } catch (error) {
      console.error('Login failed:', error);
      // Handle failed login, e.g., show error message
    }
  }
}

export default new LoginController();