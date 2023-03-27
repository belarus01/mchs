import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SSopbCard } from "./sopbCard.entity";


@Entity("s_sopb", { schema: "doc" })
export class SSopb {
  @PrimaryGeneratedColumn({ type: "int", name: "id_sopb", unsigned: true })
  idSopb: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "Наименование СОПБиП",
    length: 250,
  })
  name: string | null;

  @Column("varchar", {
    name: "conditions",
    nullable: true,
    comment:
      "Оценка соответствия средств обеспечения пожарной безопасности и пожаротушения проводится в форме сертификации (схемы 1с, 3с и 4с) или декларирования соответствия (схемы Зд, 4д и 6д).",
    length: 250,
  })
  conditions: string | null;

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

  @OneToMany(() => SSopbCard, (sSopbCard) => sSopbCard.idSopb2)
  sSopbCards: SSopbCard[];
}
