import { Brand, type BrandInput, type BrandOutput } from '@/models/brand.model';
import { NotFoundEntityError } from '@/types/not-found-entity.error';

export function create(payload: BrandInput): Promise<BrandOutput> {
  return Brand.create(payload);
}

export async function getById(id: number): Promise<BrandOutput> {
  const brand = await Brand.findByPk(id);

  if (!brand) {
    throw new NotFoundEntityError('Brand', id);
  }

  return brand;
}

export function getAll(
  offset?: number,
  limit?: number,
): Promise<BrandOutput[]> {
  return Brand.findAll({
    ...(typeof offset === 'number' ? { offset } : {}),
    ...(typeof limit === 'number' ? { limit } : {}),
  });
}

export async function updateById(
  id: number,
  payload: Partial<BrandInput>,
): Promise<BrandOutput> {
  const brand = await Brand.findByPk(id);

  if (!brand) {
    throw new NotFoundEntityError('Brand', id);
  }

  return brand.update(payload);
}

export async function removeById(id: number): Promise<void> {
  const brand = await Brand.findByPk(id);

  if (!brand) {
    throw new NotFoundEntityError('Brand', id);
  }

  await brand.destroy();
}
