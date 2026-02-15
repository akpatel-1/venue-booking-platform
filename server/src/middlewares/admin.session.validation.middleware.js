import { getSessionData } from "../infrastructure/admin.redis.session.js";
import { apiError } from "../utils/api.error.utils.js";

export async function sessionValidation(req, res, next) {
  const { sessionId } = req.cookies;

  if (!sessionId) {
    throw new apiError(401, "Unauthorized request");
  }

  const session = await getSessionData(sessionId);

  if (!session) {
    throw new apiError(401, "Unauthorized request");
  }

 req.admin = {
   id: session.id,
   email: session.email,
 };

  next();
}
