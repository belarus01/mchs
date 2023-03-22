import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FK_ewyru", ["idLTypeByCategSpec"], {})
@Entity("log_admin_operation", { schema: "mchs" })
export class LogAdminOperation {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_log_admin_operation",
    unsigned: true,
  })
  idLogAdminOperation: number;

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

  @Column("longtext", { name: "data_info", nullable: true, comment: "Текст" })
  dataInfo: string | null;

  @Column("varchar", {
    name: "ip_addr",
    nullable: true,
    comment: "IP-адрес пользователя",
    length: 55,
  })
  ipAddr: string | null;

  @Column("varchar", { name: "short_text", nullable: true, length: 255 })
  shortText: string | null;

  @Column("int", { name: "id_dept", nullable: true })
  idDept: number | null;
}
