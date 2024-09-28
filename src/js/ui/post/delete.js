import NoroffAPI from "../../api"

const api = new NoroffAPI()

export async function onDeletePost(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    const confirmDelete = confirm("Are you sure ?")
    if(!confirmDelete){
        return
    }

    try{
        const response = await api.post.delete(postId);

        if(response){
            alert("Post successfully Delete")
        }

    }catch(error){
        console.log("failed to delete",error)
    }
}
