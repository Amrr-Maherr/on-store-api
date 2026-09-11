import { type Request, type Response } from 'express';
import Category from './categories.model.js';

export const createCategory = async (req: Request, res: Response) => {
  const { name, slug, image } = req.body;
  const newCategory = await Category.create({
    name,
    slug,
    image,
  });
  console.log(newCategory, 'newCategory');
  res.status(201).json({
    status: 'success',
    data: {
      newCategory,
    },
  });
};
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const existedCategory = await Category.findById(id);

  if (!existedCategory) {
    return res.status(404).json({
      status: 'failed',
      message: 'Category not found',
    });
  }

  await Category.findByIdAndDelete(id);

  res.status(200).json({
    status: 'success',
    message: 'Category deleted successfully',
  });
};
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, image } = req.body;

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      $set: {
        name,
        image,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedCategory) {
    return res.status(404).json({
      status: 'failed',
      message: 'Category not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      updatedCategory,
    },
  });
};
export const getCategories = async (req: Request, res: Response) => {
  const { page = 1, limit = 25, search } = req.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;
  const filters: Record<string, unknown> = {};
  if (search === 'string' && search.trim()) {
    filters.name = { $regex: search.trim(), $options: 'i' };
  }
  const allCategories = await Category.find(filters).skip(skip).limit(limitNumber);
  res.status(200).json({
    status: 'success',
    results: allCategories.length,
    data: {
      allCategories,
    },
  });
};
