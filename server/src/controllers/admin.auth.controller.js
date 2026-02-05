import { authenticateUser } from "../services/auth.services.js";
import {
  createRedisSession,
  deleteSessionData,
} from "../infra/redis.session.js";
import "dotenv/config";
export async function adminLogin(req, res) {
  const admin = await authenticateUser(req.body);
  const sessionId = await createRedisSession(admin.id);

  res.cookie("sessionId", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      id: admin.id,
      username: admin.username,
    },
  });
}

export async function adminLogout(req, res) {
  try {
    const { sessionId } = req.cookies;

    if (sessionId) {
      await deleteSessionData(sessionId);
      res.clearCookie("sessionId", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
}
