import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("user_group_FK", ["idGroup"], {})
@Index("user_group_FK_1", ["uid"], {})
@Entity("user_group", { schema: "mchs" })
export class UserGroup {
  @PrimaryGeneratedColumn({ type: "int", name: "id_user_group" })
  idUserGroup: number;

  @Column("int", { name: "id_group", unsigned: true })
  idGroup: number;

  @Column("int", { name: "uid", unsigned: true })
  uid: number;

  @Column("tinyint", {
    name: "active",
    nullable: true,
    comment: "0-неактивн.1-активн..2-удален",
    unsigned: true,
    default: () => "'1'",
  })
  active: number | null;

  @Column("datetime", {
    name: "date_record",
    comment: "Дата внесения изменения",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateRecord: Date;

  @Column("datetime", {
    name: "date_begin",
    nullable: true,
    comment: "Начало времени действия группы",
  })
  dateBegin: Date | null;

  @Column("datetime", {
    name: "date_end",
    nullable: true,
    comment: "Дата окончания действия груупы",
  })
  dateEnd: Date | null;

  @Column("tinyint", {
    name: "type_user",
    nullable: true,
    comment:
      "0-должн.лицо, направившее чек-лист,1-руководитель группы,2-исполнитель,3-Гл.государтвенный инспектор региона по пожарному надзору",
  })
  typeUser: number | null;
}
