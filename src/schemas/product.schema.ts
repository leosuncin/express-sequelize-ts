import { z } from 'zod';

import { brand } from '@/schemas/brand.schema';
import { category } from '@/schemas/category.schema';

export const createProduct = z.object({
  name: z.string().min(1),
  listPrice: z.coerce.number().nonnegative(),
  modelYear: z.coerce
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  brandId: z.coerce.number().int().positive(),
  categoryId: z.coerce.number().int().positive(),
});

export type CreateProduct = z.infer<typeof createProduct>;

export const updateProduct = z.object({
  name: z.string().min(1).nullish(),
  listPrice: z.coerce.number().nonnegative().nullish(),
  modelYear: z.coerce
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .nullish(),
  brandId: z.coerce.number().int().positive().nullish(),
  categoryId: z.coerce.number().int().positive().nullish(),
});

export type UpdateProduct = z.infer<typeof updateProduct>;

export const product = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  listPrice: z.coerce.number().nonnegative(),
  modelYear: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  brandId: z.number().int().positive(),
  categoryId: z.number().int().positive(),
});

export type Product = z.infer<typeof product>;

export const productPopulated = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  listPrice: z.coerce.number().nonnegative(),
  modelYear: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  brand,
  category,
});

export type ProductPopulated = z.infer<typeof productPopulated>;

export const productId = z.object({ id: z.coerce.number().int().positive() });

export type ProductId = z.infer<typeof productId>;
