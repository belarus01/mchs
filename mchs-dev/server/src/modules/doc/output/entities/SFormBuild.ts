import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SFormBuild1 } from "./SFormBuild1";
import { SFormBuild2 } from "./SFormBuild2";

@Index("FK_s_form_build_id_form", ["idTypeDoc"], {})
@Entity("s_form_build", { schema: "doc" })
export class SFormBuild {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_build", unsigned: true })
  idBuild: string;

  @Column("int", { name: "id_type_doc", nullable: true, unsigned: true })
  idTypeDoc: number | null;

  @Column("varchar", {
    name: "descr",
    nullable: true,
    comment: "скрипт? xml? json? какой-нить костыль",
    length: 125,
  })
  descr: string | null;

  @Column("bigint", { name: "id_parent", nullable: true, unsigned: true })
  idParent: string | null;

  @Column("tinyint", {
    name: "level",
    nullable: true,
    comment:
      "для отдельных блоков (таблиц)1-блок2-блок, зависит от блока с level1 и т.д.",
    unsigned: true,
  })
  level: number | null;

  @Column("int", {
    name: "num_order",
    nullable: true,
    comment: "порядок следования(отрисовки) компонента",
    unsigned: true,
  })
  numOrder: number | null;

  @Column("varchar", {
    name: "db_src_id",
    nullable: true,
    comment: "Расположение данных в БД (формат: DB.tbl.id)",
    length: 255,
  })
  dbSrcId: string | null;

  @Column("bigint", {
    name: "id_src",
    nullable: true,
    comment: "Идентификатор записи (из db_src_id)",
    unsigned: true,
  })
  idSrc: string | null;

  @Column("varchar", {
    name: "didspl_fld",
    nullable: true,
    comment: "Поле для отображения",
    length: 55,
  })
  didsplFld: string | null;

  @Column("tinyint", {
    name: "data_type",
    nullable: true,
    comment: "1-текст,2-числовое",
    unsigned: true,
  })
  dataType: number | null;

  @Column("tinyint", {
    name: "fl_change",
    nullable: true,
    comment: "0-только из бд,1-разрешено  редактирование,2-вручную",
    unsigned: true,
  })
  flChange: number | null;

  @Column("tinyint", {
    name: "active",
    nullable: true,
    comment: "0-неактивно,1-активно,2-удалено",
    unsigned: true,
    default: () => "'1'",
  })
  active: number | null;

  @Column("datetime", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
  })
  dateRecord: Date | null;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, внёсший изменения",
    unsigned: true,
  })
  uid: number | null;

  @OneToMany(() => SFormBuild1, (sFormBuild1) => sFormBuild1.idBuild2)
  sFormBuilds: SFormBuild1[];

  @OneToMany(() => SFormBuild2, (sFormBuild2) => sFormBuild2.idBuild3)
  sFormBuilds2: SFormBuild2[];
}
