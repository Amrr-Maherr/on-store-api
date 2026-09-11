import { Router } from 'express';

import { createProduct, getProducts, deleteProduct, updateProduct } from './products.controller.js';

export const productsRouter: Router = Router();

productsRouter.get('/', getProducts);

productsRouter.post('/', createProduct);

productsRouter.delete('/:id', deleteProduct);

productsRouter.patch('/:id', updateProduct);
