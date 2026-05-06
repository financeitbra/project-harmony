import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// These are public values for the Supabase project
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://mgmhhltfdiigsvkirgyz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbWhobHRmZGlpZ3N2a2lyZ3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MjcxNzgsImV4cCI6MjA5MjEwMzE3OH0.b0EG7UMCDHKPc9N_LyJCoAlaOYBfWhRJMu67PcYIzdQ";

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
  console.warn("Supabase environment variables are missing! Using fallback configuration.");
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
