'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical, Plus, ArrowLeft } from 'lucide-react';
import { api } from '@/services/api/client';
import { useProjects } from '@/hooks/kanban/use-projects';
import { toast } from 'sonner'

type Column = {
  id: string;
  name: string;
  taskLimit?: number;
};

interface SortableColumnProps {
  id: string;
  children: React.ReactNode;
}

function SortableColumn({ id, children }: SortableColumnProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md">
        <div className="text-gray-400 hover:text-gray-600 cursor-move" {...attributes} {...listeners}>
          <GripVertical size={20} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const { getProject, updateProject } = useProjects();
  const [isLoading, setIsLoading] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoading(true);
        const project = await getProject(params.id as string);
        setProjectName(project.name);
        setColumns(project.columns.map((col: { id: string; name: string; maxTasks: number }) => ({
          id: col.id,
          name: col.name,
          taskLimit: col.maxTasks,
        })));
      } catch (err) {
        console.error('Error loading project:', err);
        setError('Failed to load project');
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [params.id, getProject]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const oldIndex = columns.findIndex(col => col.id === activeId);
    const newIndex = columns.findIndex(col => col.id === overId);

    const newColumns = [...columns];
    const [movedColumn] = newColumns.splice(oldIndex, 1);
    newColumns.splice(newIndex, 0, movedColumn);

    setColumns(newColumns);
  };

  const handleColumnNameChange = (id: string, newName: string) => {
    setColumns(columns.map(col => 
      col.id === id ? { ...col, name: newName } : col
    ));
  };

  const handleTaskLimitChange = (id: string, value: string) => {
    const limit = value === '' ? undefined : parseInt(value);
    if (value !== '' && (isNaN(limit!) || limit! < 0)) return;

    setColumns(columns.map(col => 
      col.id === id ? { ...col, taskLimit: limit } : col
    ));
  };

  const handleAddColumn = () => {
    const newId = `new-${columns.length + 1}`;
    setColumns([...columns, { id: newId, name: 'New Column' }]);
  };

  const handleRemoveColumn = (id: string) => {
    if (columns.length <= 1) return;
    setColumns(columns.filter(col => col.id !== id));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const formattedColumns = columns.map((col, index) => ({
        id: col.id.startsWith('new-') ? undefined : col.id,
        name: col.name,
        maxTasks: col.taskLimit || null,
        position: index,
      }));

      await updateProject({
        id: params.id as string,
        data: {
          name: projectName,
          columns: formattedColumns,
        }
      });

      toast.success('Project updated successfully');
      await new Promise(resolve => setTimeout(resolve, 500)); // Pequeno delay para garantir que o backend processou
      router.push('/projects');
    } catch (err) {
      console.error('Error updating project:', err);
      setError('Failed to update project. Please try again.');
    } finally {
      setIsLoading(false);
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

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 container mx-auto py-6">
        <Card className="p-6 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Edit Project</h2>
            <Button variant="outline" onClick={() => router.push('/projects')}>
              <ArrowLeft size={20} className="mr-2" />
              Back
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <Input
                placeholder="Enter project name"
                value={projectName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setProjectName(e.target.value);
                  if (error) setError('');
                }}
                className={error ? 'border-red-500' : ''}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Columns</h3>
              <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={columns.map(col => col.id)}>
                  <div className="space-y-3">
                    {columns.map((column) => (
                      <SortableColumn key={column.id} id={column.id}>
                        <div className="flex-1 flex gap-3">
                          <Input
                            value={column.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleColumnNameChange(column.id, e.target.value)}
                            className="flex-1"
                            placeholder="Column name"
                          />
                          <Input
                            type="number"
                            value={column.taskLimit ?? ''}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTaskLimitChange(column.id, e.target.value)}
                            className="w-32 text-right"
                            placeholder="No limit"
                            min={0}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveColumn(column.id)}
                          disabled={columns.length <= 1}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 size={20} />
                        </Button>
                      </SortableColumn>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              <Button
                variant="outline"
                onClick={handleAddColumn}
                className="flex items-center w-full justify-center"
              >
                <Plus size={20} className="mr-2" />
                Add Column
              </Button>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => router.push('/projects')}>
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 