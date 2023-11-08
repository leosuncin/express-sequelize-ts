import '@/config/passport';

import express from 'express';
import paginate from 'express-paginate';
import openapi from 'openapi-comment-parser';
import swaggerUi from 'swagger-ui-express';

import { env } from '@/config/env';
import { errorHandlerMiddleware } from '@/middleware/error-handler.middleware';
import { middleware as loggerMiddleware } from '@/middleware/logger.middleware';
import { notFoundRouteMiddleware } from '@/middleware/not-found-route.middleware';
import { router } from '@/routes';

export const app = express();

const spec = env.isProd ? require('./openapi.json') : openapi(); // eslint-disable-line @typescript-eslint/no-require-imports

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  paginate.middleware(10, 100),
  loggerMiddleware,
);
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(spec, {
    swaggerOptions: {
      displayOperationId: true,
      tryItOutEnabled: true,
      requestSnippetsEnabled: true,
      displayRequestDuration: true,
    },
  }),
);

app.use(router);

app.use(notFoundRouteMiddleware);
app.use(errorHandlerMiddleware);
