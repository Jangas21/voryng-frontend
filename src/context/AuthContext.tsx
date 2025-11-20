'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

type User = { id: string; name?: string; email: string; plan?: string }

type AuthContextType = {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  setUser: React.Dispatch<React.SetStateAction<User | null>>   // 👈 AÑADIDO
}

const AuthContext = createContext<AuthContextType>({} as any)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const lsToken = localStorage.getItem('voryng_token')
      const lsUser  = localStorage.getItem('voryng_user')
      if (lsToken) setToken(lsToken)
      if (lsUser)  setUser(JSON.parse(lsUser))
    } catch {}
    setLoading(false)
  }, [])

  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'

  const login = async (email: string, password: string) => {
    const { data } = await axios.post(`${base}/auth/login`, { email, password })
    const tk = data.token as string
    const usr = data.user as User
    setToken(tk); setUser(usr)
    localStorage.setItem('voryng_token', tk)
    localStorage.setItem('voryng_user', JSON.stringify(usr))
  }

  const register = async (name: string, email: string, password: string) => {
    const { data } = await axios.post(`${base}/auth/register`, { name, email, password })
    const tk = data.token as string
    const usr = data.user as User
    setToken(tk); setUser(usr)
    localStorage.setItem('voryng_token', tk)
    localStorage.setItem('voryng_user', JSON.stringify(usr))
  }

  const logout = () => {
    setToken(null); setUser(null)
    localStorage.removeItem('voryng_token')
    localStorage.removeItem('voryng_user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        setUser,     // 👈 AÑADIDO
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
