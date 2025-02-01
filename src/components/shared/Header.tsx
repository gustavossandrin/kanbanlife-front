import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo_kanban.png"
              alt="Kanban Life Logo"
              width={150}
              height={40}
              priority
            />
          </Link>
        </div>
        
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link 
                href="https://linkedin.com" 
                target="_blank"
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                LinkedIn
              </Link>
            </li>
            <li>
              <Link 
                href="/about"
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/register"
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Register
              </Link>
            </li>
            <li>
              <Link 
                href="/login"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 