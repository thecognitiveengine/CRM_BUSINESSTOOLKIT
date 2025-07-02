import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const siteUrl = import.meta.env.VITE_SITE_URL;  // Par exemple : https://effortless-pegasus-502596.netlify.app

if (!supabaseUrl || !supabaseAnonKey || !siteUrl) {
  throw new Error('Supabase URL, Anon Key, and Site URL must be provided.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    redirectTo: `${siteUrl}/auth/callback`,  // redirection après login
  },
  realtime: { params: { eventsPerSecond: 10 } },
});
