/* import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "../group/group.entity";
import { User } from "../users/user.entity";

@Index("user_group_FK", ["idGroup"], {})
@Index("user_group_FK_1", ["uid"], {})
@Index("FK_user_group_uid_gr", ["uidGr"], {})
@Entity("user_group", { schema: "mchs" })
export class UserGroup {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_user_group",
    comment: "0-Госпромнадзор,1-пожарники",
  })
  idUserGroup: number;

  @Column("int", { name: "id_group", unsigned: true })
  idGroup: number;

  @Column("int", {
    name: "uid_gr",
    nullable: true,
    comment: "Пользователь, включенный в состав группы",
    unsigned: true,
  })
  uidGr: number | null;

  @Column("int", {
    name: "uid",
    comment: "Пользователь, изменивший запись",
    unsigned: true,
  })
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

  @Column("tinyint", { name: "org", nullable: true, unsigned: true })
  org: number | null;

  @ManyToOne(() => Group, (group) => group.userGroups, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_group", referencedColumnName: "idGroup" }])
  idGroup2: Group;

  @ManyToOne(() => User, (users) => users.userGroups, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "uid_gr", referencedColumnName: "uid" }])
  uidGr2: User;
} */
