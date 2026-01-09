import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const t = localStorage.getItem("vry_token");
    if (t) config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});

export async function apiFetch(path: string, opts: RequestInit = {}, token?: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "/api"
  const headers = new Headers(opts.headers || {})
  headers.set("Content-Type", "application/json")
  if (token) headers.set("Authorization", `Bearer ${token}`)
  const res = await fetch(`${base}${path}`, { ...opts, headers })
  if (!res.ok) throw new Error((await res.json())?.message || "Error de API")
  return res.json()
}


export default api;
