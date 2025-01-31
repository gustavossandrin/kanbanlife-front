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

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  photo?: string
  projects: Project[]
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  name: string
  userId: string
  columns: Column[]
  createdAt: Date
  updatedAt: Date
}

export interface Column {
  id: string
  name: string
  maxTasks: number
  position: number
  projectId: string
  tasks: Task[]
  createdAt: Date
  updatedAt: Date
}

export interface Task {
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

export interface Label {
  id: string
  title: string
  tasks: Task[]
  createdAt: Date
  updatedAt: Date
} 