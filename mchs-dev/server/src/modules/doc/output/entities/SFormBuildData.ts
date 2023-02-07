import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_form_build_data", { schema: "doc" })
export class SFormBuildData {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_data", unsigned: true })
  idData: string;

  @Column("bigint", {
    name: "id_build2",
    nullable: true,
    comment: "Ид.формы",
    unsigned: true,
  })
  idBuild2: string | null;

  @Column("bigint", {
    name: "id_event_order",
    nullable: true,
    comment: "задание-пользователь ",
  })
  idEventOrder: string | null;

  @Column("datetime", {
    name: "data_record",
    nullable: true,
    comment: "Дата внесения изменений",
  })
  dataRecord: Date | null;

  @Column("varchar", {
    name: "info",
    nullable: true,
    comment: "Данные из формы",
    length: 255,
  })
  info: string | null;

  @Column("bigint", {
    name: "uid",
    nullable: true,
    comment: "пользователь, внесший изменения",
    unsigned: true,
  })
  uid: string | null;
}
