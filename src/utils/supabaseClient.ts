import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Enhanced error handling for missing environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase Configuration Error:');
  console.error('Missing required environment variables:');
  if (!supabaseUrl) console.error('- VITE_SUPABASE_URL is not set');
  if (!supabaseAnonKey) console.error('- VITE_SUPABASE_ANON_KEY is not set');
  console.error('Please check your .env file and ensure these variables are properly configured.');
  throw new Error('Missing Supabase environment variables. Check console for details.');
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  console.error('❌ Invalid Supabase URL format:', supabaseUrl);
  throw new Error('Invalid VITE_SUPABASE_URL format. Please provide a valid URL.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'cognitive-nexus-crm'
    }
  },
  // Enhanced error handling for network issues
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Connection test function
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('user_profiles').select('count').limit(1);
    if (error) {
      console.warn('⚠️ Supabase connection test failed:', error.message);
      return false;
    }
    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('❌ Network error connecting to Supabase:', error);
    return false;
  }
};

export type { Database };