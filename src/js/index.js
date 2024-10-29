import NoroffAPI from "./api/index.js";
import { onRegister } from "./ui/auth/register.js";
import { onLogin } from "./ui/auth/login.js";


const api = new NoroffAPI("https://v2.api.noroff.dev")


switch (window.location.pathname){
    case "/":
    case "/index.html":
        break;
    case "/auth/register.html":
        document.forms.register.addEventListener("submit", onRegister);
        break;
    case "/auth/login.html":
        document.forms.login.addEventListener("submit", onLogin);
        break;
    case "/post/create/index.html":
        break;
    default:
}