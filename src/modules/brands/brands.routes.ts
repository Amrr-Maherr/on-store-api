import { Router } from 'express';

import { createBrand, getBrands, deleteBrand, updateBrand } from './brands.controller.js';

export const brandsRouter: Router = Router();

brandsRouter.get('/', getBrands);

brandsRouter.post('/', createBrand);

brandsRouter.delete('/:id', deleteBrand);

brandsRouter.patch('/:id', updateBrand);
