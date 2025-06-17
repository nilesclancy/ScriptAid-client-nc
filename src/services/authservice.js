const API = "http://127.0.0.1:8000/api";

export async function register(userData) {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok)
    throw new Error((await res.json()).message || "Registration failed");
  return res.json();
}

export async function login(credentials) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  if (res.ok && data.token) {
    localStorage.setItem("token", data.token);
    return data;
  } else {
    throw new Error(data.message || "Login failed");
  }
}

export async function getProtected() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API}/protected`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export function logout() {
  localStorage.removeItem("token");
}
