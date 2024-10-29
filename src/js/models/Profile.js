export class Profile {
    constructor(_count = {}, avatar, banner, bio, email, name, posts = []) {
      this._count = _count || {};
      this.avatar = avatar;
      this.banner = banner;
      this.bio = bio;
      this.email = email;
      this.name = name;
      this.posts = posts || [];
    }
  }
  