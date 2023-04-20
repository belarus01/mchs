import { Column, Entity, Index, OneToMany } from "typeorm";
import { SDept } from "./SDept";

@Index("name_obl", ["nameObl"], {})
@Entity("s_ate_obl", { schema: "mchs" })
export class SAteObl {
  @Column("int", { primary: true, name: "id_obl" })
  idObl: number;

  @Column("varchar", {
    name: "name_obl",
    nullable: true,
    comment: " наименование тер.единицы",
    length: 25,
  })
  nameObl: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалена,1-действует",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата обновления",
  })
  dateRecord: string | null;

  @OneToMany(() => SDept, (sDept) => sDept.idObl2)
  sDepts: SDept[];
}
