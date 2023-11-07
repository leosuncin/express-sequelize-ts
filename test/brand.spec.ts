import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { app } from '@/app';
import { initDB } from '@/db';
import { type Brand } from '@/schemas/brand.schema';

describe('Brand routes', () => {
  let client: ReturnType<typeof request>;

  beforeAll(async () => {
    await initDB();
  });

  beforeEach(() => {
    client = request(app);
  });

  it('create a new brand', async () => {
    const response = await client.post('/brand').send({ name: 'test' });
    const brand: Brand = response.body;

    // status code is 201 Created
    expect(response.status).toBe(StatusCodes.CREATED);
    // brand has id property
    expect(brand).toHaveProperty('id');
    // brand name is test
    expect(brand).toHaveProperty('name', 'test');
  });

  it('get a brand by id', async () => {
    const response = await client.get('/brand/1');
    const brand: Brand = response.body;

    // status code is 200 OK
    expect(response.status).toBe(StatusCodes.OK);
    // brand has id property
    expect(brand).toHaveProperty('id', 1);
    // brand name is test
    expect(brand).toHaveProperty('name', expect.any(String));
  });

  it('list all brands', async () => {
    const response = await client.get('/brands');
    const brands: Brand[] = await response.body;

    // status code is 200 OK
    expect(response.status).toBe(StatusCodes.OK);
    // response body is an array
    expect(Array.isArray(brands)).toBe(true);
  });

  it('update a brand', async () => {
    const response = await client.patch('/brand/1').send({ name: 'temp' });
    const brand: Brand = response.body;

    // status code is 200 OK
    expect(response.status).toBe(StatusCodes.OK);
    // brand has id property
    expect(brand).toHaveProperty('id', 1);
    // brand name is test
    expect(brand).toHaveProperty('name', 'temp');
  });

  it('remove a brand', async () => {
    let response = await client
      .post('/brand')
      .send({ name: 'ephemeral' })
      .expect(StatusCodes.CREATED);
    const brand: Brand = response.body;
    response = await client.delete(`/brand/${brand.id}`);

    // status code is 200 OK
    expect(response.status).toBe(StatusCodes.NO_CONTENT);
    // brand has id property
    expect(response.noContent).toBe(true);

    response = await client.get(`/brand/${brand.id}`);

    // status code is 404 Not Found
    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });
});
