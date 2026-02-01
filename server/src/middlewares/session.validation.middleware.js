import { getSessionData } from "../infra/redis.session.js";

export async function sessionValidation(req, res, next) {
  const { sessionId } = req.cookies;

  if (!sessionId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized request",
    });
  }

  const session = await getSessionData(sessionId);

  if (!session) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized request",
    });
  }

  req.admin = session;
  next();
}
