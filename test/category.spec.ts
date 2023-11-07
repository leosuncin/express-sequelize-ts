import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { app } from '@/app';
import { initDB } from '@/db';
import { type Category } from '@/schemas/category.schema';

describe('Category routes', () => {
  let client: ReturnType<typeof request>;

  beforeAll(async () => {
    await initDB();
  });

  beforeEach(() => {
    client = request(app);
  });

  it('create a new category', async () => {
    const response = await client.post('/category').send({ name: 'test' });
    const category: Category = response.body;

    // status code is 201 Created
    expect(response.status).toBe(StatusCodes.CREATED);
    // category has id property
    expect(category).toHaveProperty('id');
    // category name is test
    expect(category).toHaveProperty('name', 'test');
  });

  it('get a category by id', async () => {
    const response = await client.get('/category/1');
    const category: Category = response.body;

    // status code is 200 OK
    expect(response.status).toBe(StatusCodes.OK);
    // category has id property
    expect(category).toHaveProperty('id', 1);
    // category name is test
    expect(category).toHaveProperty('name', expect.any(String));
  });

  it('list all categories', async () => {
    const response = await client.get('/categories');
    const categories: Category[] = await response.body;

    // status code is 200 OK
    expect(response.status).toBe(StatusCodes.OK);
    // response body is an array
    expect(Array.isArray(categories)).toBe(true);
  });

  it('update a category', async () => {
    const response = await client.patch('/category/1').send({ name: 'temp' });
    const category: Category = response.body;

    // status code is 200 OK
    expect(response.status).toBe(StatusCodes.OK);
    // category has id property
    expect(category).toHaveProperty('id', 1);
    // category name is test
    expect(category).toHaveProperty('name', 'temp');
  });

  it('remove a category', async () => {
    let response = await client
      .post('/category')
      .send({ name: 'ephemeral' })
      .expect(StatusCodes.CREATED);
    const category: Category = response.body;
    response = await client.delete(`/category/${category.id}`);

    // status code is 200 OK
    expect(response.status).toBe(StatusCodes.NO_CONTENT);
    // category has id property
    expect(response.noContent).toBe(true);

    response = await client.get(`/category/${category.id}`);

    // status code is 404 Not Found
    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });
});
