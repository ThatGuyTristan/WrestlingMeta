
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseKey = process.env.VUE_APP_SUPABASE_API_KEY
const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
export const supabase = createClient(
  supabaseUrl, 
  supabaseKey
  )
