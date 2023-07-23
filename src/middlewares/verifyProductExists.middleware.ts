import { NextFunction, Request, Response } from "express";
import { Product } from "../entities";
import { ErrorHandler } from "../errors";
import { productRepository } from "../repositories";

const verifyProductExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { product } = req.body;
  const foundProduct: Product = await productRepository.findOne({
    product: product,
  });

  if (foundProduct) {
    throw new ErrorHandler(409, "Product already exists.");
  }

  return next();
};

export default verifyProductExists;
