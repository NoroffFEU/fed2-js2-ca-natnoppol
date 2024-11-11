import repositories from '../repositories/index';

class PostService {
  constructor() {
    this.postRepository = repositories.PostRepository;
  }

  async posts(page = 1) {
    return await this.postRepository.posts(page);
  }

  async post(id) {
    return await this.postRepository.post(id);
  }

  async create(data) {
    if (!data.title || !data.body) {
      throw new Error('Title and Body are required to create a post');
    }
    return await this.postRepository.create(data)
  }

  async update(id, data) {
    if (!data.title || !data.body) {
      throw new Error('Title and Body are required to create a post');
    }
    return await this.postRepository.update(id, data)
  }

  async delete(id) {
    return await this.postRepository.delete(id)
  }
}

export default new PostService();
