import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import {
  create,
  getAll,
  getById,
  removeById,
  updateById,
} from '@/dal/category.dal';
import {
  type CategoryInput,
  type CategoryOutput,
} from '@/models/category.model';
import { NotFoundEntityError } from '@/types/not-found-entity.error';

export function createOne(payload: CategoryInput): Promise<CategoryOutput> {
  return create(payload);
}

export async function getOne(id: number): Promise<CategoryOutput> {
  try {
    return await getById(id);
  } catch (error) {
    if (error instanceof NotFoundEntityError) {
      throw createHttpError(StatusCodes.NOT_FOUND, error.message);
    }

    throw error;
  }
}

export function findAll(
  page?: number,
  limit?: number,
): Promise<CategoryOutput[]> {
  const offset =
    typeof page === 'number' && typeof limit === 'number'
      ? (page - 1) * limit
      : undefined;

  return getAll(offset, limit);
}

export async function updateOne(
  id: number,
  payload: Partial<Omit<CategoryInput, 'id'>>,
): Promise<CategoryOutput> {
  try {
    return await updateById(id, payload);
  } catch (error) {
    if (error instanceof NotFoundEntityError) {
      throw createHttpError(StatusCodes.NOT_FOUND, error.message);
    }

    throw error;
  }
}

export async function removeOne(id: number): Promise<void> {
  try {
    await removeById(id);
  } catch (error) {
    if (error instanceof NotFoundEntityError) {
      throw createHttpError(StatusCodes.NOT_FOUND, error.message);
    }

    throw error;
  }
}
