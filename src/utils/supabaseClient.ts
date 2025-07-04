import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const siteUrl = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey,
    actualUrl: supabaseUrl,
    actualKeyLength: supabaseAnonKey?.length
  });
  throw new Error('Supabase URL and Anon Key must be provided.');
}

// Validate URL format
if (!supabaseUrl.includes('supabase.co')) {
  console.warn('⚠️ Supabase URL format may be incorrect:', supabaseUrl);
}

console.log('Supabase configuration:', {
  url: supabaseUrl,
  siteUrl: siteUrl,
  hasKey: !!supabaseAnonKey,
  keyLength: supabaseAnonKey?.length,
  urlDomain: supabaseUrl.split('//')[1]?.split('.')[0]
});

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    redirectTo: `${siteUrl}/auth/callback`,
    flowType: 'pkce',
    debug: import.meta.env.DEV,
    // Add storage key to avoid conflicts
    storageKey: 'cognitive-nexus-auth'
  },
  realtime: { 
    params: { 
      eventsPerSecond: 10 
    } 
  },
  global: {
    headers: {
      'X-Client-Info': 'cognitive-nexus-app'
    }
  }
});

// Enhanced connection test for development
if (import.meta.env.DEV) {
  console.log('🔍 Testing Supabase connection...');
  
  // Test basic connection
  supabase.auth.getSession().then(({ data, error }) => {
    if (error && error.message !== 'Auth session missing!') {
      console.error('❌ Supabase connection test failed:', error);
      console.error('Check your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables');
      console.error('Current URL:', supabaseUrl);
    } else {
      console.log('✅ Supabase connection test successful');
      console.log('Session status:', !!data.session ? 'Active session' : 'No active session');
    }
  });

  // Test if we can reach the auth endpoint
  fetch(`${supabaseUrl}/auth/v1/settings`, {
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`
    }
  }).then(response => {
    if (response.ok) {
      console.log('✅ Supabase auth endpoint reachable');
      return response.json();
    } else {
      console.error('❌ Supabase auth endpoint not reachable:', response.status, response.statusText);
      throw new Error(`HTTP ${response.status}`);
    }
  }).then(settings => {
    console.log('✅ Supabase settings retrieved:', settings);
  }).catch(error => {
    console.error('❌ Failed to reach Supabase auth endpoint:', error);
    console.error('This usually means your VITE_SUPABASE_URL is incorrect');
    console.error('Expected format: https://your-project-id.supabase.co');
    console.error('Current URL:', supabaseUrl);
  });
}

export type { Database };