import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavigationLinks = () => (
    <ul className="flex md:flex-row flex-col space-y-4 md:space-y-0 items-start md:items-center">
      <li className="md:mr-8">
        <Link 
          href="https://www.linkedin.com/in/gustavo-sandrin-848044241/"
          target="_blank"
          className="text-gray-700 hover:text-purple-600 transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          LinkedIn
        </Link>
      </li>
      <li className="md:mr-8">
        <Link 
          href="https://github.com/gustavossandrin"
          target="_blank"
          className="text-gray-700 hover:text-purple-600 transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          GitHub
        </Link>
      </li>
      <li className="md:mr-8">
        <Link 
          href="/about"
          className="text-gray-700 hover:text-purple-600 transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          About
        </Link>
      </li>
      <li className="md:mr-8">
        <Link 
          href="/register"
          className="text-gray-700 hover:text-purple-600 transition-colors md:text-base md:px-5 md:py-2.5"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Register
        </Link>
      </li>
      <li>
        <Link 
          href="/login"
          className="px-4 py-2 md:px-5 md:py-2.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors md:text-base"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="md:hidden z-10">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetTitle className="text-lg font-semibold mb-4">
                Menu
              </SheetTitle>
              <div className="flex flex-col gap-4 py-4">
                <NavigationLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div className="md:flex md:items-center md:relative absolute left-1/2 transform -translate-x-1/2 md:left-0 md:transform-none">
          <Link href="/">
            <Image
              src="/logo_kanban.png"
              alt="Kanban Life Logo"
              width={120}
              height={30}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-end">
          <nav>
            <NavigationLinks />
          </nav>
        </div>

        {/* Empty div for mobile spacing */}
        <div className="md:hidden w-8 z-10"></div>
      </div>
    </header>
  );
};

export default Header; 