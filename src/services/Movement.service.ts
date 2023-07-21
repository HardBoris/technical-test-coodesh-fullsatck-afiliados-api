import { Request } from "express";
import { movementRepository } from "../repositories";
import { Movement } from "../entities";

class MovementService {
  movementCreator = async (req: Request): Promise<any> => {
    const body = req.body;
    const movement: Movement = await movementRepository.save(body);

    return movement;
  };

  movementsLoader = async (req: Request) => {
    const movements: Movement[] = await movementRepository.all();

    return {
      status: 200,
      movements: movements,
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
}

export default new MovementService();
