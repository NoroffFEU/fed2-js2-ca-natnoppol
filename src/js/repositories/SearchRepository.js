import { API_SOCIAL_POSTS } from '../api/constants';
import { headers } from '../api/headers';
import models from '../models/index';

class SearchRRepository {
  async posts(query, page = 1) {
    const endpoint = `${API_SOCIAL_POSTS}/search?q=${query}&limit=12&page=${page}&_author=true&_comments=true`;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: headers(),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `API error: ${response.status} ${response.statusText}. Details: ${errorBody}`
        );
      }

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
}

export default new SearchRRepository();