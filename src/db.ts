import { env } from '@/config/env';
import { Brand } from '@/models/brand.model';

export async function initDB(): Promise<void> {
  await Brand.sync({ alter: env.isDev });
}
