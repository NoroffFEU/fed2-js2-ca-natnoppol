import services from '../services/index';

class TagController {
  constructor() {
    this.tagService = services.TagService;
  }

  async tags(tag) {
    try {
      const { data, meta } = await this.tagService.tags(tag);
      return { data, meta };
    } catch (error) {
      console.error('Fetch tags error:', error);
      throw new Error('Fetch tags failed.');
    }
  }
}

export default new TagController();