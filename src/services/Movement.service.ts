import { Request } from "express";
import { movementRepository } from "../repositories";
import { Movement } from "../entities";
import { movementShape } from "../shapes";

class MovementService {
  movementCreator = async (req: Request): Promise<any> => {
    const body = req.body;
    const date = new Date(body.date);

    const movement: Movement = await movementRepository.save({
      ...body,
      date: date,
    });

    return movement;
  };

  movementsLoader = async (req: Request) => {
    const movements: Movement[] = await movementRepository.all();

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

export default new MovementService();
