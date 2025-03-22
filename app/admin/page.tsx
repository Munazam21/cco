import React from 'react'
import { redirect } from 'next/navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DynamicProductForm from '../components/DynamicProductForm'
import SignOutButton from '../components/SignOutButton'
import { createServerClient } from '../lib/supabase'

export default async function AdminPage() {
  // Create a Supabase client for server component
  const supabase = createServerClient()
  
  // Check if user is authenticated
  const { data, error } = await supabase.auth.getSession()
  
  // If no session or error, redirect to login
  if (error || !data.session) {
    console.log('No valid session detected, redirecting to login')
    redirect('/login')
  }

  return (
    <main>
      <Header />
      
      {/* Admin Header */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Admin Dashboard</h1>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your wall art products and affiliate links
          </p>
          <div className="flex justify-center mt-4">
            <SignOutButton />
          </div>
        </div>
      </section>
      
      {/* Admin Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            
            {/* Use the client component form */}
            <DynamicProductForm />
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
} 