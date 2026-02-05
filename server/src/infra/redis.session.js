import { redis } from "../config/redis.js";
import crypto from "crypto";

export async function createRedisSession(adminId, role = "admin") {
  const SESSION_TTL = 60 * 60 * 24;
  const sessionId = crypto.randomUUID();
  const sessionKey = `session:${sessionId}`;
  const sessionData = {
    adminId,
    role,
    createdAt: Date.now(),
  };
  await redis.set(sessionKey, sessionData, {
    ex: SESSION_TTL,
  });
  return sessionId;
}

export async function getSessionData(sessionId) {
  return redis.get(`session:${sessionId}`);
}

export async function deleteSessionData(sessionId) {
  return redis.del(`session:${sessionId}`);
}
