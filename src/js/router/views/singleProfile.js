import NoroffAPI from "../../api";
// import { getCurrentUser } from "../../utilities/currentUser";

const api = new NoroffAPI()

export async function getSingleProfile(){
    try
    {
        const urlParams = new URLSearchParams(window.location.search);
        const profileName = urlParams.get('name');
        if (!profileName) {
            console.log("Error: Profile Name not found in the URL", profileName);
            return;
        }
        const profile = await api.profile.readSingleProfile(profileName, {_posts:true})
        const singleProfileCon = document.getElementById('detailProfileCon');
        const profileNameHTML = `
        <div class="singleprofileName">
            <h2>${profile.data.posts}</h2>
            <p>${profile.data}</p>
        </div>
    `;

    singleProfileCon.innerHTML = profileNameHTML;

   
    }catch (error){
        console.log(`Error displaying posts: ${error.message}`);
    }
    
}

getSingleProfile()