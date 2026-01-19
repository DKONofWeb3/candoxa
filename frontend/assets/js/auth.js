import { api } from "./api.js";

/**
 * Sign up a new user
 */
export async function signup(username, email, password) {
  return api("/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
}

/**
 * Log in an existing user
 */
export async function login(email, password) {
  return api("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

/**
 * Get current logged-in user
 */
export async function getMe() {
  return api("/users/me");
}

/**
 * Log out user
 */
export async function logout() {
  return api("/auth/logout", {
    method: "POST",
  });
}
