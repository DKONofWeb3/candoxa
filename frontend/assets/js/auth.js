import { api } from "./api.js";

export async function signup(username, email, password) {
  return api("/auth/signup", {
    method: "POST",
    body: { username, email, password },
  });
}

export async function login(email, password) {
  return api("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function getMe() {
  return api("/users/me");
}

export async function logout() {
  return api("/auth/logout", {
    method: "POST",
  });
}
