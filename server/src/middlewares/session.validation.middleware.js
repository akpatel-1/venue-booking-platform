import { getSessionData } from "../infra/redis.session.js";
import { apiError } from "../utils/api.error.js";

export async function sessionValidation(req, res, next) {
  const { sessionId } = req.cookies;

  if (!sessionId) {
    throw new apiError(401, "Unauthorized request");
  }

  const session = await getSessionData(sessionId);

  if (!session) {
    throw new apiError(401, "Unauthorized request");
  }

  req.admin = session;
  next();
}
