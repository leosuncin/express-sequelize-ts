import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { type Optional } from 'sequelize';

import {
  create,
  getAll,
  getByEmail,
  getById,
  removeById,
  updateById,
} from '@/dal/user.dal';
import { type UserInput, type UserOutput } from '@/models/user.model';
import { NotFoundEntityError } from '@/types/not-found-entity.error';

export type JwtPayload = { sub: number; iat: number; exp: number };

export function createOne(payload: UserInput): Promise<UserOutput> {
  return create(payload);
}

export async function checkJwt({
  sub: id,
}: JwtPayload): Promise<Omit<UserOutput, 'password'>> {
  try {
    const user = await getById(id);

    delete (user as Optional<UserOutput, 'password'>).password;

    return user;
  } catch (error) {
    if (error instanceof NotFoundEntityError) {
      throw createHttpError(StatusCodes.UNAUTHORIZED, error.message);
    }

    throw error;
  }
}

export async function checkCredentials(
  email: string,
  password: string,
): Promise<Omit<UserOutput, 'password'>> {
  try {
    const user = await getByEmail(email);

    const isPasswordValid = await user.verifyPassword(password);

    if (!isPasswordValid) {
      throw createHttpError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }

    delete (user as Optional<UserOutput, 'password'>).password;

    return user;
  } catch (error) {
    if (error instanceof NotFoundEntityError) {
      throw createHttpError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }

    throw error;
  }
}

export function findAll(page?: number, limit?: number): Promise<UserOutput[]> {
  const offset =
    typeof page === 'number' && typeof limit === 'number'
      ? (page - 1) * limit
      : undefined;

  return getAll(offset, limit);
}

export async function updateOne(
  id: number,
  payload: Partial<Omit<UserInput, 'id'>>,
): Promise<UserOutput> {
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
