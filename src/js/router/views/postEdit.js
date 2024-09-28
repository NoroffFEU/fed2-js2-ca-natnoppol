import { authGuard } from "../../utilities/authGuard";
import NoroffAPI from "../../api";
import { onUpdatePost } from "../../ui/post/update";
import { onDeletePost } from "../../ui/post/delete";


authGuard();


const api = new NoroffAPI();

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id')

async function displayEditPost() {
  try {

    if (!postId) {
        throw new Error("Post ID not found in the URL");
      }

    const post = await api.post.readSinglePost(postId);
    
    if(!post){
        throw new Error("Post not found");
    }
    
    document.getElementById('titleInput').value = post.data.title;
    document.getElementById('bodyInput').value = post.data.body;
    document.getElementById('tagsInput').value = post.data.tags.join(', ');
    if(post.data.media || post.data.media.url){
        document.getElementById('mediaInput').value = post.data.media.url;
    }
    
    }
    catch(error){
        console.log("Error loading post for edit", error)
    }
}


displayEditPost();

const form = document.forms.editPost;
form.addEventListener("submit", onUpdatePost);

document.getElementById('deletePostBtn').addEventListener("click", onDeletePost);


