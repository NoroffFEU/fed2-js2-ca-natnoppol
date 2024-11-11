import controllers from '../../../controllers/index';
import utils from '../../../utilities/utils';


export async function initComment(comments, target) {
    await renderComment(comments, target);
    await attachDeleteCommentEvent();
}

function isCommenter(commenter) {
    const user = controllers.AuthController.authUser;
    return user && user.name === commenter;
}

function commentDeepHandler(replyToId) {
    if (!replyToId) return 0;
  }

  async function fetchComment(postId) {
    return await controllers.CommentController.comments(postId);
  }

  function renderComment(comments, target) {
    const commentTreesContainer = document.createElement('div');
    commentTreesContainer.id = 'comment-trees-container';
    commentTreesContainer.setAttribute('class', 'comments my-8');
    commentTreesContainer.innerHTML = '';
  
    if (!Array.isArray(comments)) {
      const author = controllers.AuthController.authUser;
      comments.author = author;
      return [comments];
    }
  
    comments.forEach((comment) => {
      const commentWrapper = createCommentWrapper(comment);
      commentTreesContainer.appendChild(commentWrapper);
    });
  
    target.appendChild(commentTreesContainer);
  }

  function createCommentWrapper(comment) {
    const idx = commentDeepHandler(comment.replyToId);
    const commentWrapper = document.createElement('div');
    commentWrapper.classList.add(
      'comment-wrapper',
      `comment-wrapper-deep-${idx}`
    );
    if (idx === 0) commentWrapper.classList.add('root');
  
    commentWrapper.setAttribute('data-comment-id', comment.id);
    commentWrapper.setAttribute('data-post-id', comment.postId);
  
    commentWrapper.innerHTML = `
      <div id="comment-node-${comment.id}" class="comment single-comment-node flex items-center ${
      idx === 0 ? 'root' : ''
    } comment--deep-${idx}" data-comment-author-id="1255465" data-user-id="1255465">
        <div class="comment__inner flex">
          ${renderAvatar(
            comment.author.name,
            comment.author.avatar.url,
            comment.author.avatar.alt
          )}
          ${renderCommentDetails(
            comment.author.name,
            utils.date(comment.created),
            comment.body
          )}
        </div>
      </div>
    `;
  
    return commentWrapper;
  }

  function renderAvatar(author, image, alt) {
    return `
    <a class="shirnk-0 mr-4" href="/profile/?author=${author}">
      <img class="h-8 w-8 rounded-full" src="${image}" alt="${alt}" loading="lazy" />
    </a>
  `;
  }

  function renderCommentDetails(author, date, body) {
    const authUser = controllers.AuthController.authUser;
    return `
      <div class="inner-comment comment__details">
        <div class="comment__content mb-1">
          <div class="flex items-center">
            <div class="relative font-medium">
              <a id="comment-profile-preview-trigger-1251256" class="profile-preview-card__trigger p-1 -my-1 -mlk-1" href="/profile/?author=${author}">
                ${author}
              </a>
            </div>
            <span class="color-base-30 px-2 m:pl-0" role="presentation">•</span>
            <div class="comment-date text-gray-600 text-sm">${date}</div>
            ${
              isCommenter(author)
                ? `<div class="comment__delete">
              <button class="btn btn__delete-comment">Delete</button>
            </div>`
                : ''
            }
          </div>
          <dic class="comment__body text-lg">
            <p>${body}</p>
          </div>
          ${renderCommentFooter()}
        </div>
      </div>
    `;
  }

  function attachDeleteCommentEvent() {
    const deleteCommentButton = document.querySelectorAll('.btn__delete-comment');
    deleteCommentButton.forEach((btn) => {
      btn.addEventListener('click', deleteCommentHandler);
    });
  }

  async function deleteCommentHandler(event) {
    const commentWrapper = event.target.closest('.comment-wrapper');
    const postId = Number(commentWrapper.dataset.postId);
    const commentId = Number(commentWrapper.dataset.commentId);
  
    await controllers.CommentController.onDelete(
      postId,
      commentId,
      commentWrapper
    );
  }

  function renderCommentFooter() {
    return `
      <footer class="comment__footer">
        ${renderReactionLikeButton()}
        ${renderReplyButton()}
      </footer>
    `;
  }

  function renderReactionLikeButton() {
    return `
      <button class="tooltip__activator btn btn--ghost btn--icon-left btn-s mr-1 reaction-link inline-flex reaction-button" 
        id="button-for-comment-1251256" 
        data-comment-id="1251256" 
        aria-label="like" 
        data-tracking-name="comment_heart_button" 
        aria-pressed="false">
        
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-labelledby="aj3j3dglouede37ubxl9e3f4p1pidimm" class="crayons-icon reaction-icon not-reacted">
          <title id="aj3j3dglouede37ubxl9e3f4p1pidimm">Like comment:</title>
          <path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path>
        </svg>
  
        <span class="reactions-count" id="reactions-count-1251256">2</span>
        <span class="reactions-label m:inline-block">&nbsp;likes</span>
      </button>
    `;
  }

  function renderReplyButton() {
    return `
      <a class="actions btn btn-reply btn--ghost btn--s btn--icon-left toggle-reply-form mr-1 inline-flex" 
        href="#/tymzap/dont-ever-use-if-else-use-this-instead-512h/comments/new/2j4p6" 
        data-comment-id="1251256" 
        data-path="/tymzap/dont-ever-use-if-else-use-this-instead-512h/comments/2j4p6" 
        data-tracking-name="comment_reply_button" 
        data-testid="reply-button-1251256" 
        rel="nofollow">
        
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-labelledby="anl4azo1zr0a396xnn3syhhaz50hpbjb" class="icon reaction-icon not-reacted">
          <title id="anl4azo1zr0a396xnn3syhhaz50hpbjb">Comment button</title>
          <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
        </svg>
        
        <span class="m:inline-block">Reply</span>
      </a>
    `;
  }
  