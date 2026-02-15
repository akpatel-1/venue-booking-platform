import express from "express";
import { authValidation } from "../middlewares/auth.validation.middleware.js";
import { registerWithEmail } from "../controllers/user.auth.controller.js";

export const userRoutes = express.Router();

userRoutes.post("/auth/signup/email", authValidation, registerWithEmail);
