import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_form_build_data", { schema: "doc" })
export class SFormBuildData {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_data", unsigned: true })
  idData: number;

  @Column("bigint", {
    name: "id_build2",
    nullable: true,
    comment: "Ид.формы",
    unsigned: true,
  })
  idBuild2: number | null;

  @Column("bigint", {
    name: "id_event_order",
    nullable: true,
    comment: "задание-пользователь ",
  })
  idEventOrder: number | null;

  @Column("bigint", { name: "id_obj_order", nullable: true, unsigned: true })
  idObjOrder: number | null;

  @Column("datetime", {
    name: "data_record",
    nullable: true,
    comment: "Дата внесения изменений",
  })
  dataRecord: Date | null;

  @Column("varchar", {
    name: "value_str",
    nullable: true,
    comment: "Данные из формы",
    length: 255,
  })
  valueStr: string | null;

  @Column("tinyint", {
    name: "value_type",
    nullable: true,
    comment: "1-int,2-string,3-DATE,4-double,5-bool",
    unsigned: true,
  })
  valueType: number | null;

  @Column("bigint", {
    name: "uid",
    nullable: true,
    comment: "пользователь, внесший изменения",
    unsigned: true,
  })
  uid: number | null;
}
