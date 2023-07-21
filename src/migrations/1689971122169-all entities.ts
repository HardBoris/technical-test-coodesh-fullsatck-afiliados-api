import { MigrationInterface, QueryRunner } from "typeorm";
import { hashSync } from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

export class AllEntities1689971122169 implements MigrationInterface {
  name = "AllEntities1689971122169";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying, CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "product" character varying NOT NULL, "producerName" character varying, CONSTRAINT "UQ_ebc48c6a0bfb5c908ab996c5f2f" UNIQUE ("product"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "movements" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "price" double precision NOT NULL, "sellerName" character varying, "product_description" character varying, "typeId" integer, CONSTRAINT "PK_5a8e3da15ab8f2ce353e7f58f67" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "movement_types" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "kind" character varying NOT NULL, CONSTRAINT "PK_157378727fd686272582297d37f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_13bbdd8e0adff769ee6f784011f" FOREIGN KEY ("producerName") REFERENCES "users"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "movements" ADD CONSTRAINT "FK_26f76478fe9874d1f9bfce7bd06" FOREIGN KEY ("sellerName") REFERENCES "users"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "movements" ADD CONSTRAINT "FK_fbdc012d6b7bf060875af74d99e" FOREIGN KEY ("product_description") REFERENCES "products"("product") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "movements" ADD CONSTRAINT "FK_317d037038177710db71019c4d6" FOREIGN KEY ("typeId") REFERENCES "movement_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `INSERT INTO "users" ("name", "password") VALUES ('${
        process.env.ADMIN_NAME
      }', '${hashSync(process.env.ADMIN_PASSWORD, 10)}')`
    );
    await queryRunner.query(
      `INSERT INTO "movement_types" ("type", "kind") VALUES ('Venda produtor', 'Entrada'),('Venda afiliado', 'Entrada'), ('Comissão paga', 'Saída'), ('Comissão recebida', 'Entrada')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movements" DROP CONSTRAINT "FK_317d037038177710db71019c4d6"`
    );
    await queryRunner.query(
      `ALTER TABLE "movements" DROP CONSTRAINT "FK_fbdc012d6b7bf060875af74d99e"`
    );
    await queryRunner.query(
      `ALTER TABLE "movements" DROP CONSTRAINT "FK_26f76478fe9874d1f9bfce7bd06"`
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_13bbdd8e0adff769ee6f784011f"`
    );
    await queryRunner.query(`DROP TABLE "movement_types"`);
    await queryRunner.query(`DROP TABLE "movements"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
