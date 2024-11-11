import repositories from '../repositories/index';

class CommentService {
  constructor() {
    this.commentRepository = repositories.CommentRepository;
  }

  async comments(id) {
    return this.commentRepository.comments(id)
  }

  async create(id, data) {
    return this.commentRepository.create(id, data)
  }

  async delete(id, commentId) {
    return this.commentRepository.delete(id, commentId)
  }
}

export default new CommentService();
