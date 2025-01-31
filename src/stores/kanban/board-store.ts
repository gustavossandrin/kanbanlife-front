import { create } from 'zustand'
import { Project, Column, Task } from '@/domain/types/kanban'

interface BoardState {
  currentProject: Project | null
  columns: Column[]
  tasks: Task[]
  setCurrentProject: (project: Project) => void
  setColumns: (columns: Column[]) => void
  setTasks: (tasks: Task[]) => void
  moveTask: (taskId: string, sourceColumnId: string, targetColumnId: string, newPosition: number) => void
  moveColumn: (columnId: string, newPosition: number) => void
}

type SetState = (
  partial: BoardState | Partial<BoardState> | ((state: BoardState) => BoardState | Partial<BoardState>),
  replace?: boolean
) => void

export const useBoardStore = create<BoardState>((set: SetState) => ({
  currentProject: null,
  columns: [],
  tasks: [],

  setCurrentProject: (project: Project) => set({ currentProject: project }),
  setColumns: (columns: Column[]) => set({ columns }),
  setTasks: (tasks: Task[]) => set({ tasks }),

  moveTask: (taskId: string, sourceColumnId: string, targetColumnId: string, newPosition: number) =>
    set((state: BoardState) => {
      const task = state.tasks.find((t: Task) => t.id === taskId)
      if (!task) return state

      const updatedTasks = state.tasks.map((t: Task) => {
        if (t.id === taskId) {
          return {
            ...t,
            columnId: targetColumnId,
            position: newPosition,
          }
        }
        if (t.columnId === targetColumnId && t.position >= newPosition) {
          return {
            ...t,
            position: t.position + 1,
          }
        }
        return t
      })

      return { tasks: updatedTasks }
    }),

  moveColumn: (columnId: string, newPosition: number) =>
    set((state: BoardState) => {
      const updatedColumns = state.columns.map((column: Column) => {
        if (column.id === columnId) {
          return { ...column, position: newPosition }
        }
        if (column.position >= newPosition) {
          return { ...column, position: column.position + 1 }
        }
        return column
      })

      return { columns: updatedColumns }
    }),
})) 