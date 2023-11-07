import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import {
  deleteCategory,
  getCategories,
  getCategory,
  patchCategory,
  postCategory,
} from '@/controllers/category.controller';
import { validateMiddleware } from '@/middleware/validate.middleware';
import { categoryId, createCategory } from '@/schemas/category.schema';

export const categoryRouter = Router();

categoryRouter.get('/categories', asyncHandler(getCategories));

categoryRouter.post(
  '/category',
  validateMiddleware({ body: createCategory }),
  asyncHandler(postCategory),
);

categoryRouter
  .route('/category/:id')
  .get(
    validateMiddleware({ params: categoryId }),
    // @ts-expect-error TODO: fix this
    asyncHandler(getCategory),
  )
  .patch(
    validateMiddleware({ params: categoryId, body: createCategory }),
    // @ts-expect-error TODO: fix this
    asyncHandler(patchCategory),
  )
  .delete(
    validateMiddleware({ params: categoryId }),
    // @ts-expect-error TODO: fix this
    asyncHandler(deleteCategory),
  );
