import { Router } from "express";
import { productController } from "../controllers";
import { tokenValidator, verifyProductExists } from "../middlewares";

const productRouter = Router();

productRouter.post(
  "/coodesh-api/products/register",
  tokenValidator,
  verifyProductExists,
  productController.productCreator
);

productRouter.get(
  "/coodesh-api/products",
  tokenValidator,
  productController.productsLoader
);

productRouter.get(
  "/coodesh-api/products/:product",
  tokenValidator,
  productController.productLoader
);

export default productRouter;
