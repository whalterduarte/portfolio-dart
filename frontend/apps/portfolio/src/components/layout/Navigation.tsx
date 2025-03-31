'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Portfolio
              </Link>
            </div>
            <div className="ml-10 flex items-center space-x-8">
              <Link
                href="/"
                className={`${
                  isActive('/') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                } px-3 py-2 text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                href="/projects"
                className={`${
                  isActive('/projects') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                } px-3 py-2 text-sm font-medium`}
              >
                Projects
              </Link>
              <Link
                href="/about"
                className={`${
                  isActive('/about') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                } px-3 py-2 text-sm font-medium`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`${
                  isActive('/contact') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                } px-3 py-2 text-sm font-medium`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
