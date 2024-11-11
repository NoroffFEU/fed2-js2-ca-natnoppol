import services from '../services/index';
import utils from '../utilities/utils';

class SearchController {
  constructor() {
    this.searchService = services.SearchService;
  }

  async posts(query, page = 1) {
    try {
      const { success, data, meta } = await this.searchService.posts(
        query,
        page
      );
      return { success, data, meta };
    } catch (error) {
      console.error('Fetch search error:', error);
      throw new Error('Fetch search failed.');
    }
  }

  onSearch(query) {
    utils.redirectTo(`/search/?q=${encodeURIComponent(query)}`);
  }
}

export default new SearchController();