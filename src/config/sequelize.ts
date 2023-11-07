import { type Dialect, Sequelize } from 'sequelize';

import { env } from '@/config/env';
import { logger } from '@/middleware/logger.middleware';

const dialect: Dialect = 'mysql';

export const sequelizeConnection = new Sequelize(
  env.MYSQL_DATABASE,
  env.MYSQL_USER,
  env.MYSQL_PASSWORD,
  {
    dialect,
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    logging(sql, timing) {
      logger.info(
        sql,
        typeof timing === 'number' ? `Elapsed time: ${timing}ms` : '',
      );
    },
  },
);
