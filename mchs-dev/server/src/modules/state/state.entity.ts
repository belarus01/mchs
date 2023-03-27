import { SSopbCardSubjState } from "src/sopb/entity/sopbCardSubjState.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("s_state", { schema: "doc" })
export class SState {
  @PrimaryGeneratedColumn({ type: "int", name: "id_state", unsigned: true })
  idState: number;

  @Column("varchar", {
    name: "state",
    nullable: true,
    comment: "Наименование справочника",
    length: 250,
  })
  state: string | null;

  @Column("varchar", {
    name: "capital",
    nullable: true,
    comment: "Наименование справочника",
    length: 250,
  })
  capital: string | null;

  @Column("varchar", {
    name: "world_part",
    nullable: true,
    comment: "Наименование справочника",
    length: 250,
  })
  worldPart: string | null;

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

  @OneToMany(
    () => SSopbCardSubjState,
    (sSopbCardSubjState) => sSopbCardSubjState.idState2
  )
  sSopbCardSubjStates: SSopbCardSubjState[];
}
