import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_dept_units", { schema: "mchs" })
export class SDeptUnits {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_dept_units",
    unsigned: true,
  })
  idDeptUnits: number;

  @Column("varchar", {
    name: "name_unit",
    nullable: true,
    comment: "Наименование подразделения",
    length: 250,
  })
  nameUnit: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
  })
  dateRecord: string | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-госпромнадзор, 1-пожарники",
    unsigned: true,
    default: () => "'1'",
  })
  org: number;

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

  @Column("int", { name: "id_dept", nullable: true, unsigned: true })
  idDept: number | null;

  @Column("tinyint", {
    name: "struct_level",
    nullable: true,
    comment:
      "1-Главное управление, 2-областное управление,3-межрайонные отделы",
    unsigned: true,
  })
  structLevel: number | null;
}
