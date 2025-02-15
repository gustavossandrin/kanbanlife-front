'use client'

import { MainHeader } from '@/components/shared/MainHeader'

export default function KanbanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainHeader />
      {children}
    </div>
  )
} 