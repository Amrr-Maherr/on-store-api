import { type Request, type Response } from 'express';
import Product from './products.model.js';

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, slug, imageCover, images, price, quantity, category, brand } =
    req.body;
  const newProduct = await Product.create({
    name,
    description,
    slug,
    imageCover,
    images,
    price,
    quantity,
    category,
    brand,
  });
  console.log(newProduct, 'newProduct');
  res.status(201).json({
    status: 'success',
    data: {
      newProduct,
    },
  });
};
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const existedProduct = await Product.findById(id);

  if (!existedProduct) {
    return res.status(404).json({
      status: 'failed',
      message: 'Product not found',
    });
  }

  await Product.findByIdAndDelete(id);

  res.status(200).json({
    status: 'success',
    message: 'Product deleted successfully',
  });
};
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, quantity, category, brand } = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        name,
        description,
        price,
        quantity,
        category,
        brand,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedProduct) {
    return res.status(404).json({
      status: 'failed',
      message: 'Product not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      updatedProduct,
    },
  });
};
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({
      status: 'failed',
      message: 'Product not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
};
export const getProducts = async (req: Request, res: Response) => {
  const { page = 1, limit = 25, search } = req.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;
  const filters: Record<string, unknown> = {};
  if (typeof search === 'string' && search.trim()) {
    filters.name = { $regex: search.trim(), $options: 'i' };
  }
  const allProducts = await Product.find(filters).skip(skip).limit(limitNumber);
  res.status(200).json({
    status: 'success',
    results: allProducts.length,
    data: {
      allProducts,
    },
  });
};
