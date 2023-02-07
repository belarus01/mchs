import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("build_blocks", { schema: "doc" })
export class BuildBlocks {
  @PrimaryGeneratedColumn({ type: "int", name: "id_block", unsigned: true })
  idBlock: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "Наименование блока",
    length: 50,
  })
  name: string | null;

  @Column("varchar", { name: "id_form", nullable: true, length: 255 })
  idForm: string | null;

  @Column("int", {
    name: "num_order",
    nullable: true,
    comment: "порядковый номер отрисовки",
    unsigned: true,
  })
  numOrder: number | null;

  @Column("tinyint", {
    name: "active",
    nullable: true,
    comment: "0-неактивно,1-активно",
    unsigned: true,
  })
  active: number | null;
}
