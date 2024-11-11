import repositories from '../repositories/index';

class TagService {
  constructor() {
    this.tagRepository = repositories.TagRepository;
  }

  async tags(tag) {
    return await this.tagRepository.tags(tag);
  }
}

export default new TagService();