import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SEvents } from "../events/entity/events.entity";
import { SEventsOrder } from "../events/entity/eventsOrder.entity";
import { SEventsOrderObj } from "../events/entity/eventsOrderObj.entity";
import { SEventsPlan } from "../events/entity/eventsPlan.entity";
import { SPooSubjPb } from "../poo/entity/pooSubjPb.entity";
import { SQuestion } from "../question/entity/question.entity";
import { SSubjObjSpecif } from "../object/entity/objectSpecif.entity";
import { SFireCardBuild } from "../fire/entity/fireCardBuild.entity";

@Entity("s_units", { schema: "mchs" })
export class SUnits {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_unit", unsigned: true })
  idUnit: number;

  @Column("bigint", { name: "id_parent", nullable: true, unsigned: true })
  idParent: number | null;

  @Column("int", {
    name: "type_unit",
    nullable: true,
    comment:
      "0-сферы контроля, 1-класс опасности,2-Наименование контролирующих органов",
    unsigned: true,
  })
  typeUnit: number | null;

  @Column("varchar", {
    name: "num_",
    nullable: true,
    comment: "Номер (ООН опасных грузов чл_4)",
    length: 55,
  })
  num: string | null;

  @Column("varchar", {
    name: "type",
    nullable: true,
    comment: "Тип опасности",
    length: 60,
  })
  type: string | null;

  @Column("varchar", {
    name: "type_sub",
    nullable: true,
    comment: "Подкласс опсных грузов (чл_4)",
    length: 21,
  })
  typeSub: string | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "Описание опасности",
    length: 850,
  })
  name: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
    default: () => "'now()'",
  })
  dateRecord: Date | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалено, 1-актино",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("tinyint", {
    name: "org",
    comment: "0-госнадзор, 1-пожарники, 2",
    unsigned: true,
    default: () => "'1'",
  })
  org: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, внесший изменения",
    unsigned: true,
  })
  uid: number | null;

  @Column("varchar", { name: "comm", nullable: true, length: 155 })
  comm: string | null;

  @OneToMany(() => SEvents, (sEvents) => sEvents.idUnit)
  sEvents: SEvents[];

  @OneToMany(() => SEventsOrder, (sEventsOrder) => sEventsOrder.idUnit_2)
  sEventsOrders: SEventsOrder[];

  @OneToMany(() => SEventsOrder, (sEventsOrder) => sEventsOrder.idUnit_5)
  sEventsOrders2: SEventsOrder[];

  @OneToMany(() => SEventsOrder, (sEventsOrder) => sEventsOrder.sphera2)
  sEventsOrders3: SEventsOrder[];

  @OneToMany(() => SEventsOrderObj, (sEventsOrderObj) => sEventsOrderObj.idUnit)
  sEventsOrderObjs: SEventsOrderObj[];

  @OneToMany(
    () => SEventsOrderObj,
    (sEventsOrderObj) => sEventsOrderObj.idUnit_2
  )
  sEventsOrderObjs2: SEventsOrderObj[];

  @OneToMany(
    () => SEventsOrderObj,
    (sEventsOrderObj) => sEventsOrderObj.idUnit_3
  )
  sEventsOrderObjs3: SEventsOrderObj[];

  @OneToMany(() => SEventsPlan, (sEventsPlan) => sEventsPlan.idUnit)
  sEventsPlans: SEventsPlan[];

  @OneToMany(() => SEventsPlan, (sEventsPlan) => sEventsPlan.idUnit_2)
  sEventsPlans2: SEventsPlan[];

  @OneToMany(() => SFireCardBuild, (sFireCardBuild) => sFireCardBuild.idUnit_17)
  sFireCardBuilds: SFireCardBuild[];

  @OneToMany(() => SFireCardBuild, (sFireCardBuild) => sFireCardBuild.idUnit)
  sFireCardBuilds2: SFireCardBuild[];

  @OneToMany(() => SFireCardBuild, (sFireCardBuild) => sFireCardBuild.idUnit_2)
  sFireCardBuilds3: SFireCardBuild[];

  @OneToMany(() => SPooSubjPb, (sPooSubjPb) => sPooSubjPb.idUnit)
  sPooSubjPbs: SPooSubjPb[];

  @OneToMany(() => SQuestion, (sQuestion) => sQuestion.idUnit)
  sQuestions: SQuestion[];

  @OneToMany(() => SSubjObjSpecif, (sSubjObjSpecif) => sSubjObjSpecif.idUnit)
  sSubjObjSpecifs: SSubjObjSpecif[];

  @OneToMany(() => SSubjObjSpecif, (sSubjObjSpecif) => sSubjObjSpecif.idUnit_2)
  sSubjObjSpecifs2: SSubjObjSpecif[];

  @OneToMany(() => SSubjObjSpecif, (sSubjObjSpecif) => sSubjObjSpecif.idUnit_3)
  sSubjObjSpecifs3: SSubjObjSpecif[];
}
