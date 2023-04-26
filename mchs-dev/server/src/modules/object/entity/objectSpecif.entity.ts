import { SUnits } from "src/modules/unit/unit.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";


@Index("FK_s_subj_obj_specif_id_unit_17", ["idUnit_17"], {})
@Index("FK_s_subj_obj_specif_id_unit_41", ["idUnit_41"], {})
@Index("FK_s_subj_obj_specif_id_unit_6", ["idUnit_6"], {})
@Entity("s_subj_obj_specif", { schema: "mchs" })
export class SSubjObjSpecif {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_specif", unsigned: true })
  idSpecif: number;

  @Column("bigint", { name: "id_subj_obj", unsigned: true })
  idSubjObj: number;

  @Column("varchar", {
    name: "name_build",
    nullable: true,
    comment: "Наимен.сооружения",
    length: 255,
  })
  nameBuild: string | null;

  @Column("bigint", {
    name: "id_unit_6",
    nullable: true,
    comment: "Классы функциональной пожарной безопасности",
    unsigned: true,
  })
  idUnit_6: number | null;

  @Column("bigint", {
    name: "id_unit_17",
    nullable: true,
    comment: "Катег.зданий/нар.уст.по взрывопож.и пожарной опасности",
    unsigned: true,
  })
  idUnit_17: number | null;

  @Column("bigint", {
    name: "id_unit_41",
    nullable: true,
    comment: "Типы сооружений (doc.s_units.type=41)",
    unsigned: true,
  })
  idUnit_41: number | null;

  @Column("decimal", {
    name: "area",
    nullable: true,
    comment: "Площадь (кв.м)",
    precision: 10,
    scale: 2,
  })
  area: number | null;

  @Column("date", {
    name: "date_reg",
    nullable: true,
    comment: "Дата регистрации",
  })
  dateReg: Date | null;

  @Column("date", {
    name: "date_annul",
    nullable: true,
    comment: "Дата аннулирования",
  })
  dateAnnul: Date | null;

  @Column("varchar", {
    name: "name_agent",
    nullable: true,
    comment: "ФИО представителя (от субъекта)",
    length: 255,
  })
  nameAgent: string | null;

  @Column("varchar", {
    name: "job_agent",
    nullable: true,
    comment: "Должность представителя суъекта",
    length: 255,
  })
  jobAgent: string | null;

  @Column("varchar", {
    name: "tel_agent",
    nullable: true,
    comment: "Телефон представителя субъекта",
    length: 55,
  })
  telAgent: string | null;

  @Column("varchar", {
    name: "addr_agent",
    nullable: true,
    comment: "Адрес службы/ответственного",
    length: 125,
  })
  addrAgent: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалена,1-действует",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("varchar", {
    name: "addr_exect",
    nullable: true,
    comment: "Уточнение места нахождения",
    length: 255,
  })
  addrExect: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата внесения изменения",
    default: () => "'now()'",
  })
  dateRecord: Date | null;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Ид.пользователя",
    unsigned: true,
  })
  uid: number | null;

  @ManyToOne(() => SUnits, (sUnits) => sUnits.sSubjObjSpecifs, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_unit_17", referencedColumnName: "idUnit" }])
  idUnit: SUnits;

  @ManyToOne(() => SUnits, (sUnits) => sUnits.sSubjObjSpecifs2, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_unit_41", referencedColumnName: "idUnit" }])
  idUnit_2: SUnits;

  @ManyToOne(() => SUnits, (sUnits) => sUnits.sSubjObjSpecifs3, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_unit_6", referencedColumnName: "idUnit" }])
  idUnit_3: SUnits;
}
