import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("s_permissions_FK3", ["uid"], {})
@Entity("user_permissions", { schema: "mchs" })
export class UserPermissions {
  @PrimaryGeneratedColumn({ type: "int", name: "id_user_prm", unsigned: true })
  idUserPrm: number;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
  })
  dateRecord: string | null;

  @Column("tinyint", {
    name: "org",
    nullable: true,
    comment: "0-Госпромнадзор МЧС, 1-ГПН МЧС ",
    unsigned: true,
  })
  org: number | null;

  @Column("tinyint", {
    name: "id_user_type",
    comment:
      "Ограничения:   0-админ.АПК КНО,1-админ.подр.,2-рук.подр.,3-пользователь",
    unsigned: true,
    default: () => "'0'",
  })
  idUserType: number;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалено, 1-актино",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, внесший изменения",
    unsigned: true,
  })
  uid: number | null;

  @Column("text", { name: "scr", nullable: true, comment: "скрипт" })
  scr: string | null;

  @ManyToOne(() => Users, (users) => users.userPermissions, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "uid", referencedColumnName: "uid" }])
  u: Users;
}
