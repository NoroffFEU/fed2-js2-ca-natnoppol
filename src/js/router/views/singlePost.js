import NoroffAPI from "../../api";
import { getCurrentUser } from "../../utilities/currentUser";
const api = new NoroffAPI()
export async function displaySinglePost(){
    try
    {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        if (!postId) {
            console.log("Error: Post ID not found in the URL", postId);
            return;
        }
        const post = await api.post.readSinglePost(postId, { _author: true })
        const {user} = getCurrentUser();
        const isAuthor = post.data.author && post.data.author.name === user.name;
        const singlePostCon = document.getElementById('detailPostCon');
        const tags = Array.isArray(post.data.tags) ? post.data.tags : [];
        const postHTML =
            `
            <div class="singlePost">
                <h2>${post.data.title}</h2>
                <p>${post.data.body}</p>
                <p><strong>Tags:</strong> ${tags.join(", ")}</p>
                ${post.data.media && post.data.media.url ? `<img src="${post.data.media.url}" alt="${post.data.media.alt || 'Post Media'}">` : ""}
                ${isAuthor ? `<button class="editSinglePostBtn" onclick="window.location.href='/post/edit/?id=${post.data.id}'">Edit Post</button` : "" }>
            </div>
        `;
        singlePostCon.innerHTML = postHTML;
    }catch (error){
        console.log(`Error displaying posts: ${error.message}`);
    }
}

async function submitComment (postId){
    const commentBody = document.getElementById("commentInput").value.trim();
    if(!commentBody){
        console.log("Comment cannot be empty");
        return;
    }
    try{
        const response = await api.post.CommentOnPost(postId, commentBody)
        if(response){
            document.getElementById('commentInput').value = ""

            currentPage = 1 
            totalCommentsLoaded = 0
            displayComments(postId, currentPage);
        }
    }catch(error){
        console.log(`failed to post comment: ${error.message}`);
    }
}

const urlParams = new URLSearchParams(window.location.search)
const postId =urlParams.get('id')
document.getElementById("commentForm").addEventListener("submit", (event) => {
    event.preventDefault()
    displayComments(postId)
    submitComment(postId)
})
let currentPage = 1;
const commentsPerPage = 5;
let totalCommentsLoaded = 0;
let totalComments;
let totalPages = 1;
let isLoading = false;

const fetchComments = async (postId, page = 1, limit = 5) => {
    try {
        const response = await api.post.getComments(postId, { page, limit });
        totalComments = response.data._count.comments
        return response.data.comments
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
};

async function displayComments(postId, page = 1){
    try{
        if (isLoading || page > totalPages) {
            return;
        }
        isLoading = true;

        const comments = await fetchComments(postId, page, commentsPerPage);
        const commentsList = document.getElementById('commentsList')
        console.log("data of fetch comments",comments)
         commentsList.innerHTML = ""

        if (comments.length === 0 && totalCommentsLoaded === 0) {
            commentsList.innerHTML = "<p>No comment at the moment</p>"
            isLoading = false;
            return;
        }
        comments.forEach((comment) => {
            const commentElement = document.createElement('div')
            commentElement.classList.add("comment")
            commentElement.innerHTML = `
            <p><strong>${comment.owner}:</strong> ${comment.body}</p>
            `
            commentsList.appendChild(commentElement);
        })
        totalCommentsLoaded += comments.length;
        totalPages = Math.ceil(totalComments/ commentsPerPage);

        isLoading = false;
    }catch(error){
        console.error("Error fetching comments:", error.message);
        commentsList.innerHTML = "<p>Failed to load comments.</p>";
        isLoading = false;
    }
}
displaySinglePost()
displayComments(postId, currentPage);

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) { 
        currentPage++;
        displayComments(postId, currentPage);
    }
});
