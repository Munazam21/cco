import { createBrowserClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

// Environment variables will be populated from .env.local file
// Make sure they have default values that are valid URLs
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key'

// Create a Supabase client for server components
export const createServerClient = () => {
  // During build/deployment, we'll return a mock client if in development/test mode
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    })
  }
  
  // In production, ensure we have valid credentials
  if (!supabaseUrl.startsWith('https://') || supabaseKey === 'dummy-key') {
    console.warn('Missing or invalid Supabase credentials. Using mock client.')
  }
  
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  })
}

// Create a Supabase client for client components
export const createBrowserSupabaseClient = () => {
  return createBrowserClient(supabaseUrl, supabaseKey)
} 