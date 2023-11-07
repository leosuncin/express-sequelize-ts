import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  type Brand,
  brand,
  type BrandId,
  type CreateBrand,
} from '@/schemas/brand.schema';
import {
  createOne,
  findAll,
  getOne,
  removeOne,
  updateOne,
} from '@/services/brand.service';

/**
 * POST /brand
 * @summary Create a new brand
 * @description Saves a new brand.
 * @bodyContent {CreateBrand} application/json
 * @bodyRequired
 * @response 201 - The created brand
 * @responseContent {Brand} 201.application/json
 * @response 400 - Invalid request body
 */
export async function postBrand(
  request: Request<never, Brand, CreateBrand>,
  response: Response<Brand>,
): Promise<void> {
  const brand = await createOne(request.body);

  response.status(StatusCodes.CREATED).json(brand);
}

/**
 * GET /brand/{id}
 * @summary Returns a brand by id
 * @description Returns the brand with the id specified
 * @pathParam {integer} id - Numeric ID of the brand to get.
 * @response 200 - The specific brand
 * @responseContent {Brand} 200.application/json
 * @response 404 - Brand not found
 */
export async function getBrand(
  request: Request<BrandId, Brand>,
  response: Response<Brand>,
): Promise<void> {
  const record = await getOne(request.params.id);

  response.json(brand.parse(record));
}

/**
 * GET /brands
 * @summary Returns an array with all of the brands
 * @description The list of all brands.
 * @queryParam {integer} [page=1] - The page number.
 * @queryParam {integer} [limit=10] - The number of brands per page.
 * @response 200 - A JSON array of brands
 * @responseContent {Brands} 200.application/json
 * @response 204 - Empty response
 */
export async function getBrands(
  request: Request<never, Brand[], never, { page: number; limit: number }>,
  response: Response<Brand[]>,
): Promise<void> {
  const { page, limit } = request.query;
  const records = await findAll(page, limit);

  if (records.length === 0) {
    response.status(StatusCodes.NO_CONTENT).end();
    return;
  }

  response.json(brand.array().parse(records));
}

/**
 * PATCH /brand/{id}
 * @summary Updates a brand
 * @description Updates the brand with the id specified
 * @pathParam {integer} id - Numeric ID of the brand to update.
 * @bodyContent {UpdateBrand} application/json
 * @bodyRequired
 * @response 200 - The updated brand
 * @responseContent {Brand} 200.application/json
 * @response 400 - Invalid request body
 * @response 404 - Brand not found
 */
export async function patchBrand(
  request: Request<BrandId, Brand, CreateBrand>,
  response: Response<Brand>,
): Promise<void> {
  const record = await updateOne(request.params.id, request.body);

  response.json(brand.parse(record));
}

/**
 * DELETE /brand/{id}
 * @summary Removes a brand
 * @description Removes the brand with the id specified
 * @pathParam {integer} id - Numeric ID of the brand to remove.
 * @response 200 - The removed brand
 * @responseContent {Brand} 200.application/json
 * @response 404 - Brand not found
 */
export async function deleteBrand(
  request: Request<BrandId>,
  response: Response<never>,
): Promise<void> {
  await removeOne(request.params.id);

  response.status(StatusCodes.NO_CONTENT).end();
}
