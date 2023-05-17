import { CreateProductDTO } from '../dto/product.dto';

export interface CreateProductResponse {
  status: string;
  message: string;
  data: CreateProductDTO;
}

export interface GetProductsResponse {
  status: string;
  message: string;
  data: any;
}

export interface GetProductResponse {
  status: string;
  message: string;
  data: CreateProductDTO | null;
}

export interface UpdateProductResponse {
  status: string;
  message: string;
  data: CreateProductDTO;
}
export interface DeleteProductResponse {
  status: string;
  message: string;
}
