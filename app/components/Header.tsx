import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-white dark:bg-dark shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Wall Art
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-primary transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-primary transition-colors">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-primary transition-colors">
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header 