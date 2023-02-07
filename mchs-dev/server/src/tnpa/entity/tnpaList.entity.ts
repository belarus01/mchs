import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  dateDoc: Date | null;

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
      "1-Закон,2-ТКП 3-ТР 4-Общие требования, 5-Договор,6-Порядок,7-Инструкция 8-Правила,9-Положение,10-Перечень,11-Постановление,12-другое",
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
}
