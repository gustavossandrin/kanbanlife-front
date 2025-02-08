'use client'

import { ProjectHeader } from '@/components/shared/ProjectHeader'

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <ProjectHeader />
      {children}
    </div>
  )
} 