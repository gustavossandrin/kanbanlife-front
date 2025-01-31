import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '@/domain/types/kanban'

interface KanbanTaskProps {
  task: Task
}

const colorVariants = {
  YELLOW: 'bg-yellow-100 border-yellow-200',
  GREEN: 'bg-green-100 border-green-200',
  BLUE: 'bg-blue-100 border-blue-200',
  RED: 'bg-red-100 border-red-200',
  CYAN: 'bg-cyan-100 border-cyan-200',
  PURPLE: 'bg-purple-100 border-purple-200',
  ORANGE: 'bg-orange-100 border-orange-200',
  MAGENTA: 'bg-pink-100 border-pink-200',
}

export function KanbanTask({ task }: KanbanTaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
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
      {...attributes}
      {...listeners}
      className={`flex cursor-grab flex-col gap-2 rounded-lg border p-4 ${
        colorVariants[task.color]
      } ${isDragging ? 'opacity-50' : ''}`}
    >
      <h4 className="font-medium">{task.title}</h4>
      {task.description && (
        <p className="text-sm text-gray-600">{task.description}</p>
      )}
      {task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.labels.map((label) => (
            <span
              key={label.id}
              className="rounded-full bg-white px-2 py-1 text-xs font-medium"
            >
              {label.title}
            </span>
          ))}
        </div>
      )}
    </div>
  )
} 