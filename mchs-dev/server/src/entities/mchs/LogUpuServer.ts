import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { LogMessType } from "./LogMessType";

@Index("FK_l_serv_1", ["idUpuServer"], {})
@Index(
  "FK_log_upu_server_log_mess_type_id_log_mess_type",
  ["idLogMessType"],
  {}
)
@Entity("log_upu_server", { schema: "mchs" })
export class LogUpuServer {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id_log_upu_server",
    unsigned: true,
  })
  idLogUpuServer: string;

  @Column("int", {
    name: "id_upu_server",
    nullable: true,
    comment: "Сервер УПУ",
    unsigned: true,
  })
  idUpuServer: number | null;

  @Column("datetime", {
    name: "date_record",
    nullable: true,
    comment: "Дата и время  получения  сообщения",
  })
  dateRecord: Date | null;

  @Column("varchar", {
    name: "serv_message",
    nullable: true,
    comment: "Сообщение сервера (текст)",
    length: 255,
  })
  servMessage: string | null;

  @Column("int", {
    name: "id_log_mess_type",
    nullable: true,
    comment: "Ид.тип сообщения с уровем критичности",
    unsigned: true,
  })
  idLogMessType: number | null;

  @Column("varchar", { name: "param1", nullable: true, length: 255 })
  param1: string | null;

  @Column("varchar", { name: "param2", nullable: true, length: 255 })
  param2: string | null;

  @Column("int", {
    name: "is_read",
    nullable: true,
    comment: "Флаг прочитан/не прочитан",
  })
  isRead: number | null;

  @ManyToOne(() => LogMessType, (logMessType) => logMessType.logUpuServers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    { name: "id_log_mess_type", referencedColumnName: "idLogMessType" },
  ])
  idLogMessType2: LogMessType;
}
