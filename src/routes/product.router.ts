import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import {
  deleteProduct,
  getProduct,
  getProducts,
  patchProduct,
  postProduct,
} from '@/controllers/product.controller';
import { validateMiddleware } from '@/middleware/validate.middleware';
import {
  createProduct,
  productId,
  updateProduct,
} from '@/schemas/product.schema';

export const productRouter = Router();

productRouter.get('/products', asyncHandler(getProducts));

productRouter.post(
  '/product',
  validateMiddleware({ body: createProduct }),
  asyncHandler(postProduct),
);

productRouter
  .route('/product/:id')
  .get(
    validateMiddleware({ params: productId }),
    // @ts-expect-error TODO: fix this
    asyncHandler(getProduct),
  )
  .patch(
    validateMiddleware({ params: productId, body: updateProduct }),
    // @ts-expect-error TODO: fix this
    asyncHandler(patchProduct),
  )
  .delete(
    validateMiddleware({ params: productId }),
    // @ts-expect-error TODO: fix this
    asyncHandler(deleteProduct),
  );
