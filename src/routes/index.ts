import { Express } from "express";
import userRouter from "./User.route";
import productRouter from "./Product.route";
import movementRouter from "./Movement.route";

const registerRouters = (app: Express): void => {
  app.use(userRouter);
  app.use(productRouter);
  app.use(movementRouter);
};

export default registerRouters;
