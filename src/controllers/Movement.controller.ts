import { Request, Response } from "express";
import { movementService } from "../services";

class MovementController {
  movementCreator = async (req: Request, res: Response) => {
    const movement = await movementService.movementCreator(req);
    return res.status(201).json(movement);
  };

  movementsLoader = async (req: Request, res: Response) => {
    const { status, movements } = await movementService.movementsLoader(req);
    return res.status(status).json(movements);
  };

  movementLoader = async (req: Request, res: Response) => {
    const { status, movement } = await movementService.movementLoader(req);
    return res.status(status).json(movement);
  };
}

export default new MovementController();
