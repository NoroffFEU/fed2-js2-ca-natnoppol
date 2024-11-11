import { initComment } from '../router/views/post/comment';
import services from '../services/index';

class CommentController {
  constructor() {
    this.commentService = services.CommentService;
  }

  async comments(id) {
    try {
      const { data, meta } = await this.commentService.comments(id);
      return { data: this.sortedCommentsDateAsc(data), meta };
    } catch (error) {
      console.error('Fetch comments error:', error);
      throw new Error('Fetch comments failed.');
    }
  }

  async create(id, data) {
    try {
      const {
        success,
        data: commentData,
        meta,
      } = await this.commentService.create(id, data);
      console.log('Create comment success:', commentData);
      return { success, commentData, meta };
    } catch (error) {
      console.error('Create comment error:', error);
      throw new Error('Create comment failed.');
    }
  }

  async delete(id, commentId) {
    try {
      const { success, data, meta } = await this.commentService.delete(
        id,
        commentId
      );
      return { success, data, meta };
    } catch (error) {
      console.error('Delete comment error:', error);
      throw new Error('Delete comment failed.');
    }
  }

  sortedCommentsDateAsc(data) {
    const sortedComments = data.comments.sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
    return {
      ...data,
      comments: sortedComments,
    };
  }

  structuredCommentData(comment, id = null) {
    if (!id) return { body: comment };
    return { body: comment, replyToId: Number(id) };
  }

  async reRenderComment(postId) {
    const { data } = await this.comments(postId);
    const section = document.querySelector('section');
    if (section) {
      // Clear the current comments and re-render the updated list
      const commentContainer = section.querySelector(
        '#comment-trees-container'
      );
      if (commentContainer) commentContainer.remove();
      await initComment(data.comments, section);
    }
  }

  async onComment(event, postId) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const { comment } = data;
    const payload = this.structuredCommentData(comment);

    this.createHandler(postId, payload);
    const container = document.querySelector('#comment-trees-container');
  }

  async createHandler(id, payload) {
    // Create the comment in the backend
    const { success, commentData } = await this.create(id, payload);

    if (success) {
      // Append the new comment directly to the DOM
      const section = document.querySelector('section');
      if (section) {
        const commentContainer = section.querySelector(
          '#comment-trees-container'
        );

        if (commentContainer) {
          await this.reRenderComment(id);
          this.clearCommentInput();
        }
      }
    } else {
      alert('An error occurred while creating the comment. Please try again.');
    }
  }

  clearCommentInput() {
    const commentInput = document.getElementById('text-area');
    commentInput.value = '';
  }

  async onDelete(postId, commentId, commentWrapper) {
    const confirmed = confirm('Are you sure you want to delete this comment?');
    if (confirmed) await this.deleteHandler(postId, commentId, commentWrapper);
  }

  async deleteHandler(postId, commentId, target) {
    const { success } = await this.delete(postId, commentId);
    if (success) {
      // Remove the comment from the DOM
      target.remove();
      // Refresh comments
      alert('Comment deleted successfully!');
    } else {
      alert('An error occurred while deleting the comment. Please try again.');
    }
  }
}

export default new CommentController();
