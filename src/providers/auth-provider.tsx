'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/services/api/client'

interface AuthContextType {
  signIn: (credentials: { email: string; password: string }) => Promise<void>
  signUp: (data: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  const signIn = async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials)
    const { token } = response.data
    localStorage.setItem('@KanbanLife:token', token)
    router.push('/projects')
  }

  const signUp = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    await api.post('/auth/register', data)
    router.push('/login')
  }

  const signOut = async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('@KanbanLife:token')
      router.push('/login')
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  return context
} 