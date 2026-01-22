export async function api(path, options = {}) {
  const res = await fetch(API_URL + path, {
    method: options.method || "GET",
    credentials: "include", // ✅ THIS IS THE FIX
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    let err;
    try {
      err = await res.json();
    } catch {
      err = { message: "Request failed" };
    }
    throw err;
  }

  return res.json();
}
