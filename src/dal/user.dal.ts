import { User, type UserInput, type UserOutput } from '@/models/user.model';
import { NotFoundEntityError } from '@/types/not-found-entity.error';

export function create(payload: UserInput): Promise<UserOutput> {
  return User.create(payload);
}

export async function getById(id: number): Promise<UserOutput> {
  const user = await User.findByPk(id);

  if (!user) {
    throw new NotFoundEntityError('User', id);
  }

  return user;
}

export async function getByEmail(email: User['email']): Promise<User> {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new NotFoundEntityError('User', { email });
  }

  return user;
}

export function getAll(offset?: number, limit?: number): Promise<UserOutput[]> {
  return User.findAll({
    ...(typeof offset === 'number' ? { offset } : {}),
    ...(typeof limit === 'number' ? { limit } : {}),
  });
}

export async function updateById(
  id: number,
  payload: Partial<UserInput>,
): Promise<UserOutput> {
  const user = await User.findByPk(id);

  if (!user) {
    throw new NotFoundEntityError('User', id);
  }

  return user.update(payload);
}

export async function removeById(id: number): Promise<void> {
  const user = await User.findByPk(id);

  if (!user) {
    throw new NotFoundEntityError('User', id);
  }

  await user.destroy();
}
