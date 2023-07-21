import { Router } from "express";
import { productController } from "../controllers";

const productRouter = Router();

productRouter.post(
  "/coodesh-api/products/register",
  productController.productCreator
);

productRouter.get("/coodesh-api/products", productController.productsLoader);

productRouter.get("/coodesh-api/products/:id", productController.productLoader);

export default productRouter;
