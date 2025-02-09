import React from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { Task } from '@/domain/types/kanban'

interface KanbanTaskProps {
  task: Task
  index: number
  onClick: () => void
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

export function KanbanTask({ task, index, onClick }: KanbanTaskProps) {
  return (
    <div className="mb-4">
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`flex cursor-grab flex-col gap-2 rounded-lg border p-4 ${
              colorVariants[task.color]
            } ${snapshot.isDragging ? 'opacity-50' : ''}`}
            onClick={onClick}
          >
            <h4 className="font-medium">{task.title}</h4>
            {task.labels && task.labels.length > 0 && (
              <>
                <hr className="border-t border-gray-200" />
                <div className="flex flex-wrap gap-1">
                  {task.labels.map((label, index) => (
                    <span
                      key={`${task.id}-${index}`}
                      className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium shadow-sm"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </Draggable>
    </div>
  )
} 