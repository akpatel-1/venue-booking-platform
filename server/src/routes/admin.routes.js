import express from "express";
import { authValidation } from "../middlewares/auth.validation.middleware.js";
import { adminLogin } from "../controllers/admin.auth.controller.js";
import { sessionValidation } from "../middlewares/session.validation.middleware.js";
import { adminSession } from "../controllers/admin.session.controller.js";

export const adminRoutes = express.Router();

// Public routes
adminRoutes.post("/login", authValidation, adminLogin);

// Protected routes
adminRoutes.use(sessionValidation);
adminRoutes.get("/auth/session", adminSession);
