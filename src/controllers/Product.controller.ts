import { Request, Response } from "express";
import { productService } from "../services";

class ProductController {
  productCreator = async (req: Request, res: Response) => {
    const product = await productService.productCreator(req);
    return res.status(201).json(product);
  };

  productsLoader = async (req: Request, res: Response) => {
    const { status, products } = await productService.productsLoader(req);
    return res.status(status).json(products);
  };

  productLoader = async (req: Request, res: Response) => {
    const { status, product } = await productService.productLoader(req);
    return res.status(status).json(product);
  };
}

export default new ProductController();
