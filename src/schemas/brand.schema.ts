import { z } from 'zod';

export const createBrand = z.object({ name: z.string().min(1) });

export type CreateBrand = z.infer<typeof createBrand>;

export const brand = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
});

export type Brand = z.infer<typeof brand>;

export const brandId = z.object({ id: z.coerce.number().int().positive() });

export type BrandId = z.infer<typeof brandId>;
