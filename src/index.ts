import process from 'node:process';

import { createTerminus, HealthCheckError } from '@godaddy/terminus';

import { app } from '@/app';
import { env } from '@/config/env';
import { sequelizeConnection } from '@/config/sequelize';
import { initDB } from '@/db';
import { logger } from '@/middleware/logger.middleware';
import { handleExceptions } from '@/utils/handle-exceptions';

void initDB();

process.on('unhandledRejection', handleExceptions);
process.on('uncaughtException', handleExceptions);

const server = app.listen(env.PORT, () => {
  logger.info(`Server is listening on http://localhost:${env.PORT}`);
});
server.on('error', handleExceptions);

createTerminus(server, {
  healthChecks: {
    async '/health-check'() {
      try {
        await sequelizeConnection.authenticate();
      } catch (error) {
        throw new HealthCheckError(
          'DB connection failed',
          error instanceof AggregateError ? error.errors : error,
        );
      }
    },
  },
  onSignal() {
    return sequelizeConnection.close();
  },
  logger: logger.fatal.bind(logger),
});
