import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./index";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  product: string;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: "name" })
  producer: User;
}
