// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
import { authGuard } from '../utilities/authGuard';
import { routes } from './routes';
import utils from '../utilities/utils';

export default async function router(pathname = window.location.pathname) {
  const route = routes[pathname];
  try {
    const module = await import(/* @vite-ignore */ route.path);

    // Check if the route is protected
    if (route.protected && !authGuard()) {
      alert('You must be logged in to view this page');
      utils.redirectTo('/auth/login/');
      return;
    }
  } catch (error) {
    console.error('Error loading route module:', error);
  }
}