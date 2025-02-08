'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api/client'

interface CreateProjectData {
  name: string
}

interface Column {
  id: string;
  name: string;
  maxTasks: number | null;
  position: number;
}

export interface Project {
  name: string;
  userId: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  columns: Column[];
}

export function useProjects() {
  const queryClient = useQueryClient()

  const query = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        const response = await api.get('/projects')
        return response.data
      } catch {
        throw new Error('Failed to fetch projects')
      }
    },
  })

  const createProject = useMutation({
    mutationFn: async (data: CreateProjectData) => {
      const response = await api.post('/projects', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  const deleteProject = useMutation({
    mutationFn: async (projectId: string) => {
      await api.delete(`/projects/${projectId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  return {
    projects: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    createProject: createProject.mutate,
    deleteProject: deleteProject.mutate,
  }
} 