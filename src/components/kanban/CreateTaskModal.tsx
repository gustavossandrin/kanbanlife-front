'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { TaskColor, boardService } from '@/services/api/board'
import { toast } from 'sonner'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Task } from '@/domain/types/kanban'

interface Props {
  isOpen: boolean
  onClose: () => void
  columnId: string
  onSuccess: () => void
  column: {
    maxTasks: number
    tasks: Task[]
  }
}

const colorOptions = [
  { value: TaskColor.YELLOW, bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
  { value: TaskColor.GREEN, bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
  { value: TaskColor.BLUE, bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
  { value: TaskColor.RED, bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
  { value: TaskColor.CYAN, bg: 'bg-cyan-100', text: 'text-cyan-800', border: 'border-cyan-200' },
  { value: TaskColor.PURPLE, bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
  { value: TaskColor.ORANGE, bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
  { value: TaskColor.MAGENTA, bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200' },
]

export function CreateTaskModal({ isOpen, onClose, columnId, onSuccess, column }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState<TaskColor>(TaskColor.YELLOW)
  const [labels, setLabels] = useState<string[]>([])
  const [newLabel, setNewLabel] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const selectedColor = colorOptions.find((option) => option.value === color)
  const isColumnFull = column.maxTasks > 0 && column.tasks.length >= column.maxTasks

  const handleAddLabel = () => {
    if (!newLabel.trim()) return
    setLabels([...labels, newLabel.trim()])
    setNewLabel('')
  }

  const handleRemoveLabel = (label: string) => {
    setLabels(labels.filter((l) => l !== label))
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('Title is required')
      return
    }

    if (isColumnFull) {
      toast.error(`Column has reached its maximum limit of ${column.maxTasks} tasks`)
      return
    }

    try {
      setIsLoading(true)
      const response = await boardService.createTask({
        title: title.trim(),
        description: description.trim() || undefined,
        color,
        columnId,
        labels,
      })
      console.log('Task created response:', response)
      toast.success('Task created successfully')
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error creating task:', error)
      toast.error('Failed to create task')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("sm:max-w-[500px]", selectedColor?.bg)}>
        <DialogHeader>
          <DialogTitle>
            Create New Task
            {column.maxTasks > 0 && (
              <div className="text-sm font-normal text-gray-500 mt-1">
                {column.tasks.length} of {column.maxTasks} tasks
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        {isColumnFull ? (
          <div className="py-4">
            <div className="rounded-lg bg-red-50 p-4 text-center text-red-500">
              <p className="font-medium">Column is full</p>
              <p className="text-sm">Maximum limit of {column.maxTasks} tasks reached</p>
            </div>
          </div>
        ) : (
          <>
            <div className={cn("grid gap-4 py-4", selectedColor?.bg)}>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                  placeholder="Task title"
                  className={cn("border-0 bg-white/50", selectedColor?.text)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  maxLength={500}
                  placeholder="Task description"
                  className={cn("resize-none border-0 bg-white/50", selectedColor?.text)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Color</Label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setColor(option.value)}
                      className={`h-8 w-8 rounded-full border-2 transition-all ${
                        option.bg
                      } ${option.border} ${
                        color === option.value ? 'scale-110 ring-2 ring-gray-400' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Labels</Label>
                <div className="flex flex-wrap gap-2">
                  {labels.map((label) => (
                    <span
                      key={label}
                      className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm"
                    >
                      {label}
                      <button
                        onClick={() => handleRemoveLabel(label)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="Add label"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddLabel()}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleAddLabel}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading}>
                Create Task
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
} 