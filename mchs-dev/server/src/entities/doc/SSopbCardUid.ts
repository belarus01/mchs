import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SSopbCard } from "./SSopbCard";

@Index("FK_s_sopb_card_uid_uid", ["uid"], {})
@Index("FK_s_sopb_card_uid_id_card", ["idCard"], {})
@Entity("s_sopb_card_uid", { schema: "doc" })
export class SSopbCardUid {
  @PrimaryGeneratedColumn({ type: "int", name: "id_change", unsigned: true })
  idChange: number;

  @Column("int", { name: "id_card", nullable: true, unsigned: true })
  idCard: number | null;

  @Column("varchar", {
    name: "was",
    nullable: true,
    comment: "Было html что было",
    length: 1550,
  })
  was: string | null;

  @Column("varchar", {
    name: "become",
    nullable: true,
    comment: "Стало html что стало",
    length: 1550,
  })
  become: string | null;

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
    comment: "1-активная запись,2 - удалено",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @ManyToOne(() => SSopbCard, (sSopbCard) => sSopbCard.sSopbCardUs, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_card", referencedColumnName: "idCard" }])
  idCard2: SSopbCard;
}
