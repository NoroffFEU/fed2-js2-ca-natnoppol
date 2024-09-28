import { getCurrentUser } from "../utilities/currentUser";

export function headers(apiKey) {
  const headers = new Headers();
  const {token} = getCurrentUser();

  headers.append("Content-Type", "application/json");

  if (apiKey) {
    headers.append("X-Noroff-API-Key", apiKey);
  }
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  return headers;
}
