import { body, param } from 'express-validator';

export const createCategoryValidation = [
  body('name').notEmpty().withMessage('Category name is required'),
  body('slug').notEmpty().withMessage('Category slug is required'),
  body('image').notEmpty().withMessage('Category image is required'),
  body('owner').notEmpty().withMessage('Category owner is required'),
];
export const updateCategoryValidation = [
  body('name').notEmpty().optional().withMessage('Category name is required'),
  body('image').notEmpty().optional().withMessage('Category image is required'),
];
export const validateCategoryId = [
  param('id')
    .notEmpty()
    .withMessage('Category ID is required')
    .isMongoId()
    .withMessage('Invalid category ID'),
];
