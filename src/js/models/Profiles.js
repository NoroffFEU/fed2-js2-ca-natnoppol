import { Profile } from './Profile';

export class Profiles {
  constructor(profiles = []) {
    this.profiles = profiles.map(
      (profiles) =>
        new Profile(
          profile._count,
          profile.avatar,
          profile.banner,
          profile.bio,
          profile.email,
          profile.followers,
          profile.following,
          profile.name,
          profile.posts
        )
    );
  }
}