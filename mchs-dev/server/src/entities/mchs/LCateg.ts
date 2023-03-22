import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LTypeByCateg } from "./LTypeByCateg";

@Entity("l_categ", { schema: "mchs" })
export class LCateg {
  @PrimaryGeneratedColumn({ type: "int", name: "id_l_categ", unsigned: true })
  idLCateg: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "Наименование типа протоколирования",
    length: 255,
  })
  name: string | null;

  @Column("datetime", {
    name: "date_start",
    nullable: true,
    comment: "Дата создания",
  })
  dateStart: Date | null;

  @Column("datetime", {
    name: "date_stop",
    nullable: true,
    comment: "Дата окончания",
  })
  dateStop: Date | null;

  @Column("char", {
    name: "status_record",
    nullable: true,
    comment:
      "Текущее состояние записи (U-удалена, N-новая, null-действительная)",
    length: 255,
  })
  statusRecord: string | null;

  @Column("varchar", {
    name: "description",
    nullable: true,
    comment: "Опиcание ",
    length: 255,
  })
  description: string | null;

  @Column("int", {
    name: "show_type",
    nullable: true,
    comment:
      "1-системный журнал,2_журнал админа,3-журнал оператора,4-системный and админа,5-системный anl оператора",
    default: () => "'1'",
  })
  showType: number | null;

  @Column("varchar", { name: "check_period", nullable: true, length: 255 })
  checkPeriod: string | null;

  @OneToMany(() => LTypeByCateg, (lTypeByCateg) => lTypeByCateg.idLCateg2)
  lTypeByCategs: LTypeByCateg[];
}
