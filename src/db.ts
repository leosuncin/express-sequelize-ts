import { env } from '@/config/env';
import { Brand } from '@/models/brand.model';
import { Category } from '@/models/category.model';
import { Product } from '@/models/product.model';
import { User } from '@/models/user.model';

export async function initDB(): Promise<void> {
  await Brand.sync({ alter: env.isDev });
  await Category.sync({ alter: env.isDev });
  await Product.sync({ alter: env.isDev });
  await User.sync({ alter: env.isDev });
}
