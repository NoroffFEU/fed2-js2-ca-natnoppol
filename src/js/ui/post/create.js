import NoroffAPI from "../../api";

const api = new NoroffAPI();

export async function onCreatePost(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    alert("You have created post");
    
    await api.post.create(data);
    window.location.href = "/post/";
  } catch (error) {
    console.log(error);
  }
}
