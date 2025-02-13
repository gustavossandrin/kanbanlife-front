'use client'

import React from 'react'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <h1 className="text-5xl font-bold text-gray-900">
              Organize Your Projects with Ease
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              KanbanLife is a powerful yet simple project management tool that helps you organize your tasks and projects efficiently.
            </p>
            <div className="mt-8">
              <Image
                src="/board.png"
                alt="KanbanLife Board Overview"
                width={800}
                height={450}
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          </section>

          {/* Create Project Section */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Create Projects in Minutes
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Setting up your project is straightforward. Name it, describe it, and start organizing your tasks right away.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/create_project.png"
                alt="Create New Project"
                width={700}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Task Management Section */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Customize Your Tasks
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Create detailed tasks, set priorities, and track progress. Move tasks between columns with our intuitive drag-and-drop interface.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/create_task.png"
                alt="Task Creation"
                width={700}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Features Grid */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Intuitive Interface
                </h3>
                <p className="text-gray-600">
                  Clean and modern design that makes project management a breeze.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Drag and Drop
                </h3>
                <p className="text-gray-600">
                  Easily move tasks between different stages of your workflow.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Customizable Boards
                </h3>
                <p className="text-gray-600">
                  Create columns that match your team&apos;s unique workflow.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
