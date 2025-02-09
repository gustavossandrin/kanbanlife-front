import { api } from './client'

export enum TaskColor {
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  RED = 'RED',
  CYAN = 'CYAN',
  PURPLE = 'PURPLE',
  ORANGE = 'ORANGE',
  MAGENTA = 'MAGENTA'
}

interface UpdateTaskPositionData {
  taskId: string
  columnId: string
  topPosition: number | null
  bottomPosition: number | null
}

interface UpdateTaskPositionResponse {
  position: number
}

interface CreateTaskData {
  title: string
  description?: string
  color: TaskColor
  columnId: string
  labels: string[]
}

interface Label {
  id: string
  title: string
  tasks: Task[]
  createdAt: Date
  updatedAt: Date
}

interface Task {
  id: string
  title: string
  description?: string
  position: number
  color: TaskColor
  columnId: string
  labels: Label[]
  createdAt: Date
  updatedAt: Date
}

interface Column {
  id: string
  name: string
  maxTasks: number
  position: number
  projectId: string
  tasks: Task[]
  createdAt: Date
  updatedAt: Date
}

interface Project {
  id: string
  name: string
  userId: string
  columns: Column[]
  createdAt: Date
  updatedAt: Date
}

interface UpdateTaskData {
  taskId: string
  title: string
  description?: string
  color: TaskColor
  labels: string[]
}

export const boardService = {
  getBoard: async (id: string) => {
    const response = await api.get(`/projects/${id}`)
    return response.data
  },

  getAllBoards: async () => {
    const response = await api.get('/projects')
    return response.data as Project[]
  },

  createTask: async (data: CreateTaskData) => {
    const response = await api.post('/tasks', data)
    return response.data
  },

  updateTaskPosition: async ({ taskId, columnId, topPosition, bottomPosition }: UpdateTaskPositionData): Promise<UpdateTaskPositionResponse> => {
    const response = await api.put(`/tasks/${taskId}/position`, {
      columnId,
      topPosition,
      bottomPosition,
    })
    return response.data
  },

  updateTask: async (data: UpdateTaskData) => {
    const response = await api.patch(`/tasks/${data.taskId}`, {
      title: data.title,
      description: data.description,
      color: data.color,
      labels: data.labels,
    })
    return response.data
  },

  deleteTask: async (taskId: string) => {
    const response = await api.delete(`/tasks/${taskId}`)
    return response.data
  },
} 