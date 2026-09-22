import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Keeping this nullable lets the project render a clear setup message before
// local environment variables have been supplied.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
