
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ooqufmiiwriwdezgaqby.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vcXVmbWlpd3Jpd2RlemdhcWJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MjcwMTcsImV4cCI6MjA1NzMwMzAxN30.fUkleh448PGPQSTeXjw35yQmyMLxWz9571YICVdjvXc";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
