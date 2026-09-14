import { Router } from 'express';

import {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} from './products.controller.js';
import {
  updateProductValidation,
  createProductValidation,
  validateProductId,
} from './products.validation.js';
import { validateRequest } from '../../middlewares/validateRequest.js';

export const productsRouter: Router = Router();

productsRouter.get('/', getProducts);

productsRouter.get('/:id', validateProductId, validateRequest, getProduct);

productsRouter.post('/', createProductValidation, validateRequest, createProduct);

productsRouter.delete('/:id', validateProductId, validateRequest, deleteProduct);

productsRouter.patch(
  '/:id',
  validateProductId,
  updateProductValidation,
  validateRequest,
  updateProduct
);
