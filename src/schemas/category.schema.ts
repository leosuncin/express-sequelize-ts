import { z } from 'zod';

export const createCategory = z.object({ name: z.string().min(1) });

export type CreateCategory = z.infer<typeof createCategory>;

export const category = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
});

export type Category = z.infer<typeof category>;

export const categoryId = z.object({ id: z.coerce.number().int().positive() });

export type CategoryId = z.infer<typeof categoryId>;
