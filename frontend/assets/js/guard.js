import { api } from "./api.js";

export async function requireAuth() {
  try {
    await api("/users/me");
    return true;
  } catch {
    window.location.href = "/signup.html";
    return false;
  }
}
