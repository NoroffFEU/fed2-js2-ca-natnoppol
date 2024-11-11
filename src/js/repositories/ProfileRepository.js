import { API_SOCIAL_PROFILES } from '../api/constants';
import { headers } from '../api/headers';
import models from '../models/index';

class ProfileRepository {
  async profiles() {
    const endpoint = `${API_SOCIAL_PROFILES}?_posts=true&_following=true&_followers=true`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) throw new Error('Fetching profiles failed');

    try {
      const result = await response.json();
      const { data, meta } = result;

      return {
        success: true,
        data: new models.Profiles(data),
        meta,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async profile(name) {
    const endpoint = `${API_SOCIAL_PROFILES}/${name}?_posts=true&_following=true&_followers=true`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) throw new Error('Fetching profile failed');

    try {
      const { data, meta } = await response.json();

      const profileInstance = new models.Profile(
        data._count,
        data.avatar,
        data.banner,
        data.bio,
        data.email,
        data.followers,
        data.following,
        data.name,
        data.posts
      );

      return {
        success: true,
        data: profileInstance,
        meta,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async update(name, data) {
    const payload = JSON.stringify(data);
    const endpoint = `${API_SOCIAL_PROFILES}/${name}`;
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: headers(),
      body: payload,
    });

    if (!response.ok) throw new Error('Update profile failed');

    try {
      const result = await response.json();
      const { data, meta } = result;
      const profileInstance = new models.Profile(
        data._count,
        data.avatar,
        data.banner,
        data.bio,
        data.email,
        data.followers,
        data.following,
        data.name,
        data.posts
      );

      return {
        success: true,
        data: profileInstance,
        meta,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async posts(name, page = 1) {
    const endpoint = `${API_SOCIAL_PROFILES}/${name}/posts?limit=12&page=${page}&_author=true&_posts=true&_following=true&_followers=true&_comments=true`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) throw new Error('Fetching all posts by profile failed');

    try {
      const { data, meta } = await response.json();

      return {
        success: true,
        data: new models.Posts(data),
        meta,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async follow(name) {
    const endpoint = `${API_SOCIAL_PROFILES}/${name}/follow`;
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: headers(),
    });

    if (!response.ok) throw new Error('Follow author failed');

    try {
      const result = await response.json();
      const { data, meta } = result;

      return {
        success: true,
        data,
        meta,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async unfollow(name) {
    const endpoint = `${API_SOCIAL_PROFILES}/${name}/unfollow`;
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: headers(),
    });

    if (!response.ok) throw new Error('Unfollow user failed');

    try {
      const result = await response.json();
      const { data, meta } = result;

      return {
        success: true,
        data,
        meta,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async search(query) {
    const endpoint = `${API_SOCIAL_PROFILES}/search?q=${query}`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) throw new Error('Search profile with query failed');

    try {
      const result = await response.json();
      const { data, meta } = result;
      const profileInstance = new models.Profile(
        data._count,
        data.avatar,
        data.banner,
        data.bio,
        data.email,
        data.followers,
        data.following,
        data.name,
        data.posts
      );

      return {
        success: true,
        data: profileInstance,
        meta,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new ProfileRepository();
