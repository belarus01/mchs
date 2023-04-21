import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SSopbCard } from "./sopbCard.entity";
import { SSubjObj } from "src/modules/object/entity/object.entity";
import { SSubj } from "src/modules/subject/entity/subject.entity";
import { User } from "src/modules/users/user.entity";
import { SSopbCardSubjState } from "./sopbCardSubjState.entity";

@Index("FK_s_sopb_card_subj_id_card", ["idCard"], {})
@Index("FK_s_sopb_card_subj_id_obj", ["idObj"], {})
@Index("FK_s_sopb_card_subj_id_subj2", ["idSubj"], {})
@Index("FK_s_sopb_card_subj_uid", ["uid"], {})
@Entity("s_sopb_card_subj", { schema: "mchs" })
export class SSopbCardSubj {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_data", unsigned: true })
  idData: number;

  @Column("bigint", { name: "id_subj", unsigned: true })
  idSubj: number;

  @Column("bigint", {
    name: "id_obj",
    nullable: true,
    comment: "объект,которому принадлежат лопаты",
    unsigned: true,
  })
  idObj: number | null;

  @Column("int", { name: "id_card", unsigned: true })
  idCard: number;

  @Column("int", {
    name: "id_build_data",
    nullable: true,
    comment: "id чек-листа2 (1.10,1.11) для этого списка",
    unsigned: true,
  })
  idBuildData: number | null;

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

  @Column("tinyint", {
    name: "fl_mnf_exp",
    comment: "1-производитель(1.10),0 - импортер(1.11)",
    unsigned: true,
    default: () => "'1'",
  })
  flMnfExp: number;

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

  @ManyToOne(() => SSopbCard, (sSopbCard) => sSopbCard.sSopbCardSubjs, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_card", referencedColumnName: "idCard" }])
  idCard2: SSopbCard;

  @ManyToOne(() => SSubjObj, (sSubjObj) => sSubjObj.sSopbCardSubjs, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_obj", referencedColumnName: "idObj" }])
  idObj2: SSubjObj;

  @ManyToOne(() => SSubj, (sSubj) => sSubj.sSopbCardSubjs, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_subj", referencedColumnName: "idSubj" }])
  idSubj2: SSubj;

  @ManyToOne(() => User, (users) => users.sSopbCardSubjs, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "uid", referencedColumnName: "uid" }])
  u: User;

  @OneToMany(
    () => SSopbCardSubjState,
    (sSopbCardSubjState) => sSopbCardSubjState.idData2
  )
  sSopbCardSubjStates: SSopbCardSubjState[];
}
