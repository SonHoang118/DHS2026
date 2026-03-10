export const ADMIN_EMAIL = 'admin@gmail.com';
export const ADMIN_PASSWORD = 'DHS2026@admin';

export const ADMIN_AUTH_COOKIE = 'admin_session';
export const ADMIN_AUTH_TOKEN = 'dhs_admin_authenticated';

export function isValidAdminCredentials(email: string, password: string) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export function isAuthenticatedToken(token: string | undefined) {
  return token === ADMIN_AUTH_TOKEN;
}
