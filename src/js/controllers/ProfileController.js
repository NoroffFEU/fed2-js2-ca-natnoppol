import services from '../services/index';
import utils from '../utilities/utils';

class ProfileController {
  constructor() {
    this.profileService = services.ProfileService;
  }

  async profile(name) {
    try {
      const { data, meta } = await this.profileService.profile(name);
      return { data, meta };
    } catch (error) {
      console.error('Fetch profile error:', error);
      throw new Error('Fetch profile failed.');
    }
  }

  async update(name, data) {
    try {
      const result = await this.profileService.update(name, data);
      if (result.success) {
        const { data: profileData, meta } = result;
        console.log('Update profile success:', { profileData });
        alert('Profile update success');
        utils.redirectTo('/profile/');
      } else {
        console.error('Failed to update profile:', result.message);
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw new Error('Update profile failed.');
    }
  }

  async posts(name) {
    try {
      const { data, meta } = await this.profileService.posts(name);
      return { data, meta };
    } catch (error) {
      console.error('Fetch posts on profile error:', error);
      throw new Error('Fetch posts on profile failed.');
    }
  }

  async onUpdateProfile(event, name) {
    const form = event.target;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const data = this.structureProfileData(payload);

    await this.update(name, data);
  }

  structureProfileData(data) {
    return {
      bio: data.bio,
      avatar:
        typeof data.avatar === 'string'
          ? { url: data.avatar, alt: data.avatarAlt }
          : data.avatar,
      banner:
        typeof data.banner === 'string'
          ? { url: data.banner, alt: data.bannerAlt }
          : data.banner,
    };
  }

  onCancelProfileUpdate() {
    utils.redirectTo(`/profile/`);
  }
}

export default new ProfileController();
