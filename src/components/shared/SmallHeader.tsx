import { Settings, LogOut } from 'lucide-react'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth/use-auth'

export function SmallHeader() {
  const router = useRouter()
  const { signOut } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <header className="flex h-14 items-center justify-between bg-gray-100 px-4">
      <div className="flex-1" />
      <div className="flex items-center justify-center">
        <Image
          src="/logo_kanban.png"
          alt="KanbanLife Logo"
          width={120}
          height={30}
          className="object-contain"
        />
      </div>
      <div className="flex flex-1 justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Settings className="h-5 w-5 text-gray-700 hover:text-purple-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={handleLogout}
              className="cursor-pointer text-gray-700 hover:bg-purple-50 hover:text-purple-600"
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