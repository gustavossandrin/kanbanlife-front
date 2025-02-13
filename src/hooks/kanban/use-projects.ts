'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api/client'
import { Project } from '@/domain/types/kanban'

interface CreateColumnData {
  name: string;
  maxTasks: number | null;
  position: number;
}

interface CreateProjectData {
  name: string;
  columns: CreateColumnData[];
}

interface UpdateColumnData {
  id?: string;
  name: string;
  maxTasks: number | null;
  position: number;
}

interface UpdateProjectData {
  name: string;
  columns: UpdateColumnData[];
}

const projectService = {
  getProjects: async () => {
    const response = await api.get('/projects')
    return response.data
  },

  getProject: async (id: string) => {
    const response = await api.get(`/projects/${id}`)
    return response.data
  },

  createProject: async (data: CreateProjectData) => {
    const response = await api.post('/projects', data)
    return response.data
  },

  updateProject: async (id: string, data: UpdateProjectData) => {
    const response = await api.put(`/projects/${id}`, data)
    return response.data
  },

  deleteProject: async (id: string) => {
    const response = await api.delete(`/projects/${id}`)
    return response.data
  },
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectService.getProject(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useProjects() {
  const queryClient = useQueryClient()

  const { data: projects = [], isLoading, error } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: projectService.getProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const { mutateAsync: createProject } = useMutation({
    mutationFn: projectService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  const { mutateAsync: updateProject } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectData }) => 
      projectService.updateProject(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['project', id] })
    },
  })

  const { mutateAsync: deleteProject } = useMutation({
    mutationFn: projectService.deleteProject,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['project', id] })
    },
  })

  return {
    projects,
    isLoading,
    error,
    createProject,
    updateProject,
    deleteProject,
  }
} 