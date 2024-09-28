import NoroffAPI from "../api";
import { displayAllPost } from "../router/views/post";
import { displayAllProfiles } from "../router/views/home";
const api = new NoroffAPI()

export async function searchPosts(){
    const query = document.getElementById('searchQuery').value.trim();
    if(!query){
        alert("Emty text box, please search..");
        return;
    }
    try{
        const response   = await api.search.read(query);
        const postData = response.data

    if (postData && postData.length > 0) {
            displayAllPost(postData);
          } else {
            document.getElementById("getAllPosts").innerHTML = "<p>No posts found matching your search query.</p>";
        }
    } catch(error){
        console.log("Failed to search Posts", error)
    }
}

export async function searchProfile(){
    const query = document.getElementById('searchQueryProfile').value.trim();
    if(!query){
        alert("Emty text box, please search..");
        return;
    }
    
    try{
        const profiles  = await api.search.readProfile(query);
        const profileData = profiles.data
        displayAllProfiles(profileData); 
        
        
    } catch(error){
        console.log("Failed to search Profile", error)
    }
}