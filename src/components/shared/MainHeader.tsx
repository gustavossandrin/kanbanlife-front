import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Layout, ChevronDown, Settings, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { boardService } from '@/services/api/board'
import { useAuth } from '@/hooks/auth/use-auth'

interface Board {
  id: string
  name: string
}

export function MainHeader() {
  const [boards, setBoards] = useState<Board[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signOut } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const loadBoards = async () => {
    if (isLoading) return
    
    try {
      setIsLoading(true)
      const data = await boardService.getAllBoards()
      setBoards(data)
    } catch (error) {
      console.error('Error fetching boards:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Carrega os boards uma vez quando o componente montar
  useEffect(() => {
    loadBoards()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Array vazio para executar apenas uma vez na montagem

  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger 
            className="flex items-center gap-2 rounded px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
            onClick={loadBoards} // Recarrega ao clicar também
          >
            <Layout className="h-4 w-4" />
            Boards
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px] bg-white shadow-lg border border-gray-200">
            {isLoading ? (
              <div className="p-2 text-center text-sm text-gray-500">Loading...</div>
            ) : (
              boards.map((board) => (
                <DropdownMenuItem
                  key={board.id}
                  onClick={() => router.push(`/board/${board.id}`)}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  {board.name}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center justify-center">
        <Image
          src="/logo_kanban.png"
          alt="KanbanLife Logo"
          width={120}
          height={30}
          className="object-contain"
        />
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Settings className="h-5 w-5 text-gray-600 hover:text-gray-900" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white shadow-lg border border-gray-200">
            <DropdownMenuItem 
              onClick={handleLogout}
              className="cursor-pointer text-gray-700 hover:bg-gray-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
} 