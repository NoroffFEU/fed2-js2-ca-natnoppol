import services from '../services/index';

class AuthController {
  constructor() {
    this.authService = services.AuthService;
  }

  async login({ email, password }) {
    try {
      const { token, user } = await this.authService.login(email, password);
      return { token, user }; // Return token and user to LoginController
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed. Please check your credentials.');
    }
  }

  async register({ name, email, password }) {
    try {
      const response = await this.authService.register(name, email, password);
      return { name, email };
    } catch (error) {
      console.error('Register error:', error);
      throw new Error('Register Failed. Please check you data input.');
    }
  }

  logout() {
    try {
      this.authService.logout();
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  // Getter for authToken
  get authToken() {
    try {
      return this.authService.authToken; // Access without parentheses
    } catch (error) {
      console.error('Failed to get authToken:', error);
    }
  }

  // Setter for authToken
  set authToken(token) {
    try {
      this.authService.authToken = token; // Set without parentheses
    } catch (error) {
      console.error('Failed to set authToken:', error);
    }
  }

  // Getter for authUser
  get authUser() {
    try {
      return this.authService.authUser; // Access without parentheses
    } catch (error) {
      console.error('Failed to get authUser:', error);
    }
  }

  // Setter for authUser
  set authUser(user) {
    try {
      this.authService.authUser = user; // Set without parentheses
    } catch (error) {
      console.error('Failed to set authUser:', error);
    }
  }

  clearAuthData() {
    this.authService.clearAuthData();
  }
}

export default new AuthController();
