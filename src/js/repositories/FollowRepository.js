import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from "../api/constants";
import { headers } from "../api/headers";
import models from "../models/index";

class FollowRepository {
  async follow(name) {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${name}/follow`, {
      method: 'PUT',
      headers: headers(),
    });

    if (!response.ok) throw new Error('Fetching follow failed');

    try {
      const result = await response.json();
      const { data, meta } = result;

      return {
        success: true,
        data: new models.Follow(data),
        meta,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async unfollow(name) {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${name}/unfollow`, {
      method: 'PUT',
      headers: headers(),
    });

    if (!response.ok) throw new Error('Fetching unfollow failed');

    try {
      const result = await response.json();
      const { data, meta } = result;

      return {
        success: true,
        data: new models.Follow(data),
        meta,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async network(name) {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${name}?_following=true&_follower=true`, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) throw new Error('Fetching following failed');

    try {
      const result = await response.json();
      const { data, meta } = result;

      return {
        success: true,
        data: new models.Follow(data),
        meta,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new FollowRepository();