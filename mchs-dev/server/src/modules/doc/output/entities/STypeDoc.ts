import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SForm } from "./SForm";

@Entity("s_type_doc", { schema: "doc" })
export class STypeDoc {
  @PrimaryGeneratedColumn({ type: "int", name: "id_type_doc", unsigned: true })
  idTypeDoc: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "Тип документа ",
    length: 250,
  })
  name: string | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-Госнадзор, 1-пожарники",
    unsigned: true,
    default: () => "'1'",
  })
  org: number;

  @Column("int", {
    name: "id_struct",
    nullable: true,
    comment: "ссылка на шаблон документа",
    unsigned: true,
  })
  idStruct: number | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
  })
  dateRecord: string | null;

  @Column("date", {
    name: "date_begin",
    nullable: true,
    comment: "Дата начала действия записи",
  })
  dateBegin: string | null;

  @Column("date", {
    name: "date_end",
    nullable: true,
    comment: "Дата окончания действия записи",
  })
  dateEnd: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалено, 1-активно",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, изменивший запись",
    unsigned: true,
  })
  uid: number | null;

  @OneToMany(() => SForm, (sForm) => sForm.idTypeDoc2)
  sForms: SForm[];
}
