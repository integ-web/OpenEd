import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseConfigured = false; // Forced to false per user request to disable Supabase Auth

export const supabase = createClient(
  supabaseUrl ?? "https://local-dev.supabase.co",
  supabaseAnonKey ?? "local-dev-anon-key",
);
