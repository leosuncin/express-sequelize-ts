import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import {
  deleteBrand,
  getBrand,
  getBrands,
  patchBrand,
  postBrand,
} from '@/controllers/brand.controller';
import { validateMiddleware } from '@/middleware/validate.middleware';
import { brandId, createBrand } from '@/schemas/brand.schema';

export const brandRouter = Router();

brandRouter.route('/brands').get(asyncHandler(getBrands));

brandRouter
  .route('/brand')
  .post(validateMiddleware({ body: createBrand }), asyncHandler(postBrand));

brandRouter
  .route('/brand/:id')
  .get(
    validateMiddleware({ params: brandId }),
    // @ts-expect-error TODO: fix this
    asyncHandler(getBrand),
  )
  .patch(
    validateMiddleware({ params: brandId, body: createBrand }),
    // @ts-expect-error TODO: fix this
    asyncHandler(patchBrand),
  )
  .delete(
    validateMiddleware({ params: brandId }),
    // @ts-expect-error TODO: fix this
    asyncHandler(deleteBrand),
  );
