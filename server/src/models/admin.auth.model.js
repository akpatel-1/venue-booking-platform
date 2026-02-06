import { supabase } from "../config/supabase.js";

export async function findAdminByEmail(email) {
  const { data, error } = await supabase
    .from("admins")
    .select("id, email, password_hash")
    .eq("email", email)
    .maybeSingle();
  if (error) throw error;
  return data;
}

