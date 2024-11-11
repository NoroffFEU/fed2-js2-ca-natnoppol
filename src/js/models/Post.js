export class Post {
  constructor(
    _count,
    author,
    body,
    created,
    comments = [],
    id,
    media,
    tags,
    title,
    updated
  ) {
    this._count = _count;
    this.author = author;
    this.body = body;
    this.created = created;
    this.comments = comments;
    this.id = id;
    this.media = media;
    this.tags = tags;
    this.title = title;
    this.updated = updated;
  }
}
