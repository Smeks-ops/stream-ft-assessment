import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import ProductService from '../services/product.service';
import { CreateProductDTO, UpdateProductDTO } from '../dto/product.dto';
import { Request, Response } from 'express';

const productService = new ProductService();

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const createProductDTO: CreateProductDTO = req.body;
  const product = await productService.createProduct(createProductDTO);

  res.status(httpStatus.CREATED).send(product);
});

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const result = await productService.getProducts(Number(page), Number(limit));

  res.send(result);
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const product = await productService.getProductById(Number(req.params.id));
  res.send(product);
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const updateProductDTO: UpdateProductDTO = req.body;
  const product = await productService.updateProduct(updateProductDTO);
  res.send(product);
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  await productService.deleteProduct(Number(req.params.id));
  res.status(httpStatus.OK).send();
});

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
