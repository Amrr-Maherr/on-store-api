import { Router } from 'express';

import { createBrand, getBrands, getBrand, deleteBrand, updateBrand } from './brands.controller.js';
import {
  updateBrandValidation,
  createBrandValidation,
  validateBrandId,
} from './brands.validation.js';
import { validateRequest } from '../../middlewares/validateRequest.js';

export const brandsRouter: Router = Router();

brandsRouter.get('/', getBrands);

brandsRouter.get('/:id', validateBrandId, validateRequest, getBrand);

brandsRouter.post('/', createBrandValidation, validateRequest, createBrand);

brandsRouter.delete('/:id', validateBrandId, validateRequest, deleteBrand);

brandsRouter.patch('/:id', validateBrandId, updateBrandValidation, validateRequest, updateBrand);
