import {
  Product,
  type ProductInput,
  type ProductOutput,
} from '@/models/product.model';
import { NotFoundEntityError } from '@/types/not-found-entity.error';

export function create(payload: ProductInput): Promise<ProductOutput> {
  return Product.create(payload);
}

export async function getById(id: number): Promise<ProductOutput> {
  const product = await Product.findByPk(id, {
    include: ['brand', 'category'],
  });

  if (!product) {
    throw new NotFoundEntityError('Product', id);
  }

  return product;
}

export function getAll(
  offset?: number,
  limit?: number,
): Promise<ProductOutput[]> {
  return Product.findAll({
    ...(typeof offset === 'number' ? { offset } : {}),
    ...(typeof limit === 'number' ? { limit } : {}),
  });
}

export async function updateById(
  id: number,
  payload: Partial<ProductInput>,
): Promise<ProductOutput> {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new NotFoundEntityError('Product', id);
  }

  return product.update(payload);
}

export async function removeById(id: number): Promise<void> {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new NotFoundEntityError('Product', id);
  }

  await product.destroy();
}
