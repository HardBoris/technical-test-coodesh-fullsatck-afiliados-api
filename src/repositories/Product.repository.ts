import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entities";

interface IProductRepo {
  save: (product: Partial<Product>) => Promise<Product>;
  all: () => Promise<Product[]>;
  findOne: (payload: object) => Promise<Product>;
  delete: (id: string) => Promise<DeleteResult>;
}

class ProductRepo implements IProductRepo {
  private ormRepo: Repository<Product>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Product);
  }

  save = async (product: Partial<Product>) => await this.ormRepo.save(product);
  all = async () => await this.ormRepo.find();
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
  delete = async (id: string) => {
    return await this.ormRepo.delete(id);
  };
}

export default new ProductRepo();
