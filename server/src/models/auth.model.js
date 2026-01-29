import { supabase } from "../config/supabase.js";

export async function findUserByUsername(username) {
  const { data, error } = await supabase
    .from("auth_users")
    .select("id, username, password_hash")
    .eq("username", username)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function updateLastLogin(userId) {
  const { error } = await supabase
    .from("auth_users")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", userId);

  if (error) throw error;
}
