'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api/client'
import { Project } from '@/domain/types/kanban'

interface CreateProjectData {
  name: string
}

export function useProjects() {
  const queryClient = useQueryClient()

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.get('/projects')
      return response.data
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
    projects,
    isLoading,
    createProject: createProject.mutate,
    deleteProject: deleteProject.mutate,
  }
} 