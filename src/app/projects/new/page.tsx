'use client';

import { useRouter } from 'next/navigation'
import { useProjects } from '@/hooks/kanban/use-projects'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'

export default function NewProjectPage() {
  const router = useRouter()
  const { createProject } = useProjects()
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error('Project name is required')
      return
    }

    try {
      setLoading(true)
      await createProject({ name: name.trim() })
      toast.success('Project created successfully')
      router.push('/projects')
    } catch (error) {
      console.error('Error creating project:', error)
      toast.error('Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col">
        <div className="border-t border-gray-200 bg-gray-100 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">New Project</h1>
        </div>
        <div className="flex-1 bg-gray-100 p-6">
          <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/projects')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                Create Project
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 