import argon2 from "argon2";
import { findUserByUsername, updateLastLogin } from "../models/auth.model.js";

export async function authenticateUser({ username, password }) {
  const user = await findUserByUsername(username);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await argon2.verify(user.password_hash, password);
  if (!isMatch) throw new Error("Invalid credentials");

  await updateLastLogin(user.id);

  return {
    id: user.id,
    username: user.username,
  };
}
