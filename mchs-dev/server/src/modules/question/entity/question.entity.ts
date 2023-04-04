import { SUnits } from "src/modules/unit/unit.entity";
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";

  
  @Index("FK_s_question_id_unit_40", ["idUnit_40"], {})
  @Entity("s_question", { schema: "doc" })
  export class SQuestion {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id_que", unsigned: true })
    idQue: number;
  
    @Column("int", {
      name: "num_reg",
      nullable: true,
      comment: "Порядковый номер вопроса",
      unsigned: true,
    })
    numReg: number | null;
  
    @Column("varchar", {
      name: "name_que",
      nullable: true,
      comment: "Содержание вопроса",
      length: 855,
    })
    nameQue: string | null;
  
    @Column("tinyint", {
      name: "org",
      nullable: true,
      comment: "0-Госнадзор, 1-пожарники,2-другие",
      unsigned: true,
      default: () => "'1'",
    })
    org: number | null;
  
    @Column("bigint", {
      name: "id_unit_40",
      nullable: true,
      comment: "Тип вопроса (doc.s_units.type_unit=40 , брать из name)",
      unsigned: true,
    })
    idUnit_40: number | null;
  
    @Column("tinyint", {
      name: "type_def",
      nullable: true,
      comment: "0-вопроса МТХ,1-вопроса ЧЛ",
      unsigned: true,
      default: () => "'0'",
    })
    typeDef: number | null;
  
    @Column("date", {
      name: "date_record",
      nullable: true,
      comment: "Дата изменения записи",
      default: () => "'now()'",
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
  
    @ManyToOne(() => SUnits, (sUnits) => sUnits.sQuestions, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "id_unit_40", referencedColumnName: "idUnit" }])
    idUnit: SUnits;
  }
  