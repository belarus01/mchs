import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_sopb_card1", { schema: "doc" })
export class SSopbCard1 {
  @PrimaryGeneratedColumn({ type: "int", name: "id_card", unsigned: true })
  idCard: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "Наименование СОПБиП",
    length: 250,
  })
  name: string | null;

  @Column("datetime", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateRecord: Date | null;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Ид.пользователя, внесшего изменения",
    unsigned: true,
  })
  uid: number | null;

  @Column("tinyint", {
    name: "active",
    comment: "1-активная запись,0 - удалено",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;
}
