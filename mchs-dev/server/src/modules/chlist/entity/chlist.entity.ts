import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SChlistForm } from "./chlistForm.entity";
//import { SChlistForm } from "./SChlistForm";

@Entity("s_chlist", { schema: "mchs" })
export class SChlist {
  @PrimaryGeneratedColumn({ type: "int", name: "id_chlist", unsigned: true })
  idChlist: number;

  @Column("varchar", {
    name: "name_chlist",
    nullable: true,
    comment: "Наименование справочника",
    length: 250,
  })
  nameChlist: string | null;

  @Column("datetime", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateRecord: Date | null;

  @Column("datetime", {
    name: "date_from",
    nullable: true,
    comment: "Дата начала действия",
  })
  dateFrom: Date | null;

  @Column("datetime", {
    name: "date_to",
    nullable: true,
    comment: "Дата окончания действия",
  })
  dateTo: Date | null;

  @Column("int", {
    name: "num",
    nullable: true,
    comment: "Номер чеклиста",
    unsigned: true,
  })
  num: number | null;

  @Column("int", {
    name: "id_chlist_before",
    nullable: true,
    comment: "Ид.прежнего чеклиста",
    unsigned: true,
  })
  idChlistBefore: number | null;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Ид.пользователя, внесшего изменения",
    unsigned: true,
  })
  uid: number | null;

  @Column("tinyint", {
    name: "org",
    comment: "1-пожарники,0-надзорники",
    unsigned: true,
    default: () => "'1'",
  })
  org: number;

  @Column("tinyint", {
    name: "active",
    comment: "1-активная запись,0 - удалено",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @OneToMany(() => SChlistForm, (sChlistForm) => sChlistForm.idChlist2)
  sChlistForms: SChlistForm[];
} 
