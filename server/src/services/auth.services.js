import argon2 from "argon2";
import { apiError } from "../utils/api.error.js";
import { findUserByUsername, updateLastLogin } from "../models/auth.model.js";

export async function authenticateUser({ username, password }) {
  
  const user = await findUserByUsername(username);
  
  if (!user) throw new apiError(401, "Invalid credentials");

  let isMatch;
  try {
    isMatch = await argon2.verify(user.password_hash, password);
  } catch {
    throw new apiError(503, "Service temporarily unavailable");
  }
  if (!isMatch) throw new apiError(401, "Invalid credentials");

  await updateLastLogin(user.id);

  return {
    id: user.id,
    username: user.username,
  };
}
