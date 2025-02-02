'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SmallHeader } from '@/components/shared/SmallHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useProjects, type Project } from '@/hooks/kanban/use-projects'
import { Calendar, Layout, Clock } from 'lucide-react'

export default function ProjectsPage() {
  const { projects, isLoading, error } = useProjects()

  if (isLoading) {
    return (
      <>
        <SmallHeader />
        <main className="min-h-screen bg-gray-50 bg-[url('/grid.svg')] px-4 py-8">
          <div className="container mx-auto">
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
            </div>
          </div>
        </main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <SmallHeader />
        <main className="min-h-screen bg-gray-50 bg-[url('/grid.svg')] px-4 py-8">
          <div className="container mx-auto">
            <div className="rounded-lg bg-red-50 p-4 text-center text-red-500">
              <p className="font-medium">Error loading projects</p>
              <p className="text-sm">Please try again later</p>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <SmallHeader />
      <main className="min-h-screen bg-gray-50 bg-[url('/grid.svg')] px-4 py-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
                <p className="mt-2 text-gray-600">Manage and organize your projects in one place</p>
              </div>
              <Link href="/projects/new">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Layout className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </Link>
            </div>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project: Project) => (
                <Link key={project.id} href={`/board/${project.id}`}>
                  <Card className="group cursor-pointer border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg">
                    <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                      <CardTitle className="flex items-center text-gray-900">
                        <Layout className="mr-2 h-5 w-5 text-purple-600" />
                        {project.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="mr-2 h-4 w-4" />
                          Created: {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="mr-2 h-4 w-4" />
                          Last updated: {new Date(project.updatedAt || project.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white/50 p-12">
              <div className="flex flex-col items-center justify-center">
                <div className="rounded-full bg-purple-100 p-4">
                  <Layout className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900">No Projects Yet</h2>
                <p className="mt-2 text-center text-gray-600">
                  Create your first project to start organizing your tasks
                </p>
                <Link href="/projects/new" className="mt-6">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Layout className="mr-2 h-4 w-4" />
                    Create Project
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
} 