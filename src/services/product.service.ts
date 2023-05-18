import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import prisma from '../client';
import exclude from '../utils/exclude';
import { CreateProductDTO, UpdateProductDTO } from '../dto/product.dto';
import {
  CreateProductResponse,
  DeleteProductResponse,
  GetProductResponse,
  GetProductsResponse,
  UpdateProductResponse
} from '../types/product';
import { queryProducts } from '../helpers/pagination.helper';
import config from '../config/config';
import { sendMessage } from '../aws/sqs';

export default class ProductService {
  /**
   * Create a product
   * @param {Object} body
   * @returns {Promise<CreateProductResponse>}
   */
  createProduct = async (body: CreateProductDTO): Promise<CreateProductResponse> => {
    try {
      const product = await prisma.products.create({
        data: {
          ...body
        }
      });
      const queueUrl = config.aws.queueUrl;
      // send message to sqs
      await sendMessage(queueUrl, JSON.stringify(product));

      return {
        data: {
          ...exclude(product, ['id'])
        },
        status: 'success',
        message: 'Product created successfully'
      };
    } catch (error: any) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message || 'create product failed');
    }
  };

  /**
   * Query for products
   * @param {limit} limit - Maximum number of results per page (default = 10)
   * @param {page} page - Current page (default = 1)
   * @param {sortBy} sortBy - Sort option in the format: sortField:(desc|asc)
   * @param {sortType} sortType - Sort option in the format: sortField:(desc|asc)
   * @returns {Promise<GetProductsResponse>}
   */

  getProducts = async (page: number, limit: number): Promise<GetProductsResponse> => {
    try {
      const filter = { isActive: true };

      const options = { page, limit };
      const products = await queryProducts(filter, options);
      return {
        data: products,
        status: 'success',
        message: 'Products retrieved successfully'
      };
    } catch (error: any) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message || 'get products failed');
    }
  };

  /**
   *
   * @param id
   * @returns {Promise<GetProductResponse | null>}
   */
  getProductById = async (id: number): Promise<GetProductResponse | null> => {
    try {
      const product = await prisma.products.findUnique({
        where: { id }
      });
      return {
        data: product,
        status: 'success',
        message: 'Product retrieved successfully'
      };
    } catch (error: any) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message || 'product not found');
    }
  };

  /**
   *
   * @param body {UpdateProductDTO}
   * @returns {Promise<UpdateProductResponse>}
   */
  updateProduct = async (body: UpdateProductDTO): Promise<UpdateProductResponse> => {
    try {
      const product = await prisma.products.update({
        where: { id: body.id },
        data: {
          ...body
        }
      });
      return {
        data: product,
        status: 'success',
        message: 'Product updated successfully'
      };
    } catch (error: any) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message || 'update product failed');
    }
  };
  /**
   * @param id
   * @returns {Promise<UpdateProductResponse>}
   */
  deleteProduct = async (id: number): Promise<DeleteProductResponse> => {
    try {
      const product = await prisma.products.findUnique({
        where: { id }
      });

      if (!product || product.isActive === false) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'product not found');
      }

      await prisma.products.update({
        where: { id },
        data: {
          isActive: false
        }
      });
      return {
        status: 'success',
        message: 'Product deleted successfully'
      };
    } catch (error: any) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message || 'delete product failed');
    }
  };
}
