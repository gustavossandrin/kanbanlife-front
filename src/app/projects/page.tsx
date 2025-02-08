'use client'

import { useProjects } from '@/hooks/kanban/use-projects'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProjectsPage() {
  const { projects, isLoading } = useProjects()
  const router = useRouter()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col">
        <div className="border-t border-gray-200 bg-gray-100 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">My Projects</h1>
        </div>
        <div className="flex-1 bg-gray-100 p-6">
          <div className="mb-4">
            <Button onClick={() => router.push('/projects/new')}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects?.map((project) => (
              <div
                key={project.id}
                className="flex cursor-pointer flex-col justify-between rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                onClick={() => router.push(`/board/${project.id}`)}
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 