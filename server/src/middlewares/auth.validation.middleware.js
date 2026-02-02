import { apiError } from "../utils/api.error.js";

export function authValidation(req, res, next) {
  const { username, password } = req.body || {};

  if (!username || !password) {
    throw new apiError(400, "Invalid credentials");
  }

  const normalizedUsername = username.trim().toLowerCase();
  req.body.username = normalizedUsername;

  const usernameRegex = /^[a-z0-9._-]{8,50}$/;

  if (!usernameRegex.test(normalizedUsername)) {
    throw new apiError(400, "Invalid credentials");
  }

  const isOnlySpace = /^\s+$/;
  const hasEdgeSpaces = password.startsWith(" ") || password.endsWith(" ");

  if (isOnlySpace.test(password) || hasEdgeSpaces || password.length < 12) {
    throw new apiError(400, "Invalid credentials");
  }

  next();
}
