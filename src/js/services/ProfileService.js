import repositories from '../repositories/index';

class ProfileService {
  constructor() {
    this.profileRepository = repositories.ProfileRepository;
  }

  async profiles() {
    return await this.profileRepository.profiles();
  }

  async profile(name) {
    return await this.profileRepository.profile(name);
  }

  async update(name, data) {
    return await this.profileRepository.update(name, data);
  }

  async posts(name, page = 1) {
    return await this.profileRepository.posts(name, page);
  }

  async follow(name) {
    return await this.profileRepository.follow(name);
  }

  async unfollow(name) {
    return await this.profileRepository.unfollow(name);
  }

  async search(query) {
    return await this.profileRepository.search(query);
  }
}

export default new ProfileService();
