import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SDept } from "./SDept";

@Index("id_obl", ["idObl"], {})
@Index("name_rayon", ["nameRayon"], {})
@Entity("s_ate_rayon", { schema: "mchs" })
export class SAteRayon {
  @PrimaryGeneratedColumn({ type: "int", name: "id_rayon" })
  idRayon: number;

  @Column("int", { name: "id_obl" })
  idObl: number;

  @Column("varchar", {
    name: "name_rayon",
    nullable: true,
    comment: " наименование района",
    length: 25,
  })
  nameRayon: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалена,1-действует",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата обновления",
  })
  dateRecord: string | null;

  @OneToMany(() => SDept, (sDept) => sDept.idRayon2)
  sDepts: SDept[];
}
