import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();

userRouter.post("/coodesh-api/users/register", userController.userCreator);

userRouter.post("/coodesh-api/login", userController.userLoger);

userRouter.get("/coodesh-api/users", userController.usersLoader);

userRouter.get("/coodesh-api/users/:id", userController.userLoader);

export default userRouter;
