import process from 'node:process';

import { cleanEnv, port, str } from 'envalid';

type NODE_ENV = 'development' | 'production' | 'test' | 'ci';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface ProcessEnv {
      NODE_ENV: NODE_ENV;
      PORT: string;
      MYSQL_PORT: string;
      MYSQL_HOST: string;
      MYSQL_USER: string;
      MYSQL_PASSWORD: string;
      MYSQL_DATABASE: string;
      JWT_SECRET: string;
    }
  }
}

process.env.NODE_ENV ??= 'development';

export const env = cleanEnv(process.env, {
  NODE_ENV: str<NODE_ENV>({
    choices: ['development', 'production', 'test', 'ci'],
  }),
  PORT: port({ desc: 'Port to listen', default: 3000 }),
  MYSQL_HOST: str({ desc: 'MySQL host', default: 'localhost' }),
  MYSQL_PORT: port({ desc: 'MySQL port', default: 3306 }),
  MYSQL_USER: str({ desc: 'MySQL user', default: 'root' }),
  MYSQL_PASSWORD: str({ desc: 'Password for the MySQL user' }),
  MYSQL_DATABASE: str({ desc: 'MySQL database name' }),
  JWT_SECRET: str({ desc: 'JWT secret', devDefault: 'eu-sint-ntd-amt' }),
});
