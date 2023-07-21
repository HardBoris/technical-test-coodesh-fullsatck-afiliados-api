import { Request, Response } from "express";
import { User } from "../entities";
import { userRepository } from "../repositories";
import { ErrorHandler } from "../errors";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";

interface ILogin {
  status: number;
  message: object;
}

class UserService {
  userCreator = async (req: Request): Promise<any> => {
    const { name, password } = req.body;

    const hashPassword = await hash(password, 10);

    const user: User = await userRepository.save({
      name: name,
      password: hashPassword,
    });

    return { user: user.name };
  };

  userLoger = async (req: Request): Promise<ILogin> => {
    const { name, password } = req.body;
    const user: User = await userRepository.findOne({
      name: name,
    });

    if (!user) {
      throw new ErrorHandler(401, "Invalid credentials!");
    }

    if (!(await user.comparePwd(password))) {
      throw new ErrorHandler(401, "Invalid credentials!");
    }

    const token: string = sign({ ...user }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return {
      status: 200,
      message: { user: user.name, token },
    };
  };

  usersLoader = async (req: Request) => {
    const users: User[] = await userRepository.all();

    return {
      status: 200,
      users: users,
    };
  };

  userLoader = async (req: Request) => {
    const user: User = await userRepository.findOne({
      id: req.params.id,
    });

    if (!user) {
      throw new ErrorHandler(404, "User not found!");
    } else {
      return {
        status: 200,
        user: user,
      };
    }
  };
}

export default new UserService();
