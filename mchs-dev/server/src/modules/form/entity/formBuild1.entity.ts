import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { SFormBuild } from "./formBuild.entity";
import { SFormBuild2 } from "./formbuild2.entity";
  
  @Index("FK_s_form_build1_id_build", ["idBuild"], {})
  @Entity("s_form_build1", { schema: "doc" })
  export class SFormBuild1 {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id_build1", unsigned: true })
    idBuild1: number;
  
    @Column("bigint", { name: "id_build", nullable: true, unsigned: true })
    idBuild: number | null;
  
    @Column("int", {
      name: "num_str",
      nullable: true,
      comment: "порядок следования(отрисовки) компонента",
      unsigned: true,
    })
    numStr: number | null;
  
    @Column("int", {
      name: "num_col",
      nullable: true,
      comment: "Номер колонки",
      unsigned: true,
    })
    numCol: number | null;
  
    @Column("varchar", {
      name: "label",
      nullable: true,
      comment: "скрипт? xml? json? какой-нить костыль",
      length: 655,
    })
    label: string | null;
  
    @Column("tinyint", {
      name: "sprt_bl",
      nullable: true,
      comment:
        "1-начало отдельного блока.2-начало отдельного повторяемого блока,2-выпад.сп.",
      unsigned: true,
    })
    sprtBl: number | null;
  
    @Column("tinyint", {
      name: "sprt_bl_col",
      nullable: true,
      comment: "количество колонок в сепарэйт блоке",
      unsigned: true,
    })
    sprtBlCol: number | null;
  
    @Column("bigint", {
      name: "id_parent",
      nullable: true,
      comment: "компоненты",
      unsigned: true,
    })
    idParent: number | null;
  
    @Column("bigint", {
      name: "id_to",
      nullable: true,
      comment: "куда подаем (пока что так. надо подумать)",
      unsigned: true,
    })
    idTo: number | null;
  
    @Column("tinyint", {
      name: "level",
      nullable: true,
      comment:
        "для отдельных блоков (таблиц)1-блок2-блок, зависящий от блока с level1",
      unsigned: true,
    })
    level: number | null;
  
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
    idSrc: number | null;
  
    @Column("varchar", {
      name: "displ_fld",
      nullable: true,
      comment: "Поле для отображения",
      length: 55,
    })
    displFld: string | null;
  
    @Column("tinyint", {
      name: "data_type",
      nullable: true,
      comment:
        "0-пусто,1-label,2-text,3-textarea,4-date.5-DATETIME,6-checkbox,7-radio,8-form-check,9-select,10-text(number),11-placeholder",
      unsigned: true,
    })
    dataType: number | null;
  
    @Column("tinyint", {
      name: "fl_change",
      nullable: true,
      comment:
        "0-только из бд,1-разрешено  редактирование,2-вручную,3- берем из descr,4-выбор из выпадающего спискаб\r\nr,5-множественный выбор из выпадающего списка",
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
      default: () => "'now()'",
    })
    dateRecord: Date | null;
  
    @Column("int", {
      name: "uid",
      nullable: true,
      comment: "Пользователь, внёсший изменения",
      unsigned: true,
    })
    uid: number | null;
  
    @Column("tinyint", {
      name: "org",
      nullable: true,
      comment: "null-общее,0-надзорники, 1-пожарники",
      unsigned: true,
    })
    org: number | null;
  
    @Column("varchar", { name: "comm", nullable: true, length: 55 })
    comm: string | null;
  
    @ManyToOne(() => SFormBuild, (sFormBuild) => sFormBuild.sFormBuilds, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "id_build", referencedColumnName: "idBuild" }])
    idBuild2: SFormBuild;
  
    @OneToMany(() => SFormBuild2, (sFormBuild2) => sFormBuild2.idBuild4)
    sFormBuilds: SFormBuild2[];
  }
  