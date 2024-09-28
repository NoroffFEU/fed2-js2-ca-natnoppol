import NoroffAPI from "../../api/index.js";

const api = new NoroffAPI()

export async function onRegister(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try{
        await api.auth.register(data)
        window.location.href = "/"
    } catch (error){
        console.log("Could not send resgister data",error)
    }
}
