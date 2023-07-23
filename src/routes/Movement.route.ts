import { Router } from "express";
import { movementController } from "../controllers";
import { tokenValidator } from "../middlewares";

const movementRouter = Router();

movementRouter.post(
  "/coodesh-api/movements/register",
  tokenValidator,
  movementController.movementCreator
);

movementRouter.get(
  "/coodesh-api/movements",
  tokenValidator,
  movementController.movementsLoader
);

movementRouter.get(
  "/coodesh-api/movements/users/:user",
  tokenValidator,
  movementController.movementsByUser
);

movementRouter.get(
  "/coodesh-api/movements/products/:product",
  tokenValidator,
  movementController.movementsByProduct
);

export default movementRouter;
