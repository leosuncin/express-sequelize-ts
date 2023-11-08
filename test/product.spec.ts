import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { app } from '@/app';
import { initDB } from '@/db';
import { CreateProduct, type Product } from '@/schemas/product.schema';

describe('Product routes', () => {
  let client: ReturnType<typeof request>;

  beforeAll(async () => {
    await initDB();
  });

  beforeEach(() => {
    client = request(app);
  });

  it('create a new product', async () => {
    const data: CreateProduct = {
      name: `Amazing Bike - ${new Date().getFullYear()}`,
      modelYear: new Date().getFullYear(),
      listPrice: 999.99,
      brandId: 1,
      categoryId: 1,
    };
    const response = await client.post('/product').send(data);
    const product: Product = response.body;

    // status code is 201 Created
    expect(response.status).toBe(StatusCodes.CREATED);
    // product has id property
    expect(product).toHaveProperty('id');
    // product name is as expected
    expect(product).toHaveProperty('name', data.name);
    // product modelYear is as expected
    expect(product).toHaveProperty('modelYear', data.modelYear);
    // product listPrice is as expected
    expect(product).toHaveProperty('listPrice', data.listPrice);
    // product brandId is as expected
    expect(product).toHaveProperty('brandId', data.brandId);
    // product categoryId is as expected
    expect(product).toHaveProperty('categoryId', data.categoryId);
  });

  it('get a product by id', async () => {
    const response = await client.get('/product/1');
    const product: Product = response.body;

    // status code is 200 OK
    expect(response.status).toBe(StatusCodes.OK);
    // product has id property
    expect(product).toHaveProperty('id', 1);
    // product name is a string
    expect(product).toHaveProperty('name', expect.any(String));
    // product modelYear is a number
    expect(product).toHaveProperty('modelYear', expect.any(Number));
    // product listPrice is a number
    expect(product).toHaveProperty('listPrice', expect.any(Number));
    // product brandId is an object
    expect(product).toHaveProperty('brand', expect.any(Object));
    expect(product).toHaveProperty('brand.id', expect.any(Number));
    expect(product).toHaveProperty('brand.name', expect.any(String));
    // product categoryId is an object
    expect(product).toHaveProperty('category', expect.any(Object));
    expect(product).toHaveProperty('category.id', expect.any(Number));
    expect(product).toHaveProperty('category.name', expect.any(String));
  });

  it('list all products', async () => {
    const response = await client.get('/products');
    const products: Product[] = await response.body;

    // status code is 200 OK
    expect(response.status).toBe(StatusCodes.OK);
    // response body is an array
    expect(Array.isArray(products)).toBe(true);
  });

  it('update a product', async () => {
    const response = await client.patch('/product/1').send({ name: 'bike' });
    const product: Product = response.body;

    // status code is 200 OK
    expect(response.status).toBe(StatusCodes.OK);
    // product has id property
    expect(product).toHaveProperty('id', 1);
    // product name is bike
    expect(product).toHaveProperty('name', 'bike');
  });

  it('remove a product', async () => {
    let response = await client
      .post('/product')
      .send({
        name: 'ephemeral',
        modelYear: new Date().getFullYear(),
        listPrice: 999.99,
        brandId: 1,
        categoryId: 1,
      })
      .expect(StatusCodes.CREATED);
    const product: Product = response.body;
    response = await client.delete(`/product/${product.id}`);

    // status code is 200 OK
    expect(response.status).toBe(StatusCodes.NO_CONTENT);
    // product has id property
    expect(response.noContent).toBe(true);

    response = await client.get(`/product/${product.id}`);

    // status code is 404 Not Found
    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });
});
