import { SEvents } from "src/modules/events/entity/events.entity";
import { STnpaList } from "src/tnpa/entity/tnpaList.entity";
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
  @Index("FK_s_question_id_event", ["idEvent"], {})
  @Index("FK_s_question_id_tnpa", ["idTnpa"], {})
  @Entity("s_question1", { schema: "mchs" })
  export class SQuestion1 {
    @PrimaryGeneratedColumn({ type: "int", name: "id_que", unsigned: true })
    idQue: number;
  
    @Column("int", {
      name: "id_tnpa",
      comment: "Ид.ТНПА, по пункту которого изложен вопрос ",
      unsigned: true,
      default: () => "'1'",
    })
    idTnpa: number;
  
    @Column("bigint", {
      name: "id_event",
      nullable: true,
      comment: "Перечень вопросов проверки (мониторинга)",
      unsigned: true,
    })
    idEvent: number | null;
  
    @Column("varchar", {
      name: "name_tnpa",
      nullable: true,
      comment: "Наименование документа ТНПА-источника возникновения вопроса",
      length: 550,
    })
    nameTnpa: string | null;
  
    @Column("varchar", {
      name: "punct_tnpa",
      nullable: true,
      comment: "пункт ТНПА вопроса",
      length: 150,
    })
    punctTnpa: string | null;
  
    @Column("varchar", {
      name: "name_im",
      nullable: true,
      comment: "Наименование вопроса в имен.падеже ",
      length: 250,
    })
    nameIm: string | null;
  
    @Column("varchar", {
      name: "name_rod",
      nullable: true,
      comment: "Наименование вопроса в родит.падеже ",
      length: 250,
    })
    nameRod: string | null;
  
    @Column("tinyint", {
      name: "type_def",
      comment: "вес вопроса:0-не важный,1-серъезный,2-капец ",
      unsigned: true,
      default: () => "'1'",
    })
    typeDef: number;
  
    @Column("tinyint", {
      name: "org",
      comment: "0-Госнадзор, 1-пожарники,2-ГУБОП",
      unsigned: true,
      default: () => "'1'",
    })
    org: number;
  
    @Column("date", {
      name: "date_record",
      nullable: true,
      comment: "Дата изменения записи",
    })
    dateRecord: Date | null;
  
    @Column("date", {
      name: "date_begin",
      nullable: true,
      comment: "Дата начала действия записи",
    })
    dateBegin: Date | null;
  
    @Column("date", {
      name: "date_end",
      nullable: true,
      comment: "Дата окончания действия записи",
    })
    dateEnd: Date | null;
  
    @Column("tinyint", {
      name: "active",
      comment: "0-удалено, 1-активно",
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
  
    @ManyToOne(() => SEvents, (sEvents) => sEvents.sQuestions, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "id_event", referencedColumnName: "idEvent" }])
    idEvent2: SEvents;
  
    @ManyToOne(() => STnpaList, (sTnpaList) => sTnpaList.sQuestions, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "id_tnpa", referencedColumnName: "idList" }])
    idTnpa2: STnpaList;
  }
  