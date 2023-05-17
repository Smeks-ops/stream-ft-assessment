export interface CreateProductDTO {
  name: string;
  description: string | null;
  price: number;
  quantity: number;
}

export interface UpdateProductDTO {
  id: number;
  name?: string;
  price?: number;
  quantity?: number;
  description?: string;
}
