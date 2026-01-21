import express from "express";

const adminRoutes = express.Router();

adminRoutes.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);

  res.json({
    success: true,
    message: "Working perfectly",
  });
});

export default adminRoutes;
