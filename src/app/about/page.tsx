'use client';

import React from 'react'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About KanbanLife
            </h1>
            <div className="flex justify-center mb-8">
              <Image
                src="/logo_kanban.png"
                alt="Kanban Life Logo"
                width={200}
                height={60}
                priority
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                An Innovative Project
              </h2>
              <p className="text-gray-600 leading-relaxed">
                KanbanLife is a unique project that demonstrates the power of integration between Artificial Intelligence and modern development. The frontend was developed entirely with AI assistance, using best development practices and modern technologies such as Next.js, TypeScript, and Tailwind CSS.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Technologies Used
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-700 mb-2">Frontend</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Next.js 14</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>React Query</li>
                    <li>Axios</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-700 mb-2">Backend</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>RESTful API</li>
                    <li>JWT Authentication</li>
                    <li>Relational Database</li>
                    <li>Modern Architecture</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                AI-Assisted Development
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The entire frontend of this project was developed with Artificial Intelligence assistance, showcasing how AI can be a powerful tool in modern software development. The code was generated following best development practices, design patterns, and maintaining a high level of quality.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Backend Integration
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The frontend seamlessly integrates with a robust backend developed by Gustavo, which provides all the necessary infrastructure for user management, authentication, and Kanban data manipulation. This integration demonstrates the project&apos;s versatility and ability to work with different technologies.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 