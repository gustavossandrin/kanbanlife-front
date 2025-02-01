'use client'

import React, { createContext, useContext, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/auth/use-auth'

interface AuthContextData {
  user: any
  signIn: (credentials: { email: string; password: string }) => Promise<void>
  signUp: (data: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, signIn, signUp, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem('@KanbanLife:token')
    const publicPaths = ['/login', '/register', '/about']
    const authOnlyPaths = ['/login', '/register']

    if (!token && !publicPaths.includes(pathname || '')) {
      router.push('/login')
    }

    if (token && authOnlyPaths.includes(pathname || '')) {
      router.push('/projects')
    }
  }, [pathname, router])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
      }}
    >
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