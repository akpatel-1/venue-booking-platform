export function adminSession(req, res) {
  res.status(200).json({ admin: req.admin });
}
