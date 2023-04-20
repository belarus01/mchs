import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SSubj } from "./SSubj";

@Entity("s_vedomstva", { schema: "mchs" })
export class SVedomstva {
  @PrimaryGeneratedColumn({ type: "int", name: "id_ved", unsigned: true })
  idVed: number;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("int", { name: "uid", nullable: true, unsigned: true })
  uid: number | null;

  @Column("date", { name: "date_record", nullable: true })
  dateRecord: string | null;

  @OneToMany(() => SSubj, (sSubj) => sSubj.idVed2)
  sSubjs: SSubj[];
}
