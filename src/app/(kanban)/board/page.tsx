import React from 'react'
import { KanbanBoard } from '@/components/kanban/KanbanBoard'

export default function BoardPage() {
  return (
    <main className="flex h-screen w-full flex-col">
      <header className="flex items-center justify-between border-b bg-white px-6 py-4">
        <h1 className="text-2xl font-bold">Meu Quadro</h1>
      </header>
      <div className="flex-1 overflow-hidden">
        <KanbanBoard />
      </div>
    </main>
  )
} 