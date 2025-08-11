import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://ptwqparnpzizqdlqzkxp.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0d3FwYXJucHppenFkbHF6a3hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4OTA2MzAsImV4cCI6MjA3MDQ2NjYzMH0.yl9UllyA2Onc0CBJt76hhjrAAmJnoJOzd67TJ_cVD3Y"

export const supabase= createClient(supabaseUrl,supabaseKey)