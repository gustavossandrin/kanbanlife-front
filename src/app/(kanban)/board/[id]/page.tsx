'use client'

import { useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useBoard } from '@/hooks/kanban/use-board'
import { KanbanBoard } from '@/components/kanban/KanbanBoard'

export default function BoardPage() {
  const params = useParams()
  const { board, loading } = useBoard()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col">
        <div className="border-t border-gray-200 bg-gray-100 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">{board?.name || 'Board'}</h1>
        </div>
        <div className="flex-1 bg-gray-100 p-6">
          <KanbanBoard boardId={params.id as string} />
        </div>
      </div>
    </div>
  )
} 