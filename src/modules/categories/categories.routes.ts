import { Router } from 'express';
import multer from 'multer';

import {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} from './categories.controller.js';
import {
  updateCategoryValidation,
  createCategoryValidation,
  validateCategoryId,
} from './categories.validation.js';
import { validateRequest } from '../../middlewares/validateRequest.js';

const upload = multer({ dest: 'uploads/categories' });

export const categoriesRouter: Router = Router();

categoriesRouter.get('/', getCategories);

categoriesRouter.get('/:id', validateCategoryId, validateRequest, getCategory);

categoriesRouter.post('/', upload.single('image'), createCategoryValidation, validateRequest, createCategory);

categoriesRouter.delete('/:id', validateCategoryId, validateRequest, deleteCategory);

categoriesRouter.patch(
  '/:id',
  upload.single('image'),
  validateCategoryId,
  updateCategoryValidation,
  validateRequest,
  updateCategory
);
