import express from 'express';

import userAuthRoutes from './auth/user.auth.routes.js';

const userRoutes = express.Router();

userRoutes.use(userAuthRoutes);

export default userRoutes;
