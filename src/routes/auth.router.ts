import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';

import { postLogin } from '@/controllers/auth.controller';
import { validateMiddleware } from '@/middleware/validate.middleware';

export const authRouter = Router();

// @ts-expect-error Ignore override
authRouter.post('/auth/login', passport.authenticate('local'), postLogin);
