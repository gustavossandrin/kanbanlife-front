'use client';

import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks/kanban/use-projects';

export default function ProjectsPage() {
  const router = useRouter();
  const { projects, isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 container mx-auto py-6 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 container mx-auto py-6">
          <div className="rounded-lg bg-red-50 p-4 text-center text-red-500">
            <p className="font-medium">Error loading projects</p>
            <p className="text-sm">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Projects</h1>
          <button
            onClick={() => router.push('/projects/new')}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            New Project
          </button>
        </div>

        {!projects || projects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No projects found</p>
            <button
              onClick={() => router.push('/projects/new')}
              className="mt-4 text-purple-600 hover:text-purple-700"
            >
              Create your first project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(`/board/${project.id}`)}
              >
                <h2 className="text-xl font-semibold">{project.name}</h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 