import services from "../services/index";

class FollowController {
  constructor() {
    this.followService = services.FollowService;
  }

  async follow(name) {
    try {
      const { success, data, meta } = await this.followService.follow(name);
      return { success, data, meta };
    } catch (error) {
      console.error('Fetch follow error:', error);
      throw new Error('Fetch follow failed.');
    }
  }

  async unfollow(name) {
    try {
      const { success, data, meta } = await this.followService.unfollow(name);
      return { success, data, meta };
    } catch (error) {
      console.error('Fetch follow error:', error);
      throw new Error('Fetch follow failed.');
    }
  }

  async network(name) {
    try {
      const { success, data, meta } = await this.followService.network(name);
      return { success, data, meta };
    } catch (error) {
      console.error('Fetch follow error:', error);
      throw new Error('Fetch follow failed.');
    }
  }
}

export default new FollowController();