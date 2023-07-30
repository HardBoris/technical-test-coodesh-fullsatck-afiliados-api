import { Request } from "express";
import {
  movementRepository,
  productRepository,
  userRepository,
} from "../repositories";
import { Movement } from "../entities";
import { movementShape } from "../shapes";

class DataService {
  user = async ({ body }: Request) =>
    await userRepository.findOne({ userName: body.seller });
  product = async ({ body }: Request) =>
    await productRepository.findOne({ product: body.product });
  movementCreator = async (req: Request): Promise<any> => {
    const body = req.body;

    const movement: Movement = await movementRepository.save({
      ...body,
      date: new Date(body.date),
    });

    return movement;
  };

  movementsLoader = async (req: Request) => {
    let movements: Movement[] = await movementRepository.all();
    movements = movements.sort((a, b) =>
      a.date < b.date ? -1 : a.date > b.date ? 1 : 0
    );

    return {
      status: 200,
      movements: await movementShape.movement.validate(movements, {
        stripUnknown: true,
      }),
    };
  };

  movementLoader = async (req: Request) => {
    const movement: Movement = await movementRepository.findOne({
      id: req.params.id,
    });
    return {
      status: 200,
      movement: movement,
    };
  };

  movementsByUser = async (req: Request) => {
    const movements: Movement[] = await movementRepository.allByUser({
      seller: { name: req.params.user },
    });

    return {
      status: 200,
      movements: await movementShape.movementByUser.validate(movements, {
        stripUnknown: true,
      }),
    };
  };

  movementsByProduct = async (req: Request) => {
    const movements: Movement[] = await movementRepository.allByProduct({
      product: req.params.product,
    });

    return {
      status: 200,
      movements: await movementShape.movementByProduct.validate(movements, {
        stripUnknown: true,
      }),
    };
  };
}

export default new DataService();
