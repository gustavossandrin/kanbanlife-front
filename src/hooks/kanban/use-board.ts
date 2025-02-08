'use client'

import { useState, useCallback } from 'react'
import { boardService } from '@/services/api/board'
import { Project } from '@/domain/types/kanban'

export function useBoard() {
  const [board, setBoard] = useState<Project | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBoard = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await boardService.getBoard(id)
      setBoard(data)
    } catch (err) {
      setError('Failed to load board')
      console.error('Error fetching board:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateBoard = useCallback((newBoard: Project) => {
    setBoard(newBoard)
  }, [])

  const updateTaskPosition = useCallback(async (data: {
    taskId: string
    columnId: string
    topPosition: number | null
    bottomPosition: number | null
  }) => {
    try {
      setError(null)
      await boardService.updateTaskPosition(data)
    } catch (err) {
      setError('Failed to update task position')
      console.error('Error updating task position:', err)
    }
  }, [])

  return {
    board,
    loading,
    error,
    fetchBoard,
    updateBoard,
    updateTaskPosition,
  }
} 