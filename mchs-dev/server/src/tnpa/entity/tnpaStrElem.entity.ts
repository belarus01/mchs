import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { STnpaDoc } from "./tnpaDoc.entity";


@Entity("s_tnpa_str_elem", { schema: "mchs" })
export class STnpaStrElem {
  @PrimaryGeneratedColumn({ type: "int", name: "id_elem", unsigned: true })
  idElem: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "Наименование",
    length: 25,
  })
  name: string | null;

  @Column("varchar", {
    name: "name_short",
    nullable: true,
    comment: "наименование краткое",
    length: 8,
  })
  nameShort: string | null;

  @Column("date", {
    name: "date_begin",
    nullable: true,
    comment: "Дата начала действия",
  })
  dateBegin: Date | null;

  @Column("date", {
    name: "date_end",
    nullable: true,
    comment: "Дата окончания действия",
  })
  dateEnd: Date | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения",
  })
  dateRecord: Date | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалена,1-действует",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Ид.пользователя,изменившего запись",
    unsigned: true,
  })
  uid: number | null;

  @OneToMany(() => STnpaDoc, (sTnpaDoc) => sTnpaDoc.idElem2)
  sTnpaDocs: STnpaDoc[];
}
