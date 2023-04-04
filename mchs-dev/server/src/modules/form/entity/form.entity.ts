import { SDefection } from "src/modules/defection/entity/defection.entity";
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
/*   import { SDefection } from "./SDefection";
  import { STypeDoc } from "./STypeDoc";
  import { SFormReport } from "./SFormReport"; */
  
  @Index("FK_s_doc_id_type_doc", ["idTypeDoc"], {})
  @Entity("s_form", { schema: "doc" })
  export class SForm {
    @PrimaryGeneratedColumn({ type: "int", name: "id_form", unsigned: true })
    idForm: number;
  
    @Column("int", {
      name: "id_type_doc",
      nullable: true,
      comment: "Тип документа",
      unsigned: true,
    })
    idTypeDoc: number | null;
  
    @Column("tinyint", {
      name: "num_appendix",
      nullable: true,
      comment: "Номер приложения",
      unsigned: true,
    })
    numAppendix: number | null;
  
    @Column("varchar", {
      name: "name_doc",
      nullable: true,
      comment: "Номер документа об оценке соответствия",
      length: 255,
    })
    nameDoc: string | null;
  
    @Column("varchar", {
      name: "path_templ",
      nullable: true,
      comment: "Адрес  шаблона",
      length: 255,
    })
    pathTempl: string | null;
  
    @Column("varchar", {
      name: "name_templ",
      nullable: true,
      comment: "Наименование шаблона",
      length: 255,
    })
    nameTempl: string | null;
  
    @Column("date", {
      name: "date_from",
      nullable: true,
      comment: "Дата начала действия документа об оценке соответствия",
    })
    dateFrom: Date | null;
  
    @Column("date", {
      name: "date_to",
      nullable: true,
      comment: "Дата окончания действия документа об оценке соответствия",
    })
    dateTo: Date | null;
  
    @Column("tinyint", {
      name: "org",
      comment: "0-Госнадзор, 1-пожарники,2-ГУБОП",
      unsigned: true,
      default: () => "'0'",
    })
    org: number;
  
    @Column("datetime", {
      name: "date_record",
      nullable: true,
      comment: "Дата изменения записи",
      default: () => "CURRENT_TIMESTAMP",
    })
    dateRecord: Date | null;
  
    @Column("int", {
      name: "uid",
      nullable: true,
      comment: "Ид.пользователя, внесшего изменения",
      unsigned: true,
    })
    uid: number | null;
  
    @Column("tinyint", {
      name: "active",
      comment: "1-активная запись,2 - удалено",
      unsigned: true,
      default: () => "'1'",
    })
    active: number;
  
    @Column("varchar", {
      name: "comm",
      nullable: true,
      comment: "Примечание",
      length: 255,
    })
    comm: string | null;
  
    @OneToMany(() => SDefection, (sDefection) => sDefection.idForm2)
    sDefections: SDefection[];
  
/*     @ManyToOne(() => STypeDoc, (sTypeDoc) => sTypeDoc.sForms, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "id_type_doc", referencedColumnName: "idTypeDoc" }])
    idTypeDoc2: STypeDoc;
  
    @OneToMany(() => SFormReport, (sFormReport) => sFormReport.idForm2)
    sFormReports: SFormReport[]; */
  }
  