import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("upu_server_type", { schema: "mchs" })
export class UpuServerType {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_upu_server_type",
    unsigned: true,
  })
  idUpuServerType: number;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;
}
