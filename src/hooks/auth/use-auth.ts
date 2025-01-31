'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/services/api/client'
import { User } from '@/domain/types/kanban'

interface SignInCredentials {
  email: string
  password: string
}

interface SignUpData extends SignInCredentials {
  firstName: string
  lastName: string
}

interface AuthState {
  token: string
  user: User
}

export function useAuth() {
  const [data, setData] = useState<AuthState | null>(null)
  const router = useRouter()

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post<AuthState>('/auth/login', {
      email,
      password,
    })

    const { token, user } = response.data

    localStorage.setItem('@KanbanLife:token', token)
    setData({ token, user })

    router.push('/projects')
  }, [router])

  const signUp = useCallback(
    async ({ email, password, firstName, lastName }: SignUpData) => {
      await api.post('/auth/register', {
        email,
        password,
        firstName,
        lastName,
      })

      await signIn({ email, password })
    },
    [signIn]
  )

  const signOut = useCallback(() => {
    localStorage.removeItem('@KanbanLife:token')
    setData(null)
    router.push('/login')
  }, [router])

  return {
    user: data?.user,
    signIn,
    signUp,
    signOut,
  }
} 