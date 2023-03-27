import { SDept } from "src/modules/department/entity/department.entity";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Index("name_obl", ["nameObl"], {})
@Entity("s_ate_obl", { schema: "mchs" })
export class SAteObl {
  @PrimaryGeneratedColumn({ type: "int", name: "id_obl" })
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
  dateRecord: Date | null;

  @OneToMany(() => SDept, (sDept) => sDept.idObl2)
  sDepts: SDept[];
}
