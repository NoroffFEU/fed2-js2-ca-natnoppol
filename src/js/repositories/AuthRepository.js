import { API_AUTH_LOGIN, API_AUTH_REGISTER } from '../api/constants';
import { headers } from '../api/headers';
import models from '../models/index';

class AuthRepository {
  async login(email, password) {
    const response = await fetch(`${API_AUTH_LOGIN}`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Login Failed');

    try {
      const result = await response.json();
      const { data, meta } = result;

      return {
        success: true,
        token: data.accessToken,
        user: new models.User(
          data.name,
          data.email,
          data.avatar,
          data.bio,
          data.banner
        ),
        meta: meta,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async register(name, email, password) {
    const response = await fetch(`${API_AUTH_REGISTER}`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) throw new Error('Registration failed');

    try {
      const result = await response.json();
      const { data, meta } = result;
      return new models.User(data.name, data.email);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new AuthRepository();
