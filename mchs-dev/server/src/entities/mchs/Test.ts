import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("test", { schema: "mchs" })
export class Test {
  @PrimaryGeneratedColumn({ type: "int", name: "id_test" })
  idTest: number;

  @Column("varchar", { name: "com", nullable: true, length: 255 })
  com: string | null;

  @Column("datetime", {
    name: "date_record",
    nullable: true,
    default: () => "'now()'",
  })
  dateRecord: Date | null;

  @Column("decimal", {
    name: "size",
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "'12220.12'",
  })
  size: string | null;
}
