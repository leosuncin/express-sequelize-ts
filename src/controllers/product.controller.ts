import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  type CreateProduct,
  type Product,
  product,
  type ProductId,
  type ProductPopulated,
  productPopulated,
  type UpdateProduct,
} from '@/schemas/product.schema';
import {
  createOne,
  findAll,
  getOne,
  removeOne,
  updateOne,
} from '@/services/product.service';

/**
 * POST /product
 * @summary Create a new product
 * @description Saves a new product.
 * @bodyContent {CreateProduct} application/json
 * @bodyRequired
 * @response 201 - The created product
 * @responseContent {Product} 201.application/json
 * @response 400 - Invalid request body
 */
export async function postProduct(
  request: Request<never, Product, CreateProduct>,
  response: Response<Product>,
): Promise<void> {
  const product = await createOne(request.body);

  response.status(StatusCodes.CREATED).json(product);
}

/**
 * GET /product/{id}
 * @summary Returns a product by id
 * @description Returns the product with the id specified
 * @pathParam {integer} id - Numeric ID of the product to get.
 * @response 200 - The specific product
 * @responseContent {Product} 200.application/json
 * @response 404 - Product not found
 */
export async function getProduct(
  request: Request<ProductId, ProductPopulated>,
  response: Response<ProductPopulated>,
): Promise<void> {
  const record = await getOne(request.params.id);

  response.json(productPopulated.parse(record));
}

/**
 * GET /products
 * @summary Returns an array with all of the products
 * @description The list of all products.
 * @queryParam {integer} [page=1] - The page number.
 * @queryParam {integer} [limit=10] - The number of products per page.
 * @response 200 - A JSON array of products
 * @responseContent {Products} 200.application/json
 * @response 204 - Empty response
 */
export async function getProducts(
  request: Request<never, Product[], never, { page: number; limit: number }>,
  response: Response<Product[]>,
): Promise<void> {
  const { page, limit } = request.query;
  const records = await findAll(page, limit);

  if (records.length === 0) {
    response.status(StatusCodes.NO_CONTENT).end();
    return;
  }

  response.json(product.array().parse(records));
}

/**
 * PATCH /product/{id}
 * @summary Updates a product
 * @description Updates the product with the id specified
 * @pathParam {integer} id - Numeric ID of the product to update.
 * @bodyContent {UpdateProduct} application/json
 * @bodyRequired
 * @response 200 - The updated product
 * @responseContent {Product} 200.application/json
 * @response 400 - Invalid request body
 * @response 404 - Product not found
 */
export async function patchProduct(
  request: Request<ProductId, Product, UpdateProduct>,
  response: Response<Product>,
): Promise<void> {
  const record = await updateOne(
    request.params.id,
    request.body as {
      [K in keyof UpdateProduct]: NonNullable<UpdateProduct[K]>;
    },
  );

  response.json(product.parse(record));
}

/**
 * DELETE /product/{id}
 * @summary Removes a product
 * @description Removes the product with the id specified
 * @pathParam {integer} id - Numeric ID of the product to remove.
 * @response 200 - The removed product
 * @responseContent {Product} 200.application/json
 * @response 404 - Product not found
 */
export async function deleteProduct(
  request: Request<ProductId>,
  response: Response<never>,
): Promise<void> {
  await removeOne(request.params.id);

  response.status(StatusCodes.NO_CONTENT).end();
}
