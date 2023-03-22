import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LogUpuServer } from "./LogUpuServer";

@Entity("log_mess_type", { schema: "mchs" })
export class LogMessType {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_log_mess_type",
    unsigned: true,
  })
  idLogMessType: number;

  @Column("tinyint", {
    name: "is_critical",
    nullable: true,
    comment: "Флаг критичности сообщения",
    unsigned: true,
  })
  isCritical: number | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "Наименование",
    length: 255,
  })
  name: string | null;

  @OneToMany(() => LogUpuServer, (logUpuServer) => logUpuServer.idLogMessType2)
  logUpuServers: LogUpuServer[];
}
