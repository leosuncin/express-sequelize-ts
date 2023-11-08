import { ok } from 'node:assert';

import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sign } from 'jsonwebtoken';

import { env } from '@/config/env';
import { type UserOutput } from '@/models/user.model';

declare module 'express' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Request {
    user?: Omit<UserOutput, 'password'>;
  }
}

export function postLogin(request: Request, response: Response): void {
  const { user } = request;

  ok(user);

  const token = sign({ sub: user.id }, env.JWT_SECRET, { expiresIn: '1 day' });

  response.json({ user, token });
}
