import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import {
  create,
  getAll,
  getById,
  removeById,
  updateById,
} from '@/dal/brand.dal';
import { type BrandInput, type BrandOutput } from '@/models/brand.model';
import { NotFoundEntityError } from '@/types/not-found-entity.error';

export function createOne(payload: BrandInput): Promise<BrandOutput> {
  return create(payload);
}

export async function getOne(id: number): Promise<BrandOutput> {
  try {
    return await getById(id);
  } catch (error) {
    if (error instanceof NotFoundEntityError) {
      throw createHttpError(StatusCodes.NOT_FOUND, error.message);
    }

    throw error;
  }
}

export function findAll(page?: number, limit?: number): Promise<BrandOutput[]> {
  const offset =
    typeof page === 'number' && typeof limit === 'number'
      ? (page - 1) * limit
      : undefined;

  return getAll(offset, limit);
}

export async function updateOne(
  id: number,
  payload: Partial<Omit<BrandInput, 'id'>>,
): Promise<BrandOutput> {
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
