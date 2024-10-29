import { API_SOCIAL_POSTS } from '../api/constants';
import { headers } from '../api/headers';
import models from '../models/index';

class PostRepository {
  async posts() {
    const response = await fetch(`${API_SOCIAL_POSTS}?limit=12&page=1&_author=true`, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) throw new Error('Fetching all posts failed');

    try {
      const result = await response.json();
      const { data, meta } = result;

      return {
        success: true,
        data: new models.Posts(data),
        meta,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async post(id) {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}?_comments=true&_author=true`, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) throw new Error('Fetching single posts failed');

    try {
      const result = await response.json();
      const { data, meta } = result;
      const postInstance = new models.Post(
        data._count,
        data.author,
        data.body,
        data.created,
        data.id,
        data.media,
        data.tags,
        data.title,
        data.updated,
      );
      return { success: true, data: postInstance, meta };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async create(data) {
    const payload = JSON.stringify(data);
    const response = await fetch(`${API_SOCIAL_POSTS}`, {
      method: 'POST',
      headers: headers(),
      body: payload,
    });

    if (!response.ok) throw new Error('Creating post failed');

    try {
      const result = await response.json();
      const { data, meta } = result;
      const postInstance = new models.Post(
        data._count,
        data.author,
        data.body,
        data.created,
        data.id,
        data.media,
        data.tags,
        data.title,
        data.updated,
      );
      return { success: true, data: postInstance, meta: meta };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async update(id, data) {
    const payload = JSON.stringify(data);
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: payload,
    });

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    try {
      const result = await response.json();
      const { data, meta } = result;
      const postInstance = new models.Post(
        data._count,
        data.author,
        data.body,
        data.created,
        data.id,
        data.media,
        data.tags,
        data.title,
        data.updated,
      );
      return { success: true, data: postInstance, meta: meta };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async delete(id) {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: 'DELETE',
      headers: headers(),
    });

    if (response.status === 204)
      return { success: true, message: 'Post deleted successfully.' };
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    try {
      const result = await response.json();
      const { data, meta } = result;
      return { success: true, data: data, meta: meta };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new PostRepository();
