import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SChlistTnpa } from "./chlistTnpa.entity";


@Index("FK_s_chlist", ["idChlist"], {})
@Index("type_unit1_FK", ["idTypeUnit1"], {})
@Index("type_unit2_FK", ["idTypeUnit2"], {})
@Index("type_unit3_FK", ["idTypeUnit3"], {})
@Index("type_unit4_6_FK", ["idTypeUnit4_6"], {})
@Index("type_unit7_FK", ["idTypeUnit7"], {})
@Entity("s_chlist_form", { schema: "mchs" })
export class SChlistForm {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id_chlist_form",
    unsigned: true,
  })
  idChlistForm: number;

  @Column("int", { name: "id_chlist", unsigned: true })
  idChlist: number;

  @Column("varchar", {
    name: "field_1",
    nullable: true,
    comment: "Порядковый номер ",
    length: 550,
  })
  field_1: string | null;

  @Column("int", {
    name: "id_type_unit1",
    nullable: true,
    comment:
      "Тип элемента для поля index_num (чекбохс,текстовое поле, кнопки, переключатели )",
    unsigned: true,
  })
  idTypeUnit1: number | null;

  @Column("varchar", {
    name: "field_2",
    nullable: true,
    comment: "Предъявляемое требование",
    length: 2500,
  })
  field_2: string | null;

  @Column("int", {
    name: "id_type_unit2",
    nullable: true,
    comment: "Тип элемента для поля name_requir",
    unsigned: true,
  })
  idTypeUnit2: number | null;

  @Column("varchar", {
    name: "field_3",
    nullable: true,
    comment: "Структурные элементы нормативных правовых актов",
    length: 1000,
  })
  field_3: string | null;

  @Column("int", {
    name: "id_type_unit3",
    nullable: true,
    comment: "Тип элемента для поля name_normative",
    unsigned: true,
  })
  idTypeUnit3: number | null;

  @Column("varchar", {
    name: "field_4",
    nullable: true,
    comment: "Да",
    length: 50,
  })
  field_4: string | null;

  @Column("varchar", {
    name: "field_5",
    nullable: true,
    comment: "Нет",
    length: 50,
  })
  field_5: string | null;

  @Column("varchar", {
    name: "field_6",
    nullable: true,
    comment: "Не требуется",
    length: 50,
  })
  field_6: string | null;

  @Column("int", {
    name: "id_type_unit4_6",
    nullable: true,
    comment: "Тип элемента для полей Да,Нет,Не требуется",
    unsigned: true,
  })
  idTypeUnit4_6: number | null;

  @Column("text", { name: "field_7", nullable: true, comment: "Примечание" })
  field_7: string | null;

  @Column("int", {
    name: "id_type_unit7",
    nullable: true,
    comment: "Тип элемента для поля Примечание",
    unsigned: true,
  })
  idTypeUnit7: number | null;

  @Column("text", {
    name: "field_8",
    nullable: true,
    comment: "Количественный показатель",
  })
  field_8: string | null;

  @Column("int", {
    name: "id_type_unit8",
    nullable: true,
    comment: "Тип элемента для поля Количественный показатель",
    unsigned: true,
  })
  idTypeUnit8: number | null;

  @Column("datetime", { name: "date_begin", nullable: true, comment: "Начало" })
  dateBegin: Date | null;

  @Column("datetime", {
    name: "date_end",
    nullable: true,
    comment: "Дата окончания действия",
  })
  dateEnd: Date | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
  })
  dateRecord: Date | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалено, 1-актино",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @OneToMany(() => SChlistTnpa, (sChlistTnpa) => sChlistTnpa.idChlistForm2)
  sChlistTnpas: SChlistTnpa[];
}
