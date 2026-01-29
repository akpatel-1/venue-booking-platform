export function authValidation(req, res, next) {
  const { username, password } = req.body || {};

  const usernameRegex = /^[a-zA-Z0-9._-]{8,50}$/;

  if (!username || !password) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  req.body.username = username.trim().toLowerCase();

  if (!usernameRegex.test(username)) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const isOnlySpace = /^\s+$/;
  const hasEdgeSpaces = password.startsWith(" ") || password.endsWith(" ");

  if (isOnlySpace.test(password) || hasEdgeSpaces || password.length < 12) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  next();
}
