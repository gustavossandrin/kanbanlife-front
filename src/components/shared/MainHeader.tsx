import { useState } from 'react'
import Image from 'next/image'
import { Layout, ChevronDown, Settings, LogOut, Plus, ArrowLeft, Menu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/auth/use-auth'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useQuery } from '@tanstack/react-query'
import { boardService } from '@/services/api/board'

interface Board {
  id: string
  name: string
}

export function MainHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { signOut } = useAuth()
  const isNewProjectPage = pathname === '/projects/new'
  const currentBoardId = pathname.startsWith('/board/') ? pathname.split('/')[2] : null

  const { data: boards = [], isLoading } = useQuery<Board[]>({
    queryKey: ['boards'],
    queryFn: boardService.getAllBoards,
    enabled: !isNewProjectPage,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const currentBoard = boards.find(board => board.id === currentBoardId)

  const handleLogout = async () => {
    try {
      await signOut()
      setIsMobileMenuOpen(false)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const NavigationContent = () => (
    <>
      <button
        onClick={() => {
          router.push('/projects')
          setIsMobileMenuOpen(false)
        }}
        className="flex items-center gap-2 rounded p-1.5 text-gray-700 hover:bg-gray-100"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      {!isNewProjectPage && (
        <DropdownMenu>
          <DropdownMenuTrigger 
            className="flex items-center gap-2 rounded px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Layout className="h-4 w-4" />
            Boards {currentBoard && `- ${currentBoard.name}`}
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px] bg-white shadow-lg border border-gray-200">
            {isLoading ? (
              <div className="p-2 text-center text-sm text-gray-500">Loading...</div>
            ) : (
              <>
                <DropdownMenuLabel>Available Boards</DropdownMenuLabel>
                {boards.map((board) => (
                  <DropdownMenuItem
                    key={board.id}
                    onClick={() => {
                      router.push(`/board/${board.id}`)
                      setIsMobileMenuOpen(false)
                    }}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    {board.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  onClick={() => {
                    router.push('/projects/new')
                    setIsMobileMenuOpen(false)
                  }}
                  className="cursor-pointer hover:bg-gray-50 mt-2 border-t border-gray-100 text-purple-600"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Board
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Settings className="h-5 w-5 text-gray-600 hover:text-gray-900" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] bg-white shadow-lg border border-gray-200">
        <DropdownMenuLabel>User Menu</DropdownMenuLabel>
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer text-gray-700 hover:bg-gray-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <header className={`flex h-14 items-center justify-between border-b px-4 relative ${isNewProjectPage ? 'bg-gray-100' : 'bg-white'}`}>
      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <button className="p-2">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 py-4">
              <NavigationContent />
              <div className="mt-auto">
                <button 
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        <NavigationContent />
      </div>

      {/* Logo - Always Centered */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Image
          src="/logo_kanban.png"
          alt="KanbanLife Logo"
          width={120}
          height={30}
          className="object-contain"
        />
      </div>

      {/* Desktop User Menu */}
      <div className="hidden md:flex items-center gap-2">
        <UserMenu />
      </div>

      {/* Empty div for mobile to maintain spacing */}
      <div className="md:hidden w-8"></div>
    </header>
  )
} 