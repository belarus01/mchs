import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SEventsOrder } from "../events/entity/eventsOrder.entity";
import { UserGroup } from "./entity/userGroup.entity";
//import { UserGroup } from "../userGroup/user-group.entity";


@Entity("group", { schema: "mchs" })
export class Group {
  @PrimaryGeneratedColumn({ type: "int", name: "id_group", unsigned: true })
  idGroup: number;

  @Column("tinyint", {
    name: "org",
    nullable: true,
    comment: "0-госнадзор,1-пожарники",
    unsigned: true,
  })
  org: number | null;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name: string | null;

  @Column("int", { name: "id_dept", nullable: true })
  idDept: number | null;

  @Column("tinyint", {
    name: "active",
    nullable: true,
    comment: "0-неактивно,1-активно,2-удален,",
    unsigned: true,
    default: () => "'1'",
  })
  active: number | null;

  @Column("datetime", {
    name: "date_record",
    nullable: true,
    default: () => "'now()'",
  })
  dateRecord: Date | null;

  @Column("bigint", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, внесший изменения",
    unsigned: true,
  })
  uid: number | null;

  @OneToMany(() => SEventsOrder, (sEventsOrder) => sEventsOrder.idGroup, {cascade: true})
  sEventsOrders: SEventsOrder[];

  @OneToMany(() => UserGroup, (userGroup) => userGroup.idGroup2, {cascade: true, eager: true})
  //@JoinColumn([{name: "id_group", referencedColumnName: "id_group"}])//createSmth
  userGroups: UserGroup[];
}
