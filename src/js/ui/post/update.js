
import NoroffAPI from "../../api";

const api = new NoroffAPI();



export async function onUpdatePost(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    event.preventDefault()
    const form = event.target
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
   
    try{
        await api.post.update(postId, data);
    }catch(error){
       console.log("Could not destructure property ",error)
    }
}

