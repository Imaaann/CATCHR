import { createClient } from "@supabase/supabase-js";

const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export const supabaseSever = createClient(supabaseURL, supabaseKey, {
  auth: { persistSession: false },
});
