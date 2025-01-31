import React from 'react'
import Link from 'next/link'

export default function KanbanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r bg-white">
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-xl font-bold">KanbanLife</h1>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-4">
          <Link
            href="/projects"
            className="flex items-center rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-50"
          >
            Projetos
          </Link>
          <Link
            href="/board"
            className="flex items-center rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-50"
          >
            Quadro
          </Link>
        </nav>
        <div className="border-t p-4">
          <button className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200">
            Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden bg-gray-50">
        {children}
      </div>
    </div>
  )
} 