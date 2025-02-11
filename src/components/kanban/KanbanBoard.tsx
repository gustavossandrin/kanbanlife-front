'use client'

import { DragDropContext, Droppable, DropResult, DroppableProvided, DroppableStateSnapshot } from '@hello-pangea/dnd'
import { KanbanColumn } from './KanbanColumn'
import { useBoard } from '@/hooks/kanban/use-board'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { CreateTaskModal } from './CreateTaskModal'
import { Column } from '@/domain/types/kanban'
import { cn } from '@/lib/utils'

interface Props {
  boardId: string
}

export function KanbanBoard({ boardId }: Props) {
  const { board, updateTaskPosition, updateBoard, fetchBoard } = useBoard()
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null)

  useEffect(() => {
    fetchBoard(boardId)
  }, [boardId, fetchBoard])

  if (!board) return null

  const handleOpenCreateTask = (columnId: string) => {
    setSelectedColumnId(columnId)
  }

  const handleCloseCreateTask = () => {
    setSelectedColumnId(null)
  }

  const handleTaskCreated = () => {
    fetchBoard(boardId)
  }

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const sourceColumn = board.columns.find(
      (col: Column) => col.id === source.droppableId
    )
    const destinationColumn = board.columns.find(
      (col: Column) => col.id === destination.droppableId
    )

    if (!sourceColumn || !destinationColumn) return

    // Moving to another column
    if (
      destinationColumn.maxTasks > 0 &&
      destinationColumn.tasks.length >= destinationColumn.maxTasks
    ) {
      toast.error(`Column ${destinationColumn.name} is full`)
      return
    }

    // Get the task being moved
    const taskToMove = sourceColumn.tasks[source.index]

    // Create new columns state
    const newColumns = board.columns.map((col: Column) => {
      // Handle same column movement
      if (col.id === source.droppableId && source.droppableId === destination.droppableId) {
        const newTasks = [...col.tasks]
        newTasks.splice(source.index, 1)
        newTasks.splice(destination.index, 0, taskToMove)
        return { ...col, tasks: newTasks }
      }

      // Remove from source column
      if (col.id === source.droppableId) {
        const newTasks = col.tasks.filter(task => task.id !== taskToMove.id)
        return { ...col, tasks: newTasks }
      }
      
      // Add to destination column
      if (col.id === destination.droppableId) {
        const newTasks = [...col.tasks]
        newTasks.splice(destination.index, 0, {
          ...taskToMove,
          columnId: destination.droppableId
        })
        
        return { ...col, tasks: newTasks }
      }
      
      return col
    })

    // Update UI immediately
    updateBoard({
      ...board,
      columns: newColumns,
    })

    // Find the destination column in the new state
    const updatedDestinationColumn = newColumns.find(col => col.id === destination.droppableId)
    if (!updatedDestinationColumn) return

    // Get the tasks around the moved task for position calculation
    const movedTaskIndex = updatedDestinationColumn.tasks.findIndex(task => task.id === taskToMove.id)
    if (movedTaskIndex === -1) return

    const topTask = movedTaskIndex > 0 
      ? updatedDestinationColumn.tasks[movedTaskIndex - 1] 
      : null
    const bottomTask = movedTaskIndex < updatedDestinationColumn.tasks.length - 1 
      ? updatedDestinationColumn.tasks[movedTaskIndex + 1] 
      : null

    // Fire and forget request to server
    updateTaskPosition({
      taskId: draggableId,
      columnId: destination.droppableId,
      topPosition: topTask?.position ?? null,
      bottomPosition: bottomTask?.position ?? null,
    }).catch(() => {
      console.error('Failed to update task position on server')
    })
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid h-[calc(100vh-8rem)] auto-cols-fr grid-flow-col border border-gray-200">
          {board.columns.map((column: Column, index: number) => (
            <div
              key={column.id}
              className={`flex flex-col ${
                index !== board.columns.length - 1 ? 'border-r border-gray-200' : ''
              }`}
            >
              <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{column.name}</h3>
                  {column.maxTasks > 0 && (
                    <span className="rounded-full bg-gray-200 px-2 py-1 text-xs">
                      {column.tasks.length}/{column.maxTasks}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleOpenCreateTask(column.id)}
                  className="rounded p-1 hover:bg-gray-200"
                >
                  <Plus className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <Droppable droppableId={column.id}>
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      "flex-1 overflow-y-auto bg-white p-2",
                      snapshot.isDraggingOver && "bg-gray-50"
                    )}
                  >
                    <div className="min-h-full">
                      <KanbanColumn
                        name={column.name}
                        maxTasks={column.maxTasks}
                        tasks={column.tasks}
                        onTaskUpdated={() => fetchBoard(boardId)}
                      />
                      <div className="h-2">{provided.placeholder}</div>
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {selectedColumnId && (
        <CreateTaskModal
          isOpen={true}
          onClose={handleCloseCreateTask}
          columnId={selectedColumnId}
          onSuccess={handleTaskCreated}
          column={board.columns.find((col) => col.id === selectedColumnId)!}
        />
      )}
    </>
  )
}
