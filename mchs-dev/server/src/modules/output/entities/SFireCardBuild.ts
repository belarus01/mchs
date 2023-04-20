import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SUnits } from "./SUnits";

@Index("FK_s_fire_card_build_id_unit_6", ["idUnit_6"], {})
@Index("FK_s_fire_card_build_id_unit_17_37", ["idUnit_17_37"], {})
@Index("FK_s_fire_card_build_id_unit_21", ["idUnit_21"], {})
@Entity("s_fire_card_build", { schema: "doc" })
export class SFireCardBuild {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
  idList: string;

  @Column("bigint", { name: "id_card", nullable: true, unsigned: true })
  idCard: string | null;

  @Column("int", { name: "id_dept", nullable: true, unsigned: true })
  idDept: number | null;

  @Column("int", { name: "id_obl", nullable: true, unsigned: true })
  idObl: number | null;

  @Column("bigint", { name: "id_subj", nullable: true, unsigned: true })
  idSubj: string | null;

  @Column("int", {
    name: "num_reg",
    nullable: true,
    comment: "№ по порядку ",
    unsigned: true,
  })
  numReg: number | null;

  @Column("varchar", {
    name: "name_build",
    nullable: true,
    comment: "Наименование отдельного объекта",
    length: 255,
  })
  nameBuild: string | null;

  @Column("bigint", {
    name: "id_unit_6",
    nullable: true,
    comment:
      "Класс функциональной пожарной опасности doc.s_units.type_unit=6  type",
    unsigned: true,
  })
  idUnit_6: string | null;

  @Column("varchar", { name: "addr", nullable: true, length: 255 })
  addr: string | null;

  @Column("int", {
    name: "num_person",
    nullable: true,
    comment: "Максимальное количество единовременно находящихся  людей (чел.) ",
    unsigned: true,
  })
  numPerson: number | null;

  @Column("varchar", {
    name: "level_build",
    nullable: true,
    comment: "Этажность, степень огнестойкости",
    length: 255,
  })
  levelBuild: string | null;

  @Column("decimal", {
    name: "space",
    nullable: true,
    comment: "Общий строительный объем, м3",
    precision: 10,
    scale: 3,
  })
  space: string | null;

  @Column("decimal", {
    name: "area",
    nullable: true,
    comment: "Поэтажная площадь, м2",
    precision: 10,
    scale: 3,
  })
  area: string | null;

  @Column("bigint", {
    name: "id_unit_17_37",
    nullable: true,
    comment:
      "Категория здания (наружной установки)  по взрывопожарной, пожарной опасности doc.s_units.type_unit=17,37  type",
    unsigned: true,
  })
  idUnit_17_37: string | null;

  @Column("bigint", {
    name: "id_unit_21",
    nullable: true,
    comment: "степень огнестойкости зданий",
    unsigned: true,
  })
  idUnit_21: string | null;

  @Column("decimal", {
    name: "area_A",
    nullable: true,
    comment: "Площадь помещений, м2 категории А",
    precision: 10,
    scale: 3,
  })
  areaA: string | null;

  @Column("decimal", {
    name: "area_6",
    nullable: true,
    comment: "Площадь помещений, м2 категории Б",
    precision: 10,
    scale: 3,
  })
  area_6: string | null;

  @Column("decimal", {
    name: "area_B1",
    nullable: true,
    comment: "Площадь помещений, м2 категории В1",
    precision: 10,
    scale: 3,
  })
  areaB1: string | null;

  @Column("decimal", {
    name: "area_B2",
    nullable: true,
    comment: "Площадь помещений, м2 категории В2",
    precision: 10,
    scale: 3,
  })
  areaB2: string | null;

  @Column("decimal", {
    name: "area_B3",
    nullable: true,
    comment: "Площадь помещений, м2 категории В3",
    precision: 10,
    scale: 3,
  })
  areaB3: string | null;

  @Column("decimal", {
    name: "area_B4",
    nullable: true,
    comment: "Площадь помещений, м2 категории В4",
    precision: 10,
    scale: 3,
  })
  areaB4: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата составления (изменения)",
    default: () => "'now()'",
  })
  dateRecord: string | null;

  @Column("varchar", {
    name: "info",
    nullable: true,
    comment: "доп.инфо",
    length: 255,
  })
  info: string | null;

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

  @ManyToOne(() => SUnits, (sUnits) => sUnits.sFireCardBuilds, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_unit_17_37", referencedColumnName: "idUnit" }])
  idUnit_17: SUnits;

  @ManyToOne(() => SUnits, (sUnits) => sUnits.sFireCardBuilds2, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_unit_21", referencedColumnName: "idUnit" }])
  idUnit: SUnits;

  @ManyToOne(() => SUnits, (sUnits) => sUnits.sFireCardBuilds3, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_unit_6", referencedColumnName: "idUnit" }])
  idUnit_2: SUnits;
}
