class User {
    constructor({ name, email, bio, banner, avatar }) {
      this.name = name;
      this.email = email;
      this.bio = bio;
      this.banner = banner ? new Image(banner) : null;
      this.avatar = avatar ? new Image(avatar) : null;
    }
  }
  
  class Image {
    constructor({ url, alt }) {
      this.url = url;
      this.alt = alt;
    }
  }
  
  
  class Follow {
    constructor({ followers = [], following = [] }) {
      // Safety checks to handle undefined or null followers/following arrays
      this.followers = Array.isArray(followers) ? followers.map((follower) => new User(follower)) : [];
      this.following = Array.isArray(following) ? following.map((followed) => new User(followed)) : [];
    }
  }
  
  export { Follow };