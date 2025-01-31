import React from 'react'
import Link from 'next/link'

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Meus Projetos</h1>
        <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Novo Projeto
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card de Projeto */}
        <Link
          href="/board"
          className="flex flex-col rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">Projeto Exemplo</h2>
          <p className="mt-2 text-gray-600">
            Descrição breve do projeto e seus objetivos principais.
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span>4 Colunas</span>
            <span>12 Tarefas</span>
          </div>
        </Link>
      </div>
    </main>
  )
} 