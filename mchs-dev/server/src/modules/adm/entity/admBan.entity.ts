import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_adm_ban", { schema: "doc" })
export class SAdmBan {
  @PrimaryGeneratedColumn({ type: "int", name: "id_ban", unsigned: true })
  idBan: number;

  @Column("tinyint", {
    name: "id_tnpa",
    comment: "Ид.ТНПА, адм.пресечения ",
    unsigned: true,
    default: () => "'1'",
  })
  idTnpa: number;

  @Column("varchar", {
    name: "punct_tnpa",
    nullable: true,
    comment: "пункт ТНПА адм.пресечения",
    length: 150,
  })
  punctTnpa: string | null;

  @Column("varchar", {
    name: "name_tnpa",
    nullable: true,
    comment: "Наименование адм.пресечения в имен.падеже ",
    length: 250,
  })
  nameTnpa: string | null;

  @Column("varchar", {
    name: "name_im",
    nullable: true,
    comment: "Наименование адм.пресечения в имен.падеже ",
    length: 250,
  })
  nameIm: string | null;

  @Column("varchar", {
    name: "name_rod",
    nullable: true,
    comment: "Наименование адм.пресечения в родит.падеже ",
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
    comment: "0-Госнадзор, 1-пожарники,2-всем",
    unsigned: true,
    default: () => "'1'",
  })
  org: number;

  @Column("date", {
    name: "date_begin",
    nullable: true,
    comment: "Дата приостановления(запрещения)",
  })
  dateBegin: Date | null;

  @Column("date", {
    name: "date_end",
    nullable: true,
    comment: "Дата окончания действия записи",
  })
  dateEnd: Date | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
    default: () => "'now()'",
  })
  dateRecord: Date | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-неактивно, 1-активно,2-удалено",
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

  @Column("varchar", { name: "id_", nullable: true, length: 255 })
  id: string | null;
}
