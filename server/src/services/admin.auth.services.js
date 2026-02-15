import argon2 from "argon2";
import { apiError } from "../utils/api.error.utils.js";
import { findAdminByEmail } from "../models/admin.auth.model.js";

export async function authenticateAdmin({ email, password }) {
  const admin = await findAdminByEmail(email);
  if (!admin) throw new apiError(401, "Invalid credentials");

  try {
    const isMatch = await argon2.verify(admin.password_hash, password);
    if (!isMatch) throw new apiError(401, "Invalid credentials");
  } catch (err) {
    if (err instanceof apiError) throw err;
    throw new apiError(500, "Service temporarily unavailable");
  }

  return {
    id: admin.id,
    email: admin.email,
  };
}
