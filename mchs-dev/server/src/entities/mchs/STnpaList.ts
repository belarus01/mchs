import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { STnpaDoc } from "./STnpaDoc";

@Entity("s_tnpa_list", { schema: "mchs" })
export class STnpaList {
  @PrimaryGeneratedColumn({ type: "int", name: "id_list", unsigned: true })
  idList: number;

  @Column("varchar", {
    name: "name",
    comment: "Наименование",
    length: 550,
    default: () => "'1'",
  })
  name: string;

  @Column("varchar", {
    name: "addr",
    nullable: true,
    comment: "URI документа",
    length: 125,
  })
  addr: string | null;

  @Column("varchar", {
    name: "num_doc",
    nullable: true,
    comment: "номер документа",
    length: 25,
  })
  numDoc: string | null;

  @Column("date", {
    name: "date_doc",
    nullable: true,
    comment: "Дата документа",
  })
  dateDoc: string | null;

  @Column("varchar", {
    name: "path_doc",
    nullable: true,
    comment: "Место нахождения документа",
    length: 555,
  })
  pathDoc: string | null;

  @Column("date", {
    name: "date_begin",
    nullable: true,
    comment: "Дата начала действия",
  })
  dateBegin: string | null;

  @Column("date", {
    name: "date_end",
    nullable: true,
    comment: "Дата окончания действия",
  })
  dateEnd: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения",
    default: () => "'now()'",
  })
  dateRecord: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалена,1-действует",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("tinyint", {
    name: "org",
    comment: "1-пожарники,0-надзорники,2-общий",
    unsigned: true,
    default: () => "'1'",
  })
  org: number;

  @Column("tinyint", {
    name: "type_doc",
    nullable: true,
    comment:
      "1-Закон,2-Декрет 3-Постановление 4-Общие требования, 5-Договор,6-Порядок,7-Инструкция 8-Правила,9-Положение,10-Перечень,11-ТР,12-ТКП,13-СН",
    unsigned: true,
    default: () => "'1'",
  })
  typeDoc: number | null;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Ид.пользователя,изменившего запись",
    unsigned: true,
  })
  uid: number | null;

  @OneToMany(() => STnpaDoc, (sTnpaDoc) => sTnpaDoc.idList2)
  sTnpaDocs: STnpaDoc[];
}
