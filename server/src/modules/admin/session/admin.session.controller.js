export function adminSession(req, res) {
  res.status(200).json({ success: true, admin: req.admin });
}
