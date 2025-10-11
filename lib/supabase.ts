import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Use placeholder values during build if environment variables are missing
const fallbackUrl = 'https://placeholder.supabase.co'
const fallbackKey = 'placeholder-key'

export const supabase = createClient(
  supabaseUrl || fallbackUrl,
  supabaseAnonKey || fallbackKey
)

// Types for our database tables
export interface ContactSubmission {
  id?: string
  first_name: string
  last_name: string
  company_name: string
  phone: string
  email: string
  location: string
  message: string
  created_at?: string
}

export interface NewsletterSubscription {
  id?: string
  email: string
  subscribed_at?: string
}