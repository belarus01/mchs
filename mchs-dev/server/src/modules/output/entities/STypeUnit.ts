import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("type_unit", ["typeUnit"], {})
@Entity("s_type_unit", { schema: "mchs" })
export class STypeUnit {
  @PrimaryGeneratedColumn({ type: "int", name: "id_type_unit", unsigned: true })
  idTypeUnit: number;

  @Column("varchar", {
    name: "type_unit",
    nullable: true,
    comment:
      "Тип элемента для поля (чекбохс,текстовое поле, кнопки, переключатели )",
    length: 250,
  })
  typeUnit: string | null;

  @Column("varchar", {
    name: "type_unit_script",
    nullable: true,
    comment: "Скрипт для формирования  формы",
    length: 100,
  })
  typeUnitScript: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
  })
  dateRecord: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалено, 1-актино",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("text", { name: "data", nullable: true })
  data: string | null;
}
