import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("movement_types")
export class MovementType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  kind: string;
}
