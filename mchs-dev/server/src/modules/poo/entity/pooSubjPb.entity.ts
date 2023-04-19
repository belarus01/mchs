import { SUnits } from "src/modules/unit/unit.entity";
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { SPooDocs } from "./pooDocs.entitty";
import { SPogSubjWater } from "src/modules/pog/entity/pogSubjWater.entity";
import { SPogSubjRw } from "src/modules/pog/entity/pogSubjRw.entity";
import { SPogSubjAvia } from "src/modules/pog/entity/pogSubjAvia.entity";
import { SPogSubjAuto } from "src/modules/pog/entity/pogSubjAuto.entity";
  
  @Index("FK_s_poo_subj_id_num_reg", ["idNumReg"], {})
  @Index("FK_s_poo_subj_pb_id_subj_obj", ["idSubjObj"], {})
  @Index("FK_s_poo_subj_pb_id_unit_8", ["idUnit_8"], {})
  @Entity("s_poo_subj_pb", { schema: "doc" })
  export class SPooSubjPb {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
    idList: number;
  
    @Column("int", {
      name: "id_dept",
      nullable: true,
      comment: "Департамент, владелец записи",
      unsigned: true,
    })
    idDept: number | null;
  
    @Column("int", {
      name: "id_dept_dom",
      nullable: true,
      comment: "Индекс структурного подразделения, зарегистрировавшего ПОО",
      unsigned: true,
    })
    idDeptDom: number | null;
  
    @Column("int", {
      name: "id_obl",
      nullable: true,
      comment: "Область департамента",
      unsigned: true,
      default: () => "'1'",
    })
    idObl: number | null;
  
    @Column("int", {
      name: "id_num_reg",
      nullable: true,
      comment: "ид.журнала о регистрации ПОО",
      unsigned: true,
    })
    idNumReg: number | null;
  
    @Column("int", {
      name: "num_reg",
      nullable: true,
      comment: "№ журнала регистра-ции ПОО",
      unsigned: true,
    })
    numReg: number | null;
  
    @Column("int", {
      name: "num_order",
      nullable: true,
      comment: "Порядковый номер в журнале регистрации ПОО",
      unsigned: true,
    })
    numOrder: number | null;
  
    @Column("bigint", {
      name: "id_subj",
      nullable: true,
      comment: "Ид. субъекта",
      unsigned: true,
    })
    idSubj: number | null;
  
    @Column("bigint", {
      name: "id_subj_obj",
      nullable: true,
      comment: "ОПО",
      unsigned: true,
    })
    idSubjObj: number | null;
  
    @Column("varchar", {
      name: "unp",
      nullable: true,
      comment: "УНП",
      length: 30,
    })
    unp: string | null;
  
    @Column("varchar", {
      name: "name_addr_ovner_poo",
      nullable: true,
      comment: "Наименование владельца ПОО, адрес, номер телефона",
      length: 250,
    })
    nameAddrOvnerPoo: string | null;
  
    @Column("int", {
      name: "id_ved",
      nullable: true,
      comment: "Ведомственная принадлежность (mchs.s_vedomstva.id_ved)",
      unsigned: true,
    })
    idVed: number | null;
  
    @Column("varchar", {
      name: "type_poo",
      nullable: true,
      comment: "Тип (марка) ПОО",
      length: 150,
    })
    typePoo: string | null;
  
    @Column("varchar", {
      name: "addr_poo",
      nullable: true,
      comment: "Расположение ПОО/ Адрес ПОО",
      length: 550,
    })
    addrPoo: string | null;
  
    @Column("varchar", {
      name: "specific_poo",
      nullable: true,
      comment: "Основные технические характеристики ПОО",
      length: 500,
    })
    specificPoo: string | null;
  
    @Column("tinyint", {
      name: "fl_pb_pog",
      nullable: true,
      comment: "0-ПБ, 1-ПОГ",
      unsigned: true,
    })
    flPbPog: number | null;
  
    @Column("bigint", {
      name: "id_unit_8",
      nullable: true,
      comment: "Условное обозначение ПОО (doc_s_units.id_unit=8,9)",
      unsigned: true,
    })
    idUnit_8: number | null;
  
    @Column("varchar", {
      name: "symbol",
      nullable: true,
      comment:
        "Буквенное обозначение типа ПОО (doc.s_units.type,где .id_unit=8))",
      length: 60,
    })
    symbol: string | null;
  
    @Column("varchar", {
      name: "manufact_num",
      nullable: true,
      comment: "Заводской номер",
      length: 150,
    })
    manufactNum: string | null;
  
    @Column("varchar", {
      name: "manufact_year",
      nullable: true,
      comment: "год изготовления",
      length: 150,
    })
    manufactYear: string | null;
  
    @Column("varchar", {
      name: "manufact_name",
      nullable: true,
      comment: "Наименование организации – изготовителя ПОО",
      length: 255,
    })
    manufactName: string | null;
  
    @Column("date", {
      name: "date_reg_poo",
      nullable: true,
      comment: "Дата регистрации ПОО",
    })
    dateRegPoo: Date | null;
  
    @Column("varchar", {
      name: "fio_reg_poo",
      nullable: true,
      comment: "ФИО лица, производившего регистрацию",
      length: 150,
    })
    fioRegPoo: string | null;
  
    @Column("date", {
      name: "date_unreg_poo",
      nullable: true,
      comment: "Дата окончания действия записи",
    })
    dateUnregPoo: Date | null;
  
    @Column("varchar", {
      name: "fio_staff",
      nullable: true,
      comment:
        "ФИО лица, получившего паспорт или отметка о направлении уведомления",
      length: 85,
    })
    fioStaff: string | null;
  
    @Column("varchar", {
      name: "info_change",
      nullable: true,
      comment:
        "Сведения о внесении изменений в документы, связанные с регистрацией ПОО",
      length: 255,
    })
    infoChange: string | null;
  
    @Column("tinyint", {
      name: "org",
      comment: "0-Госнадзор, 1-пожарники,2-другие",
      unsigned: true,
      default: () => "'0'",
    })
    org: number;
  
    @Column("date", {
      name: "date_record",
      nullable: true,
      comment: "Дата изменения записи",
      default: () => "'now()'",
    })
    dateRecord: Date | null;
  
    @Column("tinyint", {
      name: "active",
      comment: "0-удалено, 1-активно",
      unsigned: true,
      default: () => "'1'",
    })
    active: number;
  
    @Column("int", {
      name: "uid",
      nullable: true,
      comment: "Пользователь, изменивший запись",
      unsigned: true,
    })
    uid: number | null;
  
    @OneToMany(() => SPogSubjAuto, (sPogSubjAuto) => sPogSubjAuto.idSubjObj2)
    sPogSubjAutos: SPogSubjAuto[];
  
    @OneToMany(() => SPogSubjAvia, (sPogSubjAvia) => sPogSubjAvia.idSubjObj2)
    sPogSubjAvias: SPogSubjAvia[];
  
    @OneToMany(() => SPogSubjRw, (sPogSubjRw) => sPogSubjRw.idSubjObj2)
    sPogSubjRws: SPogSubjRw[];
  
    @OneToMany(() => SPogSubjWater, (sPogSubjWater) => sPogSubjWater.idSubjObj2)
    sPogSubjWaters: SPogSubjWater[];
  
    @ManyToOne(() => SPooDocs, (sPooDocs) => sPooDocs.sPooSubjPbs, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "id_num_reg", referencedColumnName: "idNumReg" }])
    idNumReg2: SPooDocs;
  
    @ManyToOne(() => SUnits, (sUnits) => sUnits.sPooSubjPbs, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "id_unit_8", referencedColumnName: "idUnit" }])
    idUnit: SUnits;
  }
  