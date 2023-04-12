import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

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

  @Column("tinyint", {
    name: "active",
    comment: "0-удалена,1-действует",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

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
}
