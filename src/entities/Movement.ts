import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User, Product, MovementType } from "./index";

@Entity("movements")
export class Movement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ type: "float" })
  price: number;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: "name" })
  seller: User;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_description", referencedColumnName: "product" })
  product: Product;

  @ManyToOne(() => MovementType)
  @JoinColumn({ name: "typeId" })
  type: MovementType;
}
