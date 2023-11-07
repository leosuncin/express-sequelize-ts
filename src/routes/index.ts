import { Router } from 'express';

import { brandRouter } from '@/routes/brand.router';

export const router = Router();

router.use(brandRouter);
