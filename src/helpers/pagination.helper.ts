import { Prisma, Products } from '@prisma/client';
import prisma from '../client';

export const queryProducts = async <Key extends keyof Products>(
  filter: Prisma.ProductsWhereInput,
  options: {
    limit?: number | undefined;
    page?: number | undefined;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = ['id', 'name', 'price'] as Key[]
): Promise<Pick<Products, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';

  const products = await prisma.products.findMany({
    where: filter as Prisma.ProductsWhereInput,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: (page - 1) * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return products as Pick<Products, Key>[];
};
