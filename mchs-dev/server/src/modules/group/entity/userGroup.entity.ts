//сейчас user-group создан как отдельный модуль, это тут на случай если передумаю и сделаю его частью модуля group
import { User } from "src/modules/users/user.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
//import { Group } from "../group/group.entity";

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
    comment: "Дата окончания действия группы",
  })
  dateEnd: Date | null;

  /*  @ManyToOne(() => Group, (group) => group.userGroups, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_group", referencedColumnName: "idGroup" }])
  idGroup2: Group;

  @ManyToOne(() => User, (users) => users.userGroups, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "uid", referencedColumnName: "uid" }])
  u: User;  */
}
