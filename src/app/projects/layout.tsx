'use client';

import { ReactNode } from 'react';
import { SmallHeader } from '@/components/shared/SmallHeader';

interface ProjectsLayoutProps {
  children: ReactNode;
}

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10">
        <SmallHeader />
      </div>
      {children}
    </div>
  );
} 