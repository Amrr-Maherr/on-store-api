import { body, param } from 'express-validator';

export const createProductValidation = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Product description is required'),
  body('slug').notEmpty().withMessage('Product slug is required'),
  body('imageCover').notEmpty().withMessage('Product imageCover is required'),
  body('images').notEmpty().withMessage('Product images are required'),
  body('price').notEmpty().withMessage('Product price is required'),
  body('quantity').notEmpty().withMessage('Product quantity is required'),
  body('category').notEmpty().withMessage('Product category is required'),
  body('brand').notEmpty().withMessage('Product brand is required'),
];
export const updateProductValidation = [
  body('name').notEmpty().optional().withMessage('Product name is required'),
  body('description').notEmpty().optional().withMessage('Product description is required'),
  body('price').notEmpty().optional().withMessage('Product price is required'),
  body('quantity').notEmpty().optional().withMessage('Product quantity is required'),
  body('category').notEmpty().optional().withMessage('Product category is required'),
  body('brand').notEmpty().optional().withMessage('Product brand is required'),
];
export const validateProductId = [
  param('id')
    .notEmpty()
    .withMessage('Product ID is required')
    .isMongoId()
    .withMessage('Invalid product ID'),
];
