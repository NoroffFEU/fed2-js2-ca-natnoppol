import NoroffAPI from "../../api/index.js";
const api = new NoroffAPI()

export async function onLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData (form);
    const data = Object.fromEntries(formData.entries());

    try{
        await api.auth.login(data)
    } catch (error){
        alert(error);
    }
}   
