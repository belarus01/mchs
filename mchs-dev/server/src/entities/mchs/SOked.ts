import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_oked", { schema: "mchs" })
export class SOked {
  @PrimaryGeneratedColumn({ type: "int", name: "id_oked", unsigned: true })
  idOked: number;

  @Column("int", {
    name: "id_oked_parent",
    nullable: true,
    comment: "ид.родительской записи",
    unsigned: true,
  })
  idOkedParent: number | null;

  @Column("varchar", {
    name: "section",
    comment: "код ВЭД вида экономической деятельности",
    length: 8,
    default: () => "'1'",
  })
  section: string;

  @Column("varchar", {
    name: "name_oked",
    nullable: true,
    comment: "наименование вида экономической деятельности",
    length: 120,
  })
  nameOked: string | null;

  @Column("tinyint", {
    name: "level_section",
    comment: "уровень  вида экономической деятельности",
    unsigned: true,
    default: () => "'1'",
  })
  levelSection: number;

  @Column("date", {
    name: "date_begin",
    nullable: true,
    comment: "Дата начала действия",
  })
  dateBegin: string | null;

  @Column("date", {
    name: "date_end",
    nullable: true,
    comment: "Дата окончания действия",
  })
  dateEnd: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения",
  })
  dateRecord: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалена,1-действует",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Ид.пользователя,изменившего запись",
    unsigned: true,
  })
  uid: number | null;
}
