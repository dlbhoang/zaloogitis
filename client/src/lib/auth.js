const KEY = "zl_admin_token";
const USER_KEY = "zl_admin_user";

export function setAuth(token, user) {
  localStorage.setItem(KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem(KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken() {
  return localStorage.getItem(KEY) || "";
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

export function isAdmin() {
  const u = getUser();
  return Boolean(getToken()) && u?.role === "admin";
}

