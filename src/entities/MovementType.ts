import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Kind {
  INCOMING = "entrada",
  EGRESS = "saída",
}

@Entity("movement_types")
export class MovementType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ type: "enum", enum: Kind })
  kind: string;
}
