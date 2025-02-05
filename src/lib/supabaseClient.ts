import { createClient } from "@supabase/supabase-js";

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export const supabaseClient = createClient(supabaseURL, supabaseKey);
