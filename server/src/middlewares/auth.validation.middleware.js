export function authValidation(req, res, next) {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const normalizedUsername = username.trim().toLowerCase();
  req.body.username = normalizedUsername;

  const usernameRegex = /^[a-zA-Z0-9._-]{8,50}$/;

  if (!usernameRegex.test(normalizedUsername)) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const isOnlySpace = /^\s+$/;
  const hasEdgeSpaces = password.startsWith(" ") || password.endsWith(" ");

  if (isOnlySpace.test(password) || hasEdgeSpaces || password.length < 12) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  next();
}
