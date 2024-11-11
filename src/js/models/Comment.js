export class Comment {
    constructor(body, created, id, owner, postId, replyToId) {
      this.body = body;
      this.created = created;
      this.id = id;
      this.owner = owner;
      this.postId = postId;
      this.replyToId = replyToId;
    }
  }