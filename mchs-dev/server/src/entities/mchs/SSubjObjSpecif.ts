import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_subj_obj_specif", { schema: "mchs" })
export class SSubjObjSpecif {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_specif", unsigned: true })
  idSpecif: string;

  @Column("bigint", { name: "id_subj_obj", unsigned: true })
  idSubjObj: string;

  @Column("varchar", {
    name: "name_build",
    nullable: true,
    comment: "Наимен.сооружения",
    length: 255,
  })
  nameBuild: string | null;

  @Column("varchar", {
    name: "func_build",
    nullable: true,
    comment: "Функц.назнач.сооружения",
    length: 255,
  })
  funcBuild: string | null;

  @Column("int", {
    name: "area",
    nullable: true,
    comment: "Площадь (кв.м)",
    unsigned: true,
  })
  area: number | null;

  @Column("date", {
    name: "date_reg",
    nullable: true,
    comment: "Дата регистрации",
  })
  dateReg: string | null;

  @Column("date", {
    name: "date_annul",
    nullable: true,
    comment: "Дата аннулирования",
  })
  dateAnnul: string | null;

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
  })
  dateRecord: string | null;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Ид.пользователя",
    unsigned: true,
  })
  uid: number | null;
}
