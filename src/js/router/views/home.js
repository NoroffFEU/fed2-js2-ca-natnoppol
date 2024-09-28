import { authGuard } from "../../utilities/authGuard";
authGuard();

import NoroffAPI from "../../api";
import { renderPagination } from "../../utilities/pagination";
import { searchProfile } from "../../utilities/search";
import { onLogout } from "../../ui/auth/logout";


const api = new NoroffAPI();

export async function displayAllProfiles(profiles) {
  const profileContainer = document.getElementById("getAllProfiles");
  profileContainer.innerHTML = "";
  const profilesHTML = profiles
    .map(
      (profile) => `
        <div class="profiles" onclick="window.location.href='/profile/detail/?name=${profile.name}'">
        <h2>${profile.name}</h2>
        <h2>${profile.email}</h2>
        </div>
        `
    )
    .join("");

  if (!profileContainer) {
    console.error("The profiles container was not found.");
    return; // Exit the function if the container isn't found
  }

  profileContainer.innerHTML = profilesHTML;
}

async function onPageChange(page) {
  const data = await api.Pagination.readProfiles(12, page); 
  const { profiles, totalPages, currentPage } = data;
  displayAllProfiles(profiles);
  renderPagination(totalPages, currentPage, onPageChange);
}

async function displayPagination(page= 1) {
  
  try{
    const data = await api.Pagination.readProfiles(12, page); 
    const {profiles, totalPages, currentPage } = data;
   
    const seachProfileBtn = document.getElementById('searchProfileSubmitBtn');
    if (!seachProfileBtn){
      return
    }
    seachProfileBtn.addEventListener('click', searchProfile)
    document.getElementById('logoutButton').addEventListener('click', onLogout);
    
    displayAllProfiles(profiles);
    renderPagination(totalPages, currentPage, onPageChange);
  }
  catch (error) {
    console.error("Error fetching profiles or rendering pagination:", error);
  }
}

displayPagination();
