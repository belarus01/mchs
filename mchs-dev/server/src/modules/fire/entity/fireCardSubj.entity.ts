import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { SFireCardBuild } from "./fireCardBuild.entity";
import { SSubj } from "src/modules/subject/entity/subject.entity";
  
  @Index("FK_s_fire_card_subj_id_subj", ["idSubj"], {})
  @Entity("s_fire_card_subj", { schema: "mchs" })
  export class SFireCardSubj {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
    idList: number;
  
    @Column("int", { name: "id_dept", nullable: true, unsigned: true })
    idDept: number | null;
  
    @Column("int", { name: "id_obl", nullable: true, unsigned: true })
    idObl: number | null;
  
    @Column("bigint", { name: "id_subj", nullable: true, unsigned: true })
    idSubj: number | null;
  
    @Column("int", { name: "num_reg", nullable: true, unsigned: true })
    numReg: number | null;
  
    @Column("varchar", {
      name: "descr",
      nullable: true,
      comment: "Краткое описание деятельности субъекта",
      length: 255,
    })
    descr: string | null;
  
    @Column("tinyint", {
      name: "type_org",
      nullable: true,
      comment: "0-пож,1-ПОГ,2-ПБ Чья епархия",
      unsigned: true,
    })
    typeOrg: number | null;
  
    @Column("date", {
      name: "date_record",
      nullable: true,
      comment: "Дата составления (изменения)",
      default: () => "'now()'",
    })
    dateRecord: Date | null;
  
    @Column("varchar", {
      name: "addr_record",
      nullable: true,
      comment: "Населенный пункт ",
      length: 255,
    })
    addrRecord: string | null;
  
    @Column("decimal", {
      name: "area",
      nullable: true,
      comment: "Площадь застройки, м2",
      precision: 10,
      scale: 3,
    })
    area: number | null;
  
    @Column("varchar", {
      name: "service_org",
      nullable: true,
      comment:
        "6.2.2.3. Обслуживающая организация((наименование, юридический адрес,номер и дата выдачи лицензии,  руководитель,  телефон ) ",
      length: 2555,
    })
    serviceOrg: string | null;
  
    @Column("tinyint", {
      name: "org",
      comment: "0-надзор, 1-пожарники,2-общий объект",
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
  
    @OneToMany(() => SFireCardBuild, (sFireCardBuild) => sFireCardBuild.idCard2)
    sFireCardBuilds: SFireCardBuild[];
  
    @ManyToOne(() => SSubj, (sSubj) => sSubj.sFireCardSubjs, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "id_subj", referencedColumnName: "idSubj" }])
    idSubj2: SSubj;
  }
  