'use client'

import { Draggable } from '@hello-pangea/dnd'
import { cn } from '@/lib/utils'
import { TaskColor } from '@/services/api/board'
import { Task } from '@/domain/types/kanban'
import { useState } from 'react'
import { EditTaskModal } from './EditTaskModal'

interface Props {
  name: string
  maxTasks: number
  tasks: Task[]
  onTaskUpdated: () => void
}

const colorStyles = {
  [TaskColor.YELLOW]: { bg: 'bg-yellow-100', border: 'border-yellow-300' },
  [TaskColor.GREEN]: { bg: 'bg-green-100', border: 'border-green-300' },
  [TaskColor.BLUE]: { bg: 'bg-blue-100', border: 'border-blue-300' },
  [TaskColor.RED]: { bg: 'bg-red-100', border: 'border-red-300' },
  [TaskColor.CYAN]: { bg: 'bg-cyan-100', border: 'border-cyan-300' },
  [TaskColor.PURPLE]: { bg: 'bg-purple-100', border: 'border-purple-300' },
  [TaskColor.ORANGE]: { bg: 'bg-orange-100', border: 'border-orange-300' },
  [TaskColor.MAGENTA]: { bg: 'bg-pink-100', border: 'border-pink-300' },
}

export function KanbanColumn({ tasks, onTaskUpdated }: Props) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const handleEditTask = (task: Task) => {
    setSelectedTask(task)
  }

  const handleCloseEditTask = () => {
    setSelectedTask(null)
  }

  const handleTaskEdited = () => {
    onTaskUpdated()
    handleCloseEditTask()
  }

  return (
    <>
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={cn(
                  "relative",
                  snapshot.isDragging && "z-50"
                )}
                onClick={() => handleEditTask(task)}
              >
                <div
                  className={cn(
                    "border-2 p-3 hover:bg-opacity-90 transition-colors rounded-lg text-gray-700 cursor-pointer",
                    colorStyles[task.color]?.bg,
                    colorStyles[task.color]?.border,
                    snapshot.isDragging && "shadow-xl"
                  )}
                >
                  <h4 className="font-medium">{task.title}</h4>
                  {task.labels.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {task.labels.map((label) => (
                        <span
                          key={label.id}
                          className="rounded-full bg-white/50 px-2 py-1 text-xs font-medium"
                        >
                          {label.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </Draggable>
        ))}
      </div>

      {selectedTask && (
        <EditTaskModal
          isOpen={true}
          onClose={handleCloseEditTask}
          task={selectedTask}
          onSuccess={handleTaskEdited}
        />
      )}
    </>
  )
} 