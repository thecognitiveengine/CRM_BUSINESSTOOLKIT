import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const siteUrl = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  });
  throw new Error('Supabase URL and Anon Key must be provided.');
}

console.log('Supabase configuration:', {
  url: supabaseUrl,
  siteUrl: siteUrl,
  hasKey: !!supabaseAnonKey
});

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    redirectTo: `${siteUrl}/auth/callback`,
    flowType: 'pkce'
  },
  realtime: { 
    params: { 
      eventsPerSecond: 10 
    } 
  },
  global: {
    headers: {
      'X-Client-Info': 'bolt-dev-environment'
    }
  }
});

// Add connection test for development
if (import.meta.env.DEV) {
  supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connection test successful:', !!data.session);
    }
  });
}

export type { Database };