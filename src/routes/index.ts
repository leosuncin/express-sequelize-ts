import { Router } from 'express';

import { brandRouter } from '@/routes/brand.router';
import { categoryRouter } from '@/routes/category.router';
import { productRouter } from '@/routes/product.router';

export const router = Router();

router.use(brandRouter);
router.use(categoryRouter);
router.use(productRouter);
