import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_defection", { schema: "doc" })
export class SDefection {
  @PrimaryGeneratedColumn({ type: "int", name: "id_def", unsigned: true })
  idDef: number;

  @Column("tinyint", {
    name: "id_tnpa",
    comment: "Ид.ТНПА, пункт которого нарушен ",
    unsigned: true,
    default: () => "'1'",
  })
  idTnpa: number;

  @Column("varchar", {
    name: "punct_tnpa",
    nullable: true,
    comment: "пункт ТНПА нарушения",
    length: 150,
  })
  punctTnpa: string | null;

  @Column("varchar", {
    name: "name_tnpa",
    nullable: true,
    comment: "Наименование нарушения в имен.падеже ",
    length: 250,
  })
  nameTnpa: string | null;

  @Column("varchar", {
    name: "name_im",
    nullable: true,
    comment: "Наименование нарушения в имен.падеже ",
    length: 250,
  })
  nameIm: string | null;

  @Column("varchar", {
    name: "name_rod",
    nullable: true,
    comment: "Наименование нарушения в родит.падеже ",
    length: 250,
  })
  nameRod: string | null;

  @Column("tinyint", {
    name: "type_def",
    comment: "0-мелкое,1-серъезное,2-капец ",
    unsigned: true,
    default: () => "'1'",
  })
  typeDef: number;

  @Column("tinyint", {
    name: "org",
    comment: "0-Госнадзор, 1-пожарники,2-ГУБОП",
    unsigned: true,
    default: () => "'1'",
  })
  org: number;

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
}
