'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-white font-bold">DT</span>
            </div>
            <span className="text-lg font-bold text-gray-900">Digital Twin</span>
          </Link>

          <nav className="hidden gap-6 md:flex">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Assessment
            </Link>
            <Link
              href="/history"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              History
            </Link>
            <a
              href="#about"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              About
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
