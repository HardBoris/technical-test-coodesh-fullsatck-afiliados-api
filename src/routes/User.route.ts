import { Router } from "express";
import { userController } from "../controllers";
import { tokenValidator, verifyUserExists } from "../middlewares";

const userRouter = Router();

userRouter.post(
  "/coodesh-api/users/register",
  tokenValidator,
  verifyUserExists,
  userController.userCreator
);

userRouter.post("/coodesh-api/login", userController.userLoger);

userRouter.get(
  "/coodesh-api/users",
  tokenValidator,
  userController.usersLoader
);

userRouter.get(
  "/coodesh-api/users/:name",
  tokenValidator,
  userController.userLoader
);

export default userRouter;
