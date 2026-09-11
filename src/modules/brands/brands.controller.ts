import { type Request, type Response } from 'express';
import Brand from './brands.model.js';

export const createBrand = async (req: Request, res: Response) => {
  const { name, slug, image } = req.body;
  const newBrand = await Brand.create({
    name,
    slug,
    image,
  });
  console.log(newBrand, 'newBrand');
  res.status(201).json({
    status: 'success',
    data: {
      newBrand,
    },
  });
};
export const deleteBrand = async (req: Request, res: Response) => {
  const { id } = req.params;

  const existedBrand = await Brand.findById(id);

  if (!existedBrand) {
    return res.status(404).json({
      status: 'failed',
      message: 'Brand not found',
    });
  }

  await Brand.findByIdAndDelete(id);

  res.status(200).json({
    status: 'success',
    message: 'Brand deleted successfully',
  });
};
export const updateBrand = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, image } = req.body;

  const updatedBrand = await Brand.findByIdAndUpdate(
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

  if (!updatedBrand) {
    return res.status(404).json({
      status: 'failed',
      message: 'Brand not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      updatedBrand,
    },
  });
};
export const getBrands = async (req: Request, res: Response) => {
  const { page = 1, limit = 25, search } = req.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;
  const filters: Record<string, unknown> = {};
  if (search === 'string' && search.trim()) {
    filters.name = { $regex: search.trim(), $options: 'i' };
  }
  const allBrands = await Brand.find(filters).skip(skip).limit(limitNumber);
  res.status(200).json({
    status: 'success',
    results: allBrands.length,
    data: {
      allBrands,
    },
  });
};
