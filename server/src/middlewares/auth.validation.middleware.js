import { apiError } from "../utils/api.error.utils.js";

export function authValidation(req, res, next) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    throw new apiError(401, "Invalid credentials");
  }

  const normalizedEmail = email.trim().toLowerCase();
  req.body.email = normalizedEmail;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(normalizedEmail)) {
    throw new apiError(401, "Invalid credentials");
  }

  if (password.trim().length < 12 || password !== password.trim()) {
    throw new apiError(401, "Invalid credentials");
  }

  next();
}
