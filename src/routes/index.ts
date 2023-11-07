import { Router } from 'express';

import { brandRouter } from '@/routes/brand.router';
import { categoryRouter } from '@/routes/category.router';

export const router = Router();

router.use(brandRouter);
router.use(categoryRouter);
