import { SEventsOrderObj } from "src/modules/events/entity/eventsOrderObj.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_type_test", { schema: "mchs" })
export class STypeTest {
  @PrimaryGeneratedColumn({ type: "int", name: "id_type_test", unsigned: true })
  idTypeTest: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "Наименование нарушения в имен.падеже ",
    length: 250,
  })
  name: string | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-Госнадзор, 1-пожарники,2-все",
    unsigned: true,
    default: () => "'1'",
  })
  org: number;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
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

  @OneToMany(
    () => SEventsOrderObj,
    (sEventsOrderObj) => sEventsOrderObj.idTypeTest2
  )
  sEventsOrderObjs: SEventsOrderObj[];
}
