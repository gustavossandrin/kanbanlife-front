'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/services/api/client'
import { User } from '@/domain/types/kanban'
import { toast } from 'react-hot-toast'
import { AxiosError } from 'axios'

interface SignInCredentials {
  email: string
  password: string
}

interface SignUpData extends SignInCredentials {
  firstName: string
  lastName: string
}

interface AuthState {
  user: User
}

interface ApiError {
  message: string
  fields?: Record<string, string>
}

export function useAuth() {
  const router = useRouter()

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      })

      const { token } = response.data
      localStorage.setItem('@KanbanLife:token', token)

      router.push('/projects')
    } catch (error) {
      if (error instanceof AxiosError) {
        const apiError = error.response?.data as ApiError
        toast.error(apiError.message || 'Failed to sign in')
      }
      throw error
    }
  }, [router])

  const signUp = useCallback(
    async ({ email, password, firstName, lastName }: SignUpData) => {
      try {
        await api.post('/auth/register', {
          email,
          password,
          firstName,
          lastName,
        })

        router.push('/login')
        toast.success('Account created successfully! Please sign in.')
      } catch (error) {
        if (error instanceof AxiosError) {
          const apiError = error.response?.data as ApiError

          if (error.response?.status === 409) {
            toast.error(apiError.message)
          } else if (error.response?.status === 422 && apiError.fields) {
            const fieldErrors = Object.values(apiError.fields).join(', ')
            toast.error(`Validation error: ${fieldErrors}`)
          } else {
            toast.error('An error occurred while creating your account. Please try again.')
          }
        }
        throw error
      }
    },
    [router]
  )

  const signOut = useCallback(async () => {
    try {
      await api.post('/auth/logout')
      localStorage.removeItem('@KanbanLife:token')
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
      localStorage.removeItem('@KanbanLife:token')
      router.push('/login')
    }
  }, [router])

  return {
    signIn,
    signUp,
    signOut,
  }
} 