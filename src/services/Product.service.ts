import { Request } from "express";
import { productRepository } from "../repositories";
import { Product } from "../entities";
import { productShape } from "../shapes";

class ProductService {
  productCreator = async (req: Request): Promise<any> => {
    const body = req.body;
    const product: Product = await productRepository.save(body);

    return product;
  };

  productsLoader = async (req: Request) => {
    const products: Product[] = await productRepository.all();

    return {
      status: 200,
      products: await productShape.products.validate(products, {
        stripUnknown: true,
      }),
    };
  };

  productLoader = async (req: Request) => {
    const product: Product = await productRepository.findOne({
      product: req.params.product,
    });
    return {
      status: 200,
      product: product,
    };
  };
}

export default new ProductService();
