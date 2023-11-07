import { logger } from '@/middleware/logger.middleware';

export function handleExceptions(error: unknown): void {
  logger.fatal(error, '(x_x)');
  process.exitCode = 1;
}
