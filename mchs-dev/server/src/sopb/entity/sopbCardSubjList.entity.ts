import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { SSopbCard } from "./sopbCard.entity";
import { SSopbCardSubj } from "./sopbCardSubj.entity";
  
  @Index("FK_s_sopb_card_subj_list_id_card", ["idCard"], {})
  @Index("FK_s_sopb_card_subj_list_id_subj_sopb", ["idSubjSopb"], {})
  @Entity("s_sopb_card_subj_list", { schema: "mchs" })
  export class SSopbCardSubjList {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
    idList: number;
  
    @Column("bigint", {
      name: "id_subj_sopb",
      comment: "Ид.записи в таблице s_sopb_card_subj.id_data",
      unsigned: true,
    })
    idSubjSopb: number;
  
    @Column("int", { name: "id_card", unsigned: true })
    idCard: number;
  
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
      comment: "1-активная запись,0 - удалено",
      unsigned: true,
      default: () => "'1'",
    })
    active: number;
  
    @Column("tinyint", {
      name: "fl_docum_made",
      nullable: true,
      comment:
        "Наличие документов об оценке соответствия требова для изготавл.лопаты",
      unsigned: true,
    })
    flDocumMade: number | null;
  
    @Column("varchar", {
      name: "num_docum_made",
      nullable: true,
      comment:
        "Номер документа об оценке соответствия требова для изготавливаемого СОПБ",
      length: 85,
    })
    numDocumMade: string | null;
  
    @Column("date", {
      name: "date_docum_made",
      nullable: true,
      comment:
        "Номер документа об оценке соответствия требова для изготавливаемого СОПБ",
    })
    dateDocumMade: Date | null;
  
    @Column("tinyint", {
      name: "fl_docum_nalich",
      nullable: true,
      comment:
        "Наличие товаропроизводительных документов, обеспечивающих прослеживание реализуемых СОПБ",
      unsigned: true,
    })
    flDocumNalich: number | null;
  
    @Column("tinyint", {
      name: "fl_docum_sale",
      nullable: true,
      comment:
        "Наличие документов об оценке соответствия требова для реализуемых СОПБ.лопаты",
      unsigned: true,
    })
    flDocumSale: number | null;
  
    @Column("varchar", {
      name: "num_docum_sale",
      nullable: true,
      comment:
        "Номер документа об оценке соответствия требова для реализуемого СОПБ",
      length: 85,
    })
    numDocumSale: string | null;
  
    @Column("date", {
      name: "date_docum_sale",
      nullable: true,
      comment:
        "Номер документа об оценке соответствия требова для реализуемого СОПБ",
    })
    dateDocumSale: Date | null;
  
    @Column("varchar", {
      name: "fio_agent",
      nullable: true,
      comment:
        "ФИО служащего, ответсвтвенного за внесение сведений в контрольный список",
      length: 185,
    })
    fioAgent: string | null;
  
    @Column("varchar", {
      name: "dolj_agent",
      nullable: true,
      comment:
        "Должность служащего, ответсвтвенного за внесение сведений в контрольный список",
      length: 185,
    })
    doljAgent: string | null;
  
    @Column("varchar", {
      name: "tel_agent",
      nullable: true,
      comment:
        "Телефон служащего, ответсвтвенного за внесение сведений в контрольный список",
      length: 185,
    })
    telAgent: string | null;
  
    @ManyToOne(() => SSopbCard, (sSopbCard) => sSopbCard.sSopbCardSubjLists, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "id_card", referencedColumnName: "idCard" }])
    idCard2: SSopbCard;
  
    @ManyToOne(
      () => SSopbCardSubj,
      (sSopbCardSubj) => sSopbCardSubj.sSopbCardSubjLists,
      { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
    )
    @JoinColumn([{ name: "id_subj_sopb", referencedColumnName: "idData" }])
    idSubjSopb2: SSopbCardSubj;
  }
  