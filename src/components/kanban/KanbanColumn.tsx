import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Column, Task } from '@/domain/types/kanban'
import { KanbanTask } from './KanbanTask'
import { SortableContext } from '@dnd-kit/sortable'

interface KanbanColumnProps {
  column: Column
  tasks: Task[]
}

export function KanbanColumn({ column, tasks }: KanbanColumnProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex h-full min-h-[500px] w-[350px] flex-col rounded-lg bg-gray-100 p-4 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex items-center justify-between rounded-md bg-white p-3 font-medium shadow-sm"
      >
        <h3>{column.name}</h3>
        <span className="rounded-full bg-gray-200 px-2 py-1 text-sm">
          {tasks.length}/{column.maxTasks || '∞'}
        </span>
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-2 overflow-y-auto">
        <SortableContext items={tasks.map((task) => task.id)}>
          {tasks
            .sort((a, b) => a.position - b.position)
            .map((task) => (
              <KanbanTask key={task.id} task={task} />
            ))}
        </SortableContext>
      </div>
    </div>
  )
} 