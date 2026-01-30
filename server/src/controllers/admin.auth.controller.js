import { authenticateUser } from "../services/auth.services.js";
import { createRedisSession } from "../infra/redis.session.js";
import "dotenv/config";
export async function adminLogin(req, res) {
  try {
    const admin = await authenticateUser(req.body);

    const sessionId = await createRedisSession(admin.id);

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      admin: {
        id: admin.id,
        username: admin.username,
      },
    });
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}
