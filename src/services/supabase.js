import { createClient } from '@supabase/supabase-js';

// const SUPABASE_URL = "https://whqgjjlmixwfhgzqyqos.supabase.co";
// const SUPABASE_KEY = "sb_publishable_WdimVTZMDG7PRNKwhcADiw_NY2qRboU";


const SUPABASE_URL = "http://127.0.0.1:54321";
const SUPABASE_KEY = "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH";

export const supabase = createClient (SUPABASE_URL, SUPABASE_KEY);