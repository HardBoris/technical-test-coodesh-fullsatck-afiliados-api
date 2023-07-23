import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movement } from "../entities";

interface IMovementRepo {
  save: (movement: Partial<Movement>) => Promise<Movement>;
  all: () => Promise<Movement[]>;
  allByUser: (payload: object) => Promise<Movement[]>;
  allByProduct: (payload: object) => Promise<Movement[]>;
  findOne: (payload: object) => Promise<Movement>;
  delete: (id: string) => Promise<DeleteResult>;
}

class MovementRepo implements IMovementRepo {
  private ormRepo: Repository<Movement>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Movement);
  }

  save = async (movement: Partial<Movement>) =>
    await this.ormRepo.save(movement);
  all = async () =>
    await this.ormRepo.find({
      relations: { seller: true, product: true, type: true },
    });
  allByUser = async (payload: object) =>
    await this.ormRepo.find({
      where: { ...payload },
      relations: { product: true, type: true },
    });
  allByProduct = async (payload: object) =>
    await this.ormRepo.find({
      where: { ...payload },
      relations: { seller: true, type: true },
    });
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
  delete = async (id: string) => {
    return await this.ormRepo.delete(id);
  };
}

export default new MovementRepo();
