'use client'

import React from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const SignOutButton = () => {
  const router = useRouter()
  
  const handleSignOut = async () => {
    try {
      // Create a Supabase client directly
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      )
      
      // Sign out
      await supabase.auth.signOut()
      
      // Redirect to login page
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  
  return (
    <button 
      onClick={handleSignOut}
      className="text-sm text-red-600 hover:text-red-800"
    >
      Sign Out
    </button>
  )
}

export default SignOutButton 