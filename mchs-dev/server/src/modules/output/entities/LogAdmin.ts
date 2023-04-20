import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("log_admin", { schema: "mchs" })
export class LogAdmin {
  @PrimaryGeneratedColumn({ type: "int", name: "id_log_admin", unsigned: true })
  idLogAdmin: number;

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

  @Column("tinyint", {
    name: "voice_type",
    nullable: true,
    comment: "1-стерео, 2-моно, 3 - статистический",
  })
  voiceType: number | null;

  @Column("tinyint", {
    name: "active",
    nullable: true,
    comment: "Статус контролируемого объекта ",
  })
  active: number | null;

  @Column("datetime", { name: "date_begin", nullable: true })
  dateBegin: Date | null;

  @Column("datetime", { name: "date_end", nullable: true })
  dateEnd: Date | null;

  @Column("varchar", {
    name: "users",
    nullable: true,
    comment: "Назначенные пользователи",
    length: 255,
  })
  users: string | null;

  @Column("varchar", {
    name: "export_tasks",
    nullable: true,
    comment: "Назначенные экспортные задания",
    length: 255,
  })
  exportTasks: string | null;

  @Column("varchar", {
    name: "ligs",
    nullable: true,
    comment: "Список съемников",
    length: 255,
  })
  ligs: string | null;

  @Column("int", { name: "rid", nullable: true })
  rid: number | null;

  @Column("int", { name: "oid", nullable: true })
  oid: number | null;

  @Column("varchar", { name: "rule", nullable: true, length: 255 })
  rule: string | null;

  @Column("varchar", { name: "object", nullable: true, length: 255 })
  object: string | null;
}
