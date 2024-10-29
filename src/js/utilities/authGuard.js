import services from '../services/index';

export function authGuard() {
  const token = services.AuthService.authToken;

  if (!token) return false;
  return true;
}

