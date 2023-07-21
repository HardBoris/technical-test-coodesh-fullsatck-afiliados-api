import { Request } from "express";
import { productRepository } from "../repositories";
import { Product } from "../entities";

class ProductService {
  ProductCreator = async (req: Request): Promise<any> => {
    const body = req.body;
    const product: Product = await productRepository.save(body);

    return product;
  };

  ProductsLoader = async (req: Request) => {
    const products: Product[] = await productRepository.all();

    return {
      status: 200,
      products: products,
    };
  };

  ProductLoader = async (req: Request) => {
    const product: Product = await productRepository.findOne({
      id: req.params.id,
    });
    return {
      status: 200,
      product: product,
    };
  };
}

export default new ProductService();
