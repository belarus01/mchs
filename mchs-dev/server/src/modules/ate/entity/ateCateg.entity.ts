import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("name_categ", ["nameCateg"], {})
@Entity("s_ate_categ", { schema: "mchs" })
export class SAteCateg {
  @PrimaryGeneratedColumn({ type: "int", name: "id_categ", unsigned: true })
  idCateg: number;

  @Column("varchar", {
    name: "name_categ",
    nullable: true,
    comment: " наименование тер.единицы",
    length: 250,
  })
  nameCateg: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалена,1-действует",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("tinyint", {
    name: "left_right",
    nullable: true,
    comment: "2-справа,1-слева",
    unsigned: true,
  })
  leftRight: number | null;

  @Column("varchar", {
    name: "name_short",
    nullable: true,
    comment: "Краткое наименование",
    length: 10,
  })
  nameShort: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата обновления",
  })
  dateRecord: Date | null;
}
