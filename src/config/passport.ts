import { callbackify } from 'node:util';

import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import { env } from '@/config/env';
import { checkCredentials, checkJwt } from '@/services/user.service';

const verifyCredentials = callbackify(checkCredentials);
const verifyJwtPayload = callbackify(checkJwt);

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: false,
      usernameField: 'email',
      session: false,
    },
    verifyCredentials,
  ),
);

passport.use(
  new JwtStrategy(
    {
      passReqToCallback: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET,
      ignoreExpiration: false,
    },
    // @ts-expect-error Ignore
    callbackify(verifyJwtPayload),
  ),
);
