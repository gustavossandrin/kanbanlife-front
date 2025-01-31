'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api/client'
import { Column, Task } from '@/domain/types/kanban'
import { useBoardStore } from '@/stores/kanban/board-store'

interface CreateColumnData {
  name: string
  maxTasks?: number
}

interface CreateTaskData {
  title: string
  description?: string
  color: string
  columnId: string
}

interface UpdateTaskPositionData {
  taskId: string
  sourceColumnId: string
  targetColumnId: string
  newPosition: number
}

interface UpdateColumnPositionData {
  columnId: string
  newPosition: number
}

export function useBoard(projectId: string) {
  const queryClient = useQueryClient()
  const { setColumns, setTasks } = useBoardStore()

  const { data: columns = [], isLoading: isLoadingColumns } = useQuery<Column[]>({
    queryKey: ['columns', projectId],
    queryFn: async () => {
      const response = await api.get(`/projects/${projectId}/columns`)
      const columns = response.data
      setColumns(columns)
      return columns
    },
  })

  const { data: tasks = [], isLoading: isLoadingTasks } = useQuery<Task[]>({
    queryKey: ['tasks', projectId],
    queryFn: async () => {
      const response = await api.get(`/projects/${projectId}/tasks`)
      const tasks = response.data
      setTasks(tasks)
      return tasks
    },
  })

  const createColumn = useMutation({
    mutationFn: async (data: CreateColumnData) => {
      const response = await api.post(`/projects/${projectId}/columns`, {
        ...data,
        position: columns.length,
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns', projectId] })
    },
  })

  const createTask = useMutation({
    mutationFn: async (data: CreateTaskData) => {
      const column = columns.find((col) => col.id === data.columnId)
      if (!column) throw new Error('Column not found')

      const response = await api.post(`/columns/${data.columnId}/tasks`, {
        ...data,
        position: tasks.filter((t) => t.columnId === data.columnId).length,
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
    },
  })

  const updateTaskPosition = useMutation({
    mutationFn: async ({
      taskId,
      sourceColumnId,
      targetColumnId,
      newPosition,
    }: UpdateTaskPositionData) => {
      await api.patch(`/tasks/${taskId}/position`, {
        sourceColumnId,
        targetColumnId,
        position: newPosition,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
    },
  })

  const updateColumnPosition = useMutation({
    mutationFn: async ({ columnId, newPosition }: UpdateColumnPositionData) => {
      await api.patch(`/columns/${columnId}/position`, {
        position: newPosition,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns', projectId] })
    },
  })

  return {
    columns,
    tasks,
    isLoading: isLoadingColumns || isLoadingTasks,
    createColumn: createColumn.mutate,
    createTask: createTask.mutate,
    updateTaskPosition: updateTaskPosition.mutate,
    updateColumnPosition: updateColumnPosition.mutate,
  }
} 