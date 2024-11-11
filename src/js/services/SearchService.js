import repositories from "../repositories/index";

class SearchService {
  constructor() {
    this.searchRepository = repositories.SearchRepository
  }
  async posts(query, page = 1) {
    return await this.searchRepository.posts(query, page)
  }
}

export default new SearchService();