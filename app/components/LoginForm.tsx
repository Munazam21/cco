'use client'

import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debug, setDebug] = useState<string | null>(null)
  const router = useRouter()
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setDebug(null)
    
    try {
      // Log environment variables (obscured for security)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
      setDebug(`Attempting login with Supabase URL: ${supabaseUrl.substring(0, 8)}...`)
      
      // Create a Supabase client directly
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        {
          auth: {
            persistSession: true, // Ensure cookies are set
            autoRefreshToken: true,
            detectSessionInUrl: false
          }
        }
      )
      
      // Attempt login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        throw error
      }
      
      // Check if the session was created successfully
      if (data?.session) {
        setDebug(`Login successful! Session expires at: ${new Date(data.session.expires_at! * 1000).toLocaleString()}`)
        
        // Force refresh the session
        await supabase.auth.refreshSession()
        
        // Wait briefly to ensure cookies are set
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Redirect to admin page after successful login
        router.push('/admin')
        router.refresh()
      } else {
        throw new Error('No session returned after login')
      }
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || 'An error occurred during login')
      setDebug(`Error details: ${JSON.stringify(err)}`)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {debug && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4 text-sm">
          <details>
            <summary>Debug Info (click to expand)</summary>
            <pre className="whitespace-pre-wrap">{debug}</pre>
          </details>
        </div>
      )}
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block mb-2 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
            required
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default LoginForm 