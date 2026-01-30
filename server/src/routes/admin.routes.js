import express from "express";
import { authValidation } from "../middlewares/auth.validation.middleware.js";
import { adminLogin } from "../controllers/admin.auth.controller.js";

export const adminRoutes = express.Router();

// Public routes
adminRoutes.post("/login", authValidation, adminLogin);
