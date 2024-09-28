// Use Postman, or JavaScript to get your API key
// In Workflow we will learn how to secure this information
import NoroffAPI from ".";

export async function initializeAPI() {
  const api = new NoroffAPI();
  try {
    const apiKeyData = await api.options.apiKey();
    const API_KEY = apiKeyData.data.key;
    return API_KEY;
  } catch (error) {
    console.error("Error fetching API key:", error);
    throw error;
  }
}
export const API_KEY = 'f57a803f-3207-48e6-ab86-9fea1dfea2a0';

export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_SOCIAL = `${API_BASE}/social`;

export const API_SOCIAL_POSTS = `${API_SOCIAL}/posts`;

export const API_SOCIAL_PROFILES = `${API_SOCIAL}/profiles`;

