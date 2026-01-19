import { api } from "./api.js";

export async function requireAuth() {
  try {
    // Try to fetch current user
    await api("/users/me");
    // If successful → user is authenticated
    return true;
  } catch (err) {
    // Not authenticated → redirect
    window.location.href = "/signup.html";
    return false;
  }
}
