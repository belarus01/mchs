import { SSubjObj } from "src/modules/object/entity/object.entity";
import { SSubj } from "src/modules/subject/entity/subject.entity";
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
  @Index("FK_s_fire_card_cut_id_subj", ["idSubj"], {})
  @Index("FK_s_fire_card_cut_id_subj_obj", ["idSubjObj"], {})
  @Entity("s_fire_card_cut", { schema: "mchs" })
  export class SFireCardCut {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
    idList: number;
  
    @Column("bigint", { name: "id_card", nullable: true, unsigned: true })
    idCard: number | null;
  
    @Column("int", { name: "id_dept", nullable: true, unsigned: true })
    idDept: number | null;
  
    @Column("int", { name: "id_obl", nullable: true, unsigned: true })
    idObl: number | null;
  
    @Column("bigint", { name: "id_subj", nullable: true, unsigned: true })
    idSubj: number | null;
  
    @Column("bigint", { name: "id_subj_obj", nullable: true, unsigned: true })
    idSubjObj: number | null;
  
    @Column("int", {
      name: "num_reg",
      nullable: true,
      comment: "№ по порядку ",
      unsigned: true,
    })
    numReg: number | null;
  
    @Column("date", {
      name: "date_decision",
      nullable: true,
      comment: "Дата  вынесения",
    })
    dateDecision: Date | null;
  
    @Column("bigint", {
      name: "id_obj",
      nullable: true,
      comment: "Что приостановлено (запрещено)",
      unsigned: true,
    })
    idObj: number | null;
  
    @Column("varchar", {
      name: "num_case",
      nullable: true,
      comment: "№  дела",
      length: 4100,
    })
    numCase: string | null;
  
    @Column("date", {
      name: "date_ban",
      nullable: true,
      comment: "Дата приостановления (запрещения)",
      default: () => "'now()'",
    })
    dateBan: Date | null;
  
    @Column("varchar", {
      name: "decision",
      nullable: true,
      comment: "Принятое решение (вид, дата)",
      length: 4100,
    })
    decision: string | null;
  
    @Column("varchar", {
      name: "info",
      nullable: true,
      comment: "доп.инфо",
      length: 255,
    })
    info: string | null;
  
    @Column("tinyint", {
      name: "active",
      comment: "0-удалено, 1-актино",
      unsigned: true,
      default: () => "'1'",
    })
    active: number;
  
    @Column("int", {
      name: "uid",
      nullable: true,
      comment: "Пользователь, внесший изменения",
      unsigned: true,
    })
    uid: number | null;
  
    @ManyToOne(() => SSubj, (sSubj) => sSubj.sFireCardCuts, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "id_subj", referencedColumnName: "idSubj" }])
    idSubj2: SSubj;
  
    @ManyToOne(() => SSubjObj, (sSubjObj) => sSubjObj.sFireCardCuts, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "id_subj_obj", referencedColumnName: "idObj" }])
    idSubjObj2: SSubjObj;
  }
  