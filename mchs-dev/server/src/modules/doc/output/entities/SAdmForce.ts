import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_adm_force", { schema: "doc" })
export class SAdmForce {
  @PrimaryGeneratedColumn({ type: "int", name: "id_force", unsigned: true })
  idForce: number;

  @Column("int", { name: "id_parent", nullable: true, unsigned: true })
  idParent: number | null;

  @Column("tinyint", {
    name: "id_tnpa",
    comment: "Ид.ТНПА, адм.принуждени ",
    unsigned: true,
    default: () => "'1'",
  })
  idTnpa: number;

  @Column("varchar", {
    name: "punct_tnpa",
    nullable: true,
    comment: "пункт ТНПА адм.принуждения",
    length: 150,
  })
  punctTnpa: string | null;

  @Column("varchar", {
    name: "name_tnpa",
    nullable: true,
    comment: "Наименование адм.принуждени в имен.падеже ",
    length: 250,
  })
  nameTnpa: string | null;

  @Column("varchar", {
    name: "name_im",
    nullable: true,
    comment: "Наименование адм.принуждени в имен.падеже ",
    length: 250,
  })
  nameIm: string | null;

  @Column("varchar", {
    name: "name_rod",
    nullable: true,
    comment: "Наименование адм.принуждени в родит.падеже ",
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
    comment: "0-Госнадзор, 1-пожарники",
    unsigned: true,
    default: () => "'0'",
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
}
