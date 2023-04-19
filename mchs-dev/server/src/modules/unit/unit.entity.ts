import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SQuestion } from "../question/entity/question.entity";
import { SEventsOrder } from "../events/entity/eventsOrder.entity";
import { SPooSubjPb } from "../poo/entity/pooSubjPb.entity";
/* import { SFireCardBuild } from "./SFireCardBuild";
import { SPooSubjPb } from "./SPooSubjPb";
import { SQuestion } from "./SQuestion"; */

@Entity("s_units", { schema: "doc" })
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

  @Column("varchar", { name: "comm", nullable: true, length: 55 })
  comm: string | null;

/*   @OneToMany(() => SFireCardBuild, (sFireCardBuild) => sFireCardBuild.idUnit_17)
  sFireCardBuilds: SFireCardBuild[];

  @OneToMany(() => SFireCardBuild, (sFireCardBuild) => sFireCardBuild.idUnit)
  sFireCardBuilds2: SFireCardBuild[];

  @OneToMany(() => SFireCardBuild, (sFireCardBuild) => sFireCardBuild.idUnit_2)
  sFireCardBuilds3: SFireCardBuild[];*/

  @OneToMany(() => SPooSubjPb, (sPooSubjPb) => sPooSubjPb.idUnit)
  sPooSubjPbs: SPooSubjPb[]; 

  @OneToMany(() => SQuestion, (sQuestion) => sQuestion.idUnit)
  sQuestions: SQuestion[];

/*   @ManyToOne(() => SEventsOrder, (sEventsOrder) => sEventsOrder.sUnits, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "id_event_order", referencedColumnName: "idEventOrder" },
  ])
  idEventOrder2: SEventsOrder; */
}
