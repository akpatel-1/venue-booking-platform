import express from 'express';

import userApplicationRoutes from './application/user.application.routes.js';
import userAuthRoutes from './auth/user.auth.routes.js';

const userRoutes = express.Router();

userRoutes.use(userAuthRoutes);
userRoutes.use(userApplicationRoutes);

export default userRoutes;
