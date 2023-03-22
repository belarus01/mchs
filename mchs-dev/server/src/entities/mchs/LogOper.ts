import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("log_oper", { schema: "mchs" })
export class LogOper {
  @PrimaryGeneratedColumn({ type: "int", name: "id_log_oper", unsigned: true })
  idLogOper: number;

  @Column("int", {
    name: "id_l_type_by_categ_spec",
    nullable: true,
    comment: "Ид.типа действия",
    unsigned: true,
  })
  idLTypeByCategSpec: number | null;

  @Column("int", {
    name: "id_user",
    nullable: true,
    comment: "Ид.пользователя",
  })
  idUser: number | null;

  @Column("varchar", {
    name: "login",
    nullable: true,
    comment: "Логин пользователя",
    length: 255,
  })
  login: string | null;

  @Column("datetime", {
    name: "date_record",
    nullable: true,
    comment: "Дата операции",
  })
  dateRecord: Date | null;

  @Column("varchar", {
    name: "ip_addr",
    nullable: true,
    comment: "IP-адрес пользователя",
    length: 55,
  })
  ipAddr: string | null;

  @Column("int", { name: "id_dept", nullable: true })
  idDept: number | null;

  @Column("varchar", { name: "number", nullable: true, length: 255 })
  number: string | null;

  @Column("tinyint", {
    name: "number_type",
    nullable: true,
    comment: "1-MSISDN 2-IMSI 3-IMEI 4-не полный",
  })
  numberType: number | null;

  @Column("tinyint", { name: "id_s_call_type", nullable: true })
  idSCallType: number | null;

  @Column("int", { name: "rid", nullable: true })
  rid: number | null;

  @Column("datetime", { name: "date_begin", nullable: true })
  dateBegin: Date | null;

  @Column("mediumint", { name: "duration_call", nullable: true })
  durationCall: number | null;

  @Column("tinyint", {
    name: "is_read",
    nullable: true,
    comment:
      "0-не обработано,1-обработано,2-в работе,3-отложено,4-в сводку,5-важно",
  })
  isRead: number | null;

  @Column("int", { name: "id_call", nullable: true })
  idCall: number | null;

  @Column("varchar", { name: "comment", nullable: true, length: 16 })
  comment: string | null;
}
