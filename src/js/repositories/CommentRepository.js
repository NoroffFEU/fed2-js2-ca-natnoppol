import { API_SOCIAL_POSTS } from '../api/constants';
import { headers } from '../api/headers';
import models from '../models/index';

class CommentRepository {
  async comments(id) {
    const endpoint = `${API_SOCIAL_POSTS}/${id}?_author=true&_comments=true`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) throw new Error('Fetching comments failed');

    try {
      const result = await response.json();
      const { data, meta } = result;

      const postInstance = new models.Post(
        data._count,
        data.author,
        data.body,
        data.created,
        data.comments,
        data.id,
        data.media,
        data.tags,
        data.title,
        data.updated
      );

      return {
        success: true,
        data: postInstance,
        meta,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async create(id, data) {
    const payload = JSON.stringify(data);
    const endpoint = `${API_SOCIAL_POSTS}/${id}/comment`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers(),
      body: payload,
    });
    
    if (!response.ok) throw new Error('Create comments failed');
    
    try {
      const result = await response.json();
      const { data, meta } = result;

      const commentInstance = new models.Comment(
        data.body,
        data.created,
        data.id,
        data.owner,
        data.postId,
        data.replyToId
      );

      return {
        success: true,
        data: commentInstance,
        meta,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async delete(id, commentId) {
    try {
      const endpoint = `${API_SOCIAL_POSTS}/${id}/comment/${commentId}`;
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: headers(),
      });

      if (response.status === 204)
        return { success: true, message: 'Comment deleted successfully.' };

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `API error: ${response.status} ${response.statusText}. Details: ${errorBody}`
        );
      }

      const result = await response.json();
      const { data, meta } = result;

      return {
        success: true,
        data: new models.Comment(data),
        meta,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new CommentRepository();
