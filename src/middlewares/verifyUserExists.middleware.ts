import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { ErrorHandler } from "../errors";
import { userRepository } from "../repositories";

const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const foundUser: User = await userRepository.findOne({
    name: name,
  });

  if (foundUser) {
    throw new ErrorHandler(409, "User already exists.");
  }

  return next();
};

export default verifyUserExists;
