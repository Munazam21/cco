import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LoginForm from '../components/LoginForm'

export const metadata = {
  title: 'Admin Login - Wall Art Affiliate Store',
  description: 'Login to manage your wall art products'
}

export default function LoginPage() {
  return (
    <main>
      <Header />
      
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Admin Login</h1>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Please log in to access the admin dashboard
          </p>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <LoginForm />
        </div>
      </section>
      
      <Footer />
    </main>
  )
} 