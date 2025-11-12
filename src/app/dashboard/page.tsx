"use client";

import Protected from "@/components/Protected";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user, token, logout } = useAuth();

  return (
    <Protected>
      <main className="p-6 max-w-3xl mx-auto space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <button onClick={logout} className="rounded-xl border px-3 py-2">Cerrar sesión</button>
        </header>
        <div className="rounded-2xl border p-4">
          <p><b>Usuario:</b> {user?.name ?? user?.email}</p>
          <p className="break-all text-xs opacity-70 mt-2"><b>Token:</b> {token}</p>
        </div>
      </main>
    </Protected>
  );
}
