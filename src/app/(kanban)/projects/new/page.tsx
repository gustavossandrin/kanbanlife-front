'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SmallHeader } from '@/components/shared/SmallHeader';
import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from '@hello-pangea/dnd';
import { Trash2, GripVertical, Plus, ArrowLeft } from 'lucide-react';
import { api } from '@/services/api/client';
import { useRouter } from 'next/navigation';

type Step = {
  id: number;
  title: string;
  description: string;
};

type Column = {
  id: string;
  name: string;
  taskLimit?: number;
};

const steps: Step[] = [
  {
    id: 1,
    title: 'Project Name',
    description: 'Choose a name for your project',
  },
  {
    id: 2,
    title: 'Columns',
    description: 'Set up your project columns',
  },
  {
    id: 3,
    title: 'Task Limits',
    description: 'Set the maximum number of tasks for each column',
  },
  {
    id: 4,
    title: 'Review',
    description: 'Review your project settings before creating',
  },
];

const defaultColumns: Column[] = [
  { id: '1', name: 'To Do' },
  { id: '2', name: 'In Progress' },
  { id: '3', name: 'Review' },
  { id: '4', name: 'Done' },
];

export default function NewProject() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const [columns, setColumns] = useState<Column[]>(defaultColumns);

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (projectName.length < 2) {
        setError('Project name must have at least 2 characters');
        return;
      }
      setError('');
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(columns);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setColumns(items);
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
    const newId = (columns.length + 1).toString();
    setColumns([...columns, { id: newId, name: 'New Column' }]);
  };

  const handleRemoveColumn = (id: string) => {
    if (columns.length <= 1) return;
    setColumns(columns.filter(col => col.id !== id));
  };

  const handleCreateProject = async () => {
    try {
      setIsLoading(true);
      
      const formattedColumns = columns.map((col, index) => ({
        name: col.name,
        maxTasks: col.taskLimit || null,
        position: index,
      }));

      await api.post('/projects/new', {
        name: projectName,
        columns: formattedColumns,
      });

      router.push('/projects');
    } catch (err) {
      console.error('Error creating project:', err);
      setError('Failed to create project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10">
        <SmallHeader />
      </div>
      
      <div className="flex-1 container mx-auto py-6">
        {/* Stepper */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.id <= currentStep ? 'bg-purple-600 text-white' : 'bg-gray-200'
                }`}
              >
                {step.id}
              </div>
              {step.id < steps.length && (
                <div
                  className={`w-20 h-1 mx-2 ${
                    step.id < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Current Step Content */}
        <Card className="p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">{steps[currentStep - 1].title}</h2>
          <p className="text-gray-600 mb-6">{steps[currentStep - 1].description}</p>
          
          {currentStep === 1 && (
            <div className="space-y-4">
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
              <div className="flex justify-end">
                <Button onClick={handleNextStep}>
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="columns">
                  {(provided: DroppableProvided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-3"
                    >
                      {columns.map((column, index) => (
                        <Draggable
                          key={column.id}
                          draggableId={column.id}
                          index={index}
                        >
                          {(provided: DraggableProvided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md"
                            >
                              <div
                                {...provided.dragHandleProps}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <GripVertical size={20} />
                              </div>
                              <Input
                                value={column.name}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleColumnNameChange(column.id, e.target.value)}
                                className="flex-1"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveColumn(column.id)}
                                disabled={columns.length <= 1}
                                className="text-gray-400 hover:text-red-600"
                              >
                                <Trash2 size={20} />
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <Button
                variant="outline"
                onClick={handleAddColumn}
                className="flex items-center w-full justify-center"
              >
                <Plus size={20} className="mr-2" />
                Add Column
              </Button>

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={handlePreviousStep}>
                  <ArrowLeft size={20} className="mr-2" />
                  Previous
                </Button>
                <Button onClick={handleNextStep}>
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-3">
                {columns.map((column) => (
                  <div key={column.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md">
                    <div className="flex-1">
                      <p className="font-medium">{column.name}</p>
                    </div>
                    <div className="w-32">
                      <Input
                        type="number"
                        placeholder="No limit"
                        value={column.taskLimit ?? ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => 
                          handleTaskLimitChange(column.id, e.target.value)
                        }
                        min={0}
                        className="text-right"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>
                  <ArrowLeft size={20} className="mr-2" />
                  Previous
                </Button>
                <Button onClick={handleNextStep}>
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h3 className="font-medium text-gray-600">Project Name</h3>
                  <p className="text-lg">{projectName}</p>
                </div>

                <div className="border-b pb-2">
                  <h3 className="font-medium text-gray-600 mb-2">Columns</h3>
                  <div className="space-y-2">
                    {columns.map((column) => (
                      <div key={column.id} className="flex justify-between items-center">
                        <span>{column.name}</span>
                        <span className="text-gray-600">
                          {column.taskLimit ? `Max ${column.taskLimit} tasks` : 'No limit'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>
                  <ArrowLeft size={20} className="mr-2" />
                  Previous
                </Button>
                <Button 
                  onClick={handleCreateProject} 
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Project'}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
} 