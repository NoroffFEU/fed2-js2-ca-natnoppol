import services from "../services/index";
import { API_KEY } from "./constants";
import { CONTENT_TYPE_JSON } from "./constants";

export function headers() {
  const headers = new Headers();

  if (API_KEY) {
    headers.append('X-Noroff-API-Key', API_KEY);
  }

  let token;
  try {
    token = services.AuthService.authToken;
    if (token) headers.append('Authorization', `Bearer ${token}`);
  } catch (error) {
    console.error("Error retrieving auth token:", error);
  }
  headers.append('Content-Type', CONTENT_TYPE_JSON);
  
  return headers;
}