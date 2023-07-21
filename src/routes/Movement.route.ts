import { Router } from "express";
import { movementController } from "../controllers";

const movementRouter = Router();

movementRouter.post(
  "/coodesh-api/movements/register",
  movementController.movementCreator
);

movementRouter.get(
  "/coodesh-api/movements",
  movementController.movementsLoader
);

movementRouter.get(
  "/coodesh-api/movements/:id",
  movementController.movementLoader
);

export default movementRouter;
