'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks/kanban/use-projects';
import { Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';

export default function ProjectsPage() {
  const router = useRouter();
  const { projects, isLoading, error, deleteProject } = useProjects();
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const handleEdit = (projectId: string) => {
    router.push(`/projects/${projectId}/edit`);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    
    try {
      await deleteProject(projectToDelete);
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setProjectToDelete(null);
    }
  };

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
                className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-purple-100"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 
                      className="text-xl font-semibold cursor-pointer text-gray-800 hover:text-purple-600 transition-colors mb-2"
                      onClick={() => router.push(`/board/${project.id}`)}
                    >
                      {project.name}
                    </h2>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(project.id)}
                      className="text-gray-400 hover:text-purple-600 hover:bg-purple-50"
                    >
                      <Pencil size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setProjectToDelete(project.id)}
                      className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <AlertDialog open={!!projectToDelete} onOpenChange={() => setProjectToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the project and all its data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
} 