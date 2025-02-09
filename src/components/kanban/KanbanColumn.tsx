'use client'

import { Task } from '@/domain/types/kanban'
import { useState } from 'react'
import { EditTaskModal } from './EditTaskModal'
import { KanbanTask } from './KanbanTask'

interface Props {
  name: string
  maxTasks: number
  tasks: Task[]
  onTaskUpdated: () => void
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
      {tasks.map((task, index) => (
        <KanbanTask
          key={task.id}
          task={task}
          index={index}
          onClick={() => handleEditTask(task)}
        />
      ))}

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