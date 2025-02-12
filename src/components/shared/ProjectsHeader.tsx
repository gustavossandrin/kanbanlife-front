import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/auth/use-auth'

export function ProjectsHeader() {
  const { signOut } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4">
      <div className="w-10" /> {/* Espaçador para manter o logo centralizado */}
      
      <div className="flex items-center justify-center">
        <Image
          src="/logo_kanban.png"
          alt="KanbanLife Logo"
          width={120}
          height={30}
          className="object-contain"
        />
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </header>
  )
} 