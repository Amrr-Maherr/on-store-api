import { body, param } from 'express-validator';

export const createBrandValidation = [
  body('name').notEmpty().withMessage('Brand name is required'),
  body('slug').notEmpty().withMessage('Brand slug is required'),
  body('image').notEmpty().withMessage('Brand image is required'),
  body('owner').notEmpty().withMessage('Brand owner is required'),
];
export const updateBrandValidation = [
  body('name').notEmpty().optional().withMessage('Brand name is required'),
  body('image').notEmpty().optional().withMessage('Brand image is required'),
];
export const validateBrandId = [
  param('id')
    .notEmpty()
    .withMessage('Brand ID is required')
    .isMongoId()
    .withMessage('Invalid brand ID'),
];
