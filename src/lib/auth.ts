import api from "@/lib/api";

const AUTH_PREFIX = process.env.NEXT_PUBLIC_AUTH_PREFIX || "/auth";

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { name: string; email: string; password: string };

export async function loginRequest(payload: LoginPayload) {
  const { data } = await api.post(`${AUTH_PREFIX}/login`, payload);
  // Respuesta esperada según tu backend: { message, user, token }
  return data as {
    message: string;
    user: { id: string | number; name?: string; email: string };
    token: string;
  };
}

export async function registerRequest(payload: RegisterPayload) {
  const { data } = await api.post(`${AUTH_PREFIX}/register`, payload);
  return data as {
    message: string;
    user: { id: string | number; name?: string; email: string };
    token: string;
  };
}
