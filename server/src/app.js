import express from "express";
import cors from "cors";
import "dotenv/config";
import { adminRoutes } from "./routes/admin.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());

app.use("/admin", adminRoutes);

export default app;
