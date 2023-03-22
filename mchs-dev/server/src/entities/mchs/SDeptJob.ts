import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("FK_dept1", ["uid"], {})
@Entity("s_dept_job", { schema: "mchs" })
export class SDeptJob {
  @PrimaryGeneratedColumn({ type: "int", name: "id_dept_job", unsigned: true })
  idDeptJob: number;

  @Column("varchar", {
    name: "job",
    nullable: true,
    comment: "Наименование должности",
    length: 120,
  })
  job: string | null;

  @Column("datetime", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateRecord: Date | null;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Ид.пользователя, внесшего изменения",
    unsigned: true,
  })
  uid: number | null;

  @Column("tinyint", {
    name: "active",
    comment: "1-активная запись,0 - удалено",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("tinyint", {
    name: "org",
    nullable: true,
    comment: "0-надзорники,1-пожарники",
    unsigned: true,
  })
  org: number | null;

  @OneToMany(() => Users, (users) => users.idDeptJob)
  users: Users[];
}
