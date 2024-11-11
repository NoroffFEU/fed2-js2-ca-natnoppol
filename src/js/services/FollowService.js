import repositories from "../repositories/index";

class FollowService {
  constructor() {
    this.followRepository = repositories.FollowRepository
  }
  
  async follow(name) {
    return await this.followRepository.follow(name)
  }

  async unfollow(name) {
    return await this.followRepository.unfollow(name)
  }

  async network(name) {
    return await this.followRepository.network(name)
  }
}

export default new FollowService();