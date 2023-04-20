import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("location", { schema: "mchs" })
export class Location {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id_location",
    unsigned: true,
  })
  idLocation: string;

  @Column("int", { name: "uid", unsigned: true })
  uid: number;

  @Column("varchar", {
    name: "latitude",
    nullable: true,
    comment: "широта",
    length: 100,
  })
  latitude: string | null;

  @Column("varchar", { name: "longitude", nullable: true, length: 100 })
  longitude: string | null;

  @Column("int", {
    name: "id_order_user",
    nullable: true,
    comment: "пацан на задании",
    unsigned: true,
  })
  idOrderUser: number | null;

  @Column("datetime", {
    name: "date_record",
    nullable: true,
    default: () => "'now()'",
  })
  dateRecord: Date | null;
}
