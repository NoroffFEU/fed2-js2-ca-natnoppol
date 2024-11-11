import services from '../services/index';
import utils from '../utilities/utils';

class PostController {
  constructor() {
    this.postService = services.PostService;
  }

  async posts(page = 1) {
    try {
      const { success, data, meta } = await this.postService.posts(page);
      return { success, data, meta };
    } catch (error) {
      console.error('Fetch posts error:', error);
      throw new Error('Fetch posts failed.');
    }
  }

  async post(id) {
    try {
      const { data, meta } = await this.postService.post(id);
      
      return { data, meta };
    } catch (error) {
      console.error('Fetch post error:', error);
      throw new Error('Fetch single post failed.');
    }
  }

  async create(data) {
    try {
      const { data: postData, meta } = await this.postService.create(data);
      console.log('Create post success:', { postData });
      // Handle successful login, e.g., redirect
      utils.redirectTo(`/post/?id=${postData.id}`);
    } catch (error) {
      console.error('Create post failed:', error);
      // Handle failed create post, e.g., show error message
    }
  }

  async update(id, data) {
    try {
      const { data: postData, meta } = await this.postService.update(id, data);
      console.log('Create post success:', { postData });
      // Handle successful login, e.g., redirect
      utils.redirectTo(`/post/?id=${postData.id}`);
    } catch (error) {
      console.error('Create post failed:', error);
      // Handle failed create post, e.g., show error message
    }
  }

  async delete(id) {
    try {
      const resposne = await this.postService.delete(id);
      if (resposne.success) {
        console.log(resposne.message);
        alert(resposne.message);
        utils.redirectTo('/');
      } else {
        console.error('Failed to delete post:', result.message);
        alert('Error deleting post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting the post.');
    }
  }

  async onCreatePost(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.tags) data.tags = this.structuredTags(data.tags);
    if (data.media) data.media = this.structuredMedia(data);

    await this.create(data);
  }

  structuredTags(tags) {
    return tags ? tags.split(',').map((tag) => tag.trim()) : [];
  }

  structuredMedia(data) {
    const mediaObject = {
      url: data.media,
      alt: data.alt || '',
    };
    return mediaObject;
  }

  async onUpdatePost(event, id) {
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.tags) data.tags = this.structuredTags(data.tags);
    if (data.media) data.media = this.structuredMedia(data);

    await this.update(id, data);
  }

  onCancelPost(id = null) {
    if (!id) utils.redirectTo('/');
    if (id) utils.redirectTo(`/post/?id=${id}`);
  }

  async onDeletePost(id) {
    await this.delete(id);
  }
}

export default new PostController();
