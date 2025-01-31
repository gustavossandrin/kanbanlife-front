'use client'

import React from 'react'
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useBoardStore } from '@/stores/kanban/board-store'
import { Column, Task } from '@/domain/types/kanban'
import { KanbanColumn } from './KanbanColumn'

export function KanbanBoard() {
  const { columns, tasks, moveTask, moveColumn } = useBoardStore()

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const { id } = active
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'

    if (isActiveATask && isOverATask) {
      const activeIndex = tasks.findIndex((t: Task) => t.id === activeId)
      const overIndex = tasks.findIndex((t: Task) => t.id === overId)

      if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
        moveTask(
          String(activeId),
          tasks[activeIndex].columnId,
          tasks[overIndex].columnId,
          overIndex
        )
      }
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    if (isActiveATask && isOverAColumn) {
      const activeIndex = tasks.findIndex((t: Task) => t.id === activeId)

      moveTask(
        String(activeId),
        tasks[activeIndex].columnId,
        String(overId),
        tasks.filter((t: Task) => t.columnId === String(overId)).length
      )
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveAColumn = active.data.current?.type === 'Column'

    if (isActiveAColumn) {
      const activeIndex = columns.findIndex((col: Column) => col.id === activeId)
      const overIndex = columns.findIndex((col: Column) => col.id === overId)

      moveColumn(String(activeId), overIndex)
    }
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full w-full gap-4 overflow-x-auto p-4">
        <SortableContext items={columns.map((col: Column) => col.id)}>
          {columns
            .sort((a: Column, b: Column) => a.position - b.position)
            .map((column: Column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={tasks.filter((task: Task) => task.columnId === column.id)}
              />
            ))}
        </SortableContext>
      </div>
    </DndContext>
  )
} 