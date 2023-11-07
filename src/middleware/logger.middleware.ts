import { pinoHttp } from 'pino-http';

import { env } from '@/config/env';

export const middleware = pinoHttp({ enabled: !env.isTest });

export const { logger } = middleware;
