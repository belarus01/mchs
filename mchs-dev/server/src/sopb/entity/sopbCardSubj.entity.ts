import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { SSopbCardSubjState } from "./sopbCardSubjState.entity";
import { SSopbCard } from "./sopbCard.entity";
  
  @Index("FK_s_sopb_card_subj_id_card", ["idCard"], {})
  @Index("FK_s_sopb_card_subj_uid", ["uid"], {})
  @Index("FK_s_sopb_card_subj_id_subj2", ["idSubj"], {})
  @Entity("s_sopb_card_subj", { schema: "doc" })
  export class SSopbCardSubj {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id_data", unsigned: true })
    idData: number;
  
    @Column("bigint", { name: "id_subj", unsigned: true })
    idSubj: number;
  
    @Column("int", { name: "id_card", unsigned: true })
    idCard: number;
  
    @Column("int", {
      name: "id_build_data",
      comment: "id чек-листа2 (1.10,1.11) для этого списка",
      unsigned: true,
    })
    idBuildData: number;
  
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
  
    @OneToMany(
      () => SSopbCardSubjState,
      (sSopbCardSubjState) => sSopbCardSubjState.idData2
    )
    sSopbCardSubjStates: SSopbCardSubjState[];
  }
  