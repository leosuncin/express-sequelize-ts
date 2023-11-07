import {
  Category,
  type CategoryInput,
  type CategoryOutput,
} from '@/models/category.model';
import { NotFoundEntityError } from '@/types/not-found-entity.error';

export function create(payload: CategoryInput): Promise<CategoryOutput> {
  return Category.create(payload);
}

export async function getById(id: number): Promise<CategoryOutput> {
  const category = await Category.findByPk(id);

  if (!category) {
    throw new NotFoundEntityError('Category', id);
  }

  return category;
}

export function getAll(
  offset?: number,
  limit?: number,
): Promise<CategoryOutput[]> {
  return Category.findAll({
    ...(typeof offset === 'number' ? { offset } : {}),
    ...(typeof limit === 'number' ? { limit } : {}),
  });
}

export async function updateById(
  id: number,
  payload: Partial<Omit<CategoryInput, 'id'>>,
): Promise<CategoryOutput> {
  const category = await Category.findByPk(id);

  if (!category) {
    throw new NotFoundEntityError('Category', id);
  }

  return category.update(payload);
}

export async function removeById(id: number): Promise<void> {
  const category = await Category.findByPk(id);

  if (!category) {
    throw new NotFoundEntityError('Category', id);
  }

  await category.destroy();
}
