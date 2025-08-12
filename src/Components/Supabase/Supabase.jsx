import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cpvsiaaboyncpcyfahkm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwdnNpYWFib3luY3BjeWZhaGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNTYzOTgsImV4cCI6MjA2OTgzMjM5OH0.96oz-V_0CVvYaNq9TgPVV3rfmkrvNSB_6WQ2KyUAnWA";

export const supabase = createClient(supabaseUrl, supabaseKey);
