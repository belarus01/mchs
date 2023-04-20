import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SPooSubjPb } from "./SPooSubjPb";

@Index("FK_s_pog_subj_auto_id_subj_obj2", ["idSubjObj"], {})
@Entity("s_pog_subj_auto", { schema: "doc" })
export class SPogSubjAuto {
  @PrimaryGeneratedColumn({ type: "int", name: "id_list", unsigned: true })
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
    comment: "Индекс структурного подразделения, зарегистрировавшего ПОГ",
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

  @Column("bigint", { name: "id_subj_obj", nullable: true, unsigned: true })
  idSubjObj: string | null;

  @Column("int", {
    name: "id_num_reg",
    nullable: true,
    comment: "ид.журнала о регистрации ПОГ doc.s_poo_docs",
    unsigned: true,
    default: () => "'1100'",
  })
  idNumReg: number | null;

  @Column("int", {
    name: "num_reg",
    nullable: true,
    comment: "№ журнала регистра-ции ПОГ",
    unsigned: true,
    default: () => "'1100'",
  })
  numReg: number | null;

  @Column("int", {
    name: "num_gosnadz",
    nullable: true,
    comment: "Регистрационный № ПОГ",
    unsigned: true,
  })
  numGosnadz: number | null;

  @Column("varchar", {
    name: "num_order",
    nullable: true,
    comment: "Порядковый номер в журнале регистрации ПОГ",
    length: 85,
  })
  numOrder: string | null;

  @Column("date", {
    name: "date_reg_poo",
    nullable: true,
    comment: "Дата регистрации заявления о регистрации трасп.средства ПОГ",
  })
  dateRegPoo: string | null;

  @Column("varchar", {
    name: "num_reg_poo",
    nullable: true,
    comment: "№ регистрации заявления о регистрации трасп.средства ПОГ",
    length: 85,
  })
  numRegPoo: string | null;

  @Column("varchar", {
    name: "unp",
    nullable: true,
    comment: "УНП субъекта",
    length: 30,
  })
  unp: string | null;

  @Column("varchar", {
    name: "name_addr_ovner_poo",
    nullable: true,
    comment: "Наименование организации субъекта, ФИО ИП владельца ПОГ",
    length: 250,
  })
  nameAddrOvnerPoo: string | null;

  @Column("int", {
    name: "id_obl_subj",
    nullable: true,
    comment: "Область субъекта владельца ПОГ mchs.s_ate_obl",
    unsigned: true,
  })
  idOblSubj: number | null;

  @Column("int", {
    name: "id_rayon_subj",
    nullable: true,
    comment: "Район субъекта владельца ПОГ mchs.s_ate_rayon",
    unsigned: true,
  })
  idRayonSubj: number | null;

  @Column("int", {
    name: "id_city_subj",
    nullable: true,
    comment: "Город субъекта владельца ПОГ mchs.s_ate_street.name_reestr",
    unsigned: true,
  })
  idCitySubj: number | null;

  @Column("int", {
    name: "id_street_subj",
    nullable: true,
    comment: "Улица субъекта владельца ПОГ mchs.s_ate_street.name_rus",
    unsigned: true,
  })
  idStreetSubj: number | null;

  @Column("varchar", {
    name: "num_build",
    nullable: true,
    comment: "Номер дома,корп.,индекс субъекта владельца ПОГ",
    length: 150,
  })
  numBuild: string | null;

  @Column("varchar", {
    name: "contacts",
    nullable: true,
    comment: "Контактные данные субъекта владельца ПОГ",
    length: 150,
  })
  contacts: string | null;

  @Column("bigint", {
    name: "id_type_ts",
    nullable: true,
    comment: "Класс опасности  из s_units.type из doc.s_units.type_unit=12",
    unsigned: true,
  })
  idTypeTs: string | null;

  @Column("varchar", {
    name: "type_ts",
    nullable: true,
    comment:
      "Тип транспортного средства s_units.type из doc.s_units.type_unit=12",
    length: 60,
  })
  typeTs: string | null;

  @Column("bigint", {
    name: "id_type_dopog_ts",
    nullable: true,
    comment: "Тип транспортного средства по DOPOG из doc.s_units.type_unit=13",
    unsigned: true,
  })
  idTypeDopogTs: string | null;

  @Column("varchar", {
    name: "type_dopog_ts",
    nullable: true,
    comment:
      "Тип транспортного средства по DOPOG doc.s_units.type из doc.s_units.type_unit=13",
    length: 60,
  })
  typeDopogTs: string | null;

  @Column("varchar", {
    name: "brend_ts",
    nullable: true,
    comment: "Марка транспортного средства ",
    length: 60,
  })
  brendTs: string | null;

  @Column("varchar", {
    name: "model_ts",
    nullable: true,
    comment: "Модель транспортного средства ",
    length: 60,
  })
  modelTs: string | null;

  @Column("varchar", {
    name: "vin_ts",
    nullable: true,
    comment: "Номер шасси транспортного средства ",
    length: 60,
  })
  vinTs: string | null;

  @Column("varchar", {
    name: "manufact_num_tanc",
    nullable: true,
    comment: "Заводской номер цистерны",
    length: 150,
  })
  manufactNumTanc: string | null;

  @Column("varchar", {
    name: "manufact_year_ts",
    nullable: true,
    comment: "Год выпуска ТС",
    length: 150,
  })
  manufactYearTs: string | null;

  @Column("varchar", {
    name: "manufact_year_tanc",
    nullable: true,
    comment: "Год выпуска цистерны",
    length: 150,
  })
  manufactYearTanc: string | null;

  @Column("varchar", {
    name: "manufact_ts",
    nullable: true,
    comment: "Завод-изготовитель ТС",
    length: 150,
  })
  manufactTs: string | null;

  @Column("varchar", {
    name: "num_reg_gai",
    nullable: true,
    comment: "Регистрационный знак",
    length: 55,
  })
  numRegGai: string | null;

  @Column("bigint", {
    name: "id_danger_class",
    nullable: true,
    comment: "Класс опасности  из doc.s_units.type_unit=5",
    unsigned: true,
  })
  idDangerClass: string | null;

  @Column("varchar", {
    name: "danger_class",
    nullable: true,
    comment:
      "Класс опасности doc.s_units.type_unit=5 doc.s_units.type+doc.s_units.name",
    length: 85,
  })
  dangerClass: string | null;

  @Column("int", {
    name: "id_street_ts",
    nullable: true,
    comment: "СОАТО код места стоянки mchs.s_ate_street.soato_code",
    unsigned: true,
  })
  idStreetTs: number | null;

  @Column("int", {
    name: "street_ts",
    nullable: true,
    comment: "Улица  места стоянки mchs.s_ate_street.name_rus",
    unsigned: true,
  })
  streetTs: number | null;

  @Column("varchar", {
    name: "num_build_ts",
    nullable: true,
    comment: "Номер дома места стоянки ТС",
    length: 150,
  })
  numBuildTs: string | null;

  @Column("date", {
    name: "date_control_tanc",
    nullable: true,
    comment: "Дата проведенной проверки цистерны",
  })
  dateControlTanc: string | null;

  @Column("int", {
    name: "id_type_control_tanc",
    nullable: true,
    comment: "Тип проведенной проверки цистерны из doc.s_units.type_unit=14",
    unsigned: true,
  })
  idTypeControlTanc: number | null;

  @Column("varchar", {
    name: "type_control_tanc",
    nullable: true,
    comment:
      "Тип проведенной проверки цистерны  doc.s_units.type из doc.s_units.type_unit=14",
    length: 150,
  })
  typeControlTanc: string | null;

  @Column("tinyint", {
    name: "pre_exploit",
    nullable: true,
    comment: "Предэксплуатационная проверка (1-да,0-нет)",
    unsigned: true,
  })
  preExploit: number | null;

  @Column("decimal", {
    name: "size_tanc",
    nullable: true,
    comment: "Объем цистерны м3",
    precision: 10,
    scale: 0,
  })
  sizeTanc: string | null;

  @Column("tinyint", {
    name: "num_sections",
    nullable: true,
    comment: "Количество секций",
    unsigned: true,
  })
  numSections: number | null;

  @Column("varchar", {
    name: "tanc_code",
    nullable: true,
    comment: "Код цистерны",
    length: 25,
  })
  tancCode: string | null;

  @Column("varchar", {
    name: "num_ok",
    nullable: true,
    comment: "Номер официального утверждения типа",
    length: 25,
  })
  numOk: string | null;

  @Column("date", {
    name: "date_ok",
    nullable: true,
    comment: "Дата официального утверждения типа",
  })
  dateOk: string | null;

  @Column("varchar", {
    name: "doc_ok",
    nullable: true,
    comment:
      "Официальное утверждение типа (№документа,подтверждающего соотв.требованиям ТР ТС)",
    length: 25,
  })
  docOk: string | null;

  @Column("date", {
    name: "date_doc_ok",
    nullable: true,
    comment: "Дата документа,подтверждающего соотв.требованиям ТР ТС",
  })
  dateDocOk: string | null;

  @Column("varchar", {
    name: "num_device",
    nullable: true,
    comment:
      "Колич.и тип устройств безопасности и (ДУ или ПК, или ВК) цистерны",
    length: 255,
  })
  numDevice: string | null;

  @Column("tinyint", {
    name: "num_membr",
    nullable: true,
    comment: "Наличие разрывной мембраны (количество) цистерны",
    unsigned: true,
  })
  numMembr: number | null;

  @Column("varchar", {
    name: "material",
    nullable: true,
    comment: "Материал цистерны",
    length: 125,
  })
  material: string | null;

  @Column("decimal", {
    name: "pressure",
    nullable: true,
    comment: "Расчетное давление Pa (цистерны)",
    precision: 10,
    scale: 0,
  })
  pressure: string | null;

  @Column("tinyint", {
    name: "fl_iso",
    nullable: true,
    comment: "Наличие изоляции (цистерны) 0-нет,1-да",
    unsigned: true,
  })
  flIso: number | null;

  @Column("tinyint", {
    name: "fl_screen",
    nullable: true,
    comment: "Наличие солнцезащитного экрана (цистерны) 0-нет,1-да",
    unsigned: true,
  })
  flScreen: number | null;

  @Column("varchar", {
    name: "binding",
    nullable: true,
    comment: "Вид крепления волнорезов (сварка/резьбовое) цистерны",
    length: 85,
  })
  binding: string | null;

  @Column("varchar", {
    name: "reg_inspector",
    nullable: true,
    comment: "Фамилия, инициалы инспетора, зарегистрировавшего ТС",
    length: 185,
  })
  regInspector: string | null;

  @Column("varchar", {
    name: "fio_staff",
    nullable: true,
    comment:
      "Фамилия, имя, отчество лица, получившего регистрационную карточку ТС",
    length: 185,
  })
  fioStaff: string | null;

  @Column("date", {
    name: "date_unreg",
    nullable: true,
    comment: "Дата регистрации заявления о снятии с учета ТС",
  })
  dateUnreg: string | null;

  @Column("varchar", {
    name: "num_unreg",
    nullable: true,
    comment: "Номер заявления о снятии с учета ТС",
    length: 55,
  })
  numUnreg: string | null;

  @Column("varchar", {
    name: "why_unreg",
    nullable: true,
    comment: "Причина снятия с учета ТС",
    length: 85,
  })
  whyUnreg: string | null;

  @Column("varchar", {
    name: "unreg_inspector",
    nullable: true,
    comment: "Фамилия, инициалы инспетора, снявшего с учета ТС",
    length: 185,
  })
  unregInspector: string | null;

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
  dateRecord: string | null;

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

  @ManyToOne(() => SPooSubjPb, (sPooSubjPb) => sPooSubjPb.sPogSubjAutos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_subj_obj", referencedColumnName: "idList" }])
  idSubjObj2: SPooSubjPb;
}
