import AuthController from './AuthController';
import utils from '../utilities/utils';

class RegisterController {
  constructor(authController) {
    this.authController = AuthController;
  }

  async onRegister(event) {
    event.preventDefault();
    console.log('click')
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    await this.handleRegister(data);
  }

  async handleRegister(data) {
    try {
      const { name, email, password } = data;
      console.log('data', name, email, password)
      const response = await this.authController.register({
        name,
        email,
        password,
      });
      console.log('Register success:', { name, email });
      // Handle successful login, e.g., redirect
      utils.redirectTo('/');
    } catch (error) {
      console.error('Register failed:', error);
      // Handle failed login, e.g., show error message
    }
  }
}

export default new RegisterController();
