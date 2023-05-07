import { SSubj } from "src/modules/subject/entity/subject.entity";
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { SSubjObj } from "./object.entity";
import { SUnits } from "src/modules/unit/unit.entity";
  
  @Index("FK_s_subj_obj_ch_id_subj", ["idSubj"], {})
  @Index("FK_s_subj_obj_ch_id_subj_obj", ["idSubjObj"], {})
  @Index("FK_s_subj_obj_ch_id_unit_8_9", ["idUnit_8_9"], {})
  @Entity("s_subj_obj_ch", { schema: "mchs" })
  export class SSubjObjCh {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
    idList: number;
  
    @Column("bigint", { name: "id_subj", unsigned: true })
    idSubj: number;
  
    @Column("bigint", { name: "id_subj_obj", nullable: true, unsigned: true })
    idSubjObj: number | null;
  
    @Column("bigint", {
      name: "id_unit_8_9",
      comment: "Усл.обозн.ОПО(type_unit=8) или вида тр-а(9) субъекта",
      unsigned: true,
      default: () => "'1'",
    })
    idUnit_8_9: number;
  
    @Column("int", {
      name: "type_unit",
      comment: "значение type_unit (тип мелкого ссправочника) из s_units",
      default: () => "'8'",
    })
    typeUnit: number;
  
    @Column("date", {
      name: "date_record",
      nullable: true,
      comment: "Дата изменения",
    })
    dateRecord: Date | null;
  
    @Column("tinyint", {
      name: "active",
      comment: "0-удалена,1-действует",
      unsigned: true,
      default: () => "'1'",
    })
    active: number;
  
    @Column("int", {
      name: "uid",
      nullable: true,
      comment: "Ид.пользователя,изменившего запись",
      unsigned: true,
    })
    uid: number | null;
  
    @Column("tinyint", {
      name: "org",
      nullable: true,
      comment: "0-госпромнадзор,1-пожарники",
      unsigned: true,
      default: () => "'0'",
    })
    org: number | null;
  
    @ManyToOne(() => SSubj, (sSubj) => sSubj.sSubjObjChes, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "id_subj", referencedColumnName: "idSubj" }])
    idSubj2: SSubj;
  
    @ManyToOne(() => SSubjObj, (sSubjObj) => sSubjObj.sSubjObjChes, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "id_subj_obj", referencedColumnName: "idObj" }])
    idSubjObj2: SSubjObj;
  
    @ManyToOne(() => SUnits, (sUnits) => sUnits.sSubjObjChes, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "id_unit_8_9", referencedColumnName: "idUnit" }])
    idUnit_8: SUnits;
  }
  