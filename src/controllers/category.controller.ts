import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  type Category,
  category,
  type CategoryId,
  type CreateCategory,
} from '@/schemas/category.schema';
import {
  createOne,
  findAll,
  getOne,
  removeOne,
  updateOne,
} from '@/services/category.service';

/**
 * POST /category
 * @summary Create a new category
 * @description Saves a new category.
 * @bodyContent {CreateCategory} application/json
 * @bodyRequired
 * @response 201 - The created category
 * @responseContent {Category} 201.application/json
 * @response 400 - Invalid request body
 */
export async function postCategory(
  request: Request<never, Category, CreateCategory>,
  response: Response<Category>,
): Promise<void> {
  const category = await createOne(request.body);

  response.status(StatusCodes.CREATED).json(category);
}

/**
 * GET /category/{id}
 * @summary Returns a category by id
 * @description Returns the category with the id specified
 * @pathParam {integer} id - Numeric ID of the category to get.
 * @response 200 - The specific category
 * @responseContent {Category} 200.application/json
 * @response 404 - Category not found
 */
export async function getCategory(
  request: Request<CategoryId, Category>,
  response: Response<Category>,
): Promise<void> {
  const record = await getOne(request.params.id);

  response.json(category.parse(record));
}

/**
 * GET /categories
 * @summary Returns an array with all of the categories
 * @description The list of all categories.
 * @queryParam {integer} [page=1] - The page number.
 * @queryParam {integer} [limit=10] - The number of categories per page.
 * @response 200 - A JSON array of categories
 * @responseContent {Categories} 200.application/json
 * @response 204 - Empty response
 */
export async function getCategories(
  request: Request<never, Category[], never, { page: number; limit: number }>,
  response: Response<Category[]>,
): Promise<void> {
  const { page, limit } = request.query;
  const records = await findAll(page, limit);

  if (records.length === 0) {
    response.status(StatusCodes.NO_CONTENT).end();
    return;
  }

  response.json(category.array().parse(records));
}

/**
 * PATCH /category/{id}
 * @summary Updates a category
 * @description Updates the category with the id specified
 * @pathParam {integer} id - Numeric ID of the category to update.
 * @bodyContent {UpdateCategory} application/json
 * @bodyRequired
 * @response 200 - The updated category
 * @responseContent {Category} 200.application/json
 * @response 400 - Invalid request body
 * @response 404 - Category not found
 */
export async function patchCategory(
  request: Request<CategoryId, Category, CreateCategory>,
  response: Response<Category>,
): Promise<void> {
  const record = await updateOne(request.params.id, request.body);

  response.json(category.parse(record));
}

/**
 * DELETE /category/{id}
 * @summary Removes a category
 * @description Removes the category with the id specified
 * @pathParam {integer} id - Numeric ID of the category to remove.
 * @response 200 - The removed category
 * @responseContent {Category} 200.application/json
 * @response 404 - Category not found
 */
export async function deleteCategory(
  request: Request<CategoryId>,
  response: Response<never>,
): Promise<void> {
  await removeOne(request.params.id);

  response.status(StatusCodes.NO_CONTENT).end();
}
