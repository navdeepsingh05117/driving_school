import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vktrvnjumwnrogiidvdw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrdHJ2bmp1bXducm9naWlkdmR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NDMyMTIsImV4cCI6MjA5NjQxOTIxMn0.LPZGE_BDsiwn06XD8_I_YQXaeKDx_Hc9i0kc60c6YO8';

export const supabase = createClient(supabaseUrl, supabaseKey);
export const isSupabaseConfigured = true;
