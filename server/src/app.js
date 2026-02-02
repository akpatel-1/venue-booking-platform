import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { adminRoutes } from "./routes/admin.routes.js";
import { errorHandler } from "./middlewares/error.handler.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/admin", adminRoutes);
app.use(errorHandler);

export default app;
