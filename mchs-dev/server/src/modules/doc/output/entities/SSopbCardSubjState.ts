import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SSopbCardSubj } from "./SSopbCardSubj";
import { SState } from "./SState";

@Index("FK_s_sopb_card_subj_state_id_data", ["idData"], {})
@Index("FK_s_sopb_card_subj_state_id_state", ["idState"], {})
@Index("FK_s_sopb_card_subj_state_uid", ["uid"], {})
@Entity("s_sopb_card_subj_state", { schema: "doc" })
export class SSopbCardSubjState {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_data_state",
    unsigned: true,
  })
  idDataState: number;

  @Column("bigint", { name: "id_data", nullable: true, unsigned: true })
  idData: string | null;

  @Column("int", { name: "id_state", nullable: true, unsigned: true })
  idState: number | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment:
      "Наименование продукции, указанное в документе об оценке соответствия",
    length: 250,
  })
  name: string | null;

  @Column("varchar", {
    name: "brend",
    nullable: true,
    comment: "Марка СОПБиП",
    length: 85,
  })
  brend: string | null;

  @Column("varchar", {
    name: "model",
    nullable: true,
    comment: "Модель СОПБиП",
    length: 85,
  })
  model: string | null;

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

  @ManyToOne(
    () => SSopbCardSubj,
    (sSopbCardSubj) => sSopbCardSubj.sSopbCardSubjStates,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_data", referencedColumnName: "idData" }])
  idData2: SSopbCardSubj;

  @ManyToOne(() => SState, (sState) => sState.sSopbCardSubjStates, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_state", referencedColumnName: "idState" }])
  idState2: SState;
}
