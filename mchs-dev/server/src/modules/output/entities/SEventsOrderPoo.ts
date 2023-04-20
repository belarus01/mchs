import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FK_s_events_order_obj_danger_id_obj_order", ["idEventOrder"], {})
@Index("FK_s_events_order_obj_poo_id_poo", ["idPoo"], {})
@Entity("s_events_order_poo", { schema: "mchs" })
export class SEventsOrderPoo {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
  idList: string;

  @Column("bigint", { name: "id_event_order", unsigned: true })
  idEventOrder: string;

  @Column("int", {
    name: "id_poo",
    comment: "id  из doc: s_poo",
    unsigned: true,
  })
  idPoo: number;

  @Column("varchar", {
    name: "name_obj",
    nullable: true,
    comment: "наименование, марка и др.сведения",
    length: 550,
  })
  nameObj: string | null;

  @Column("date", {
    name: "date_reg_poo",
    nullable: true,
    comment: "Дата регистрации ПОО",
  })
  dateRegPoo: string | null;

  @Column("date", {
    name: "date_unreg_poo",
    nullable: true,
    comment: "Дата снятия оборудования с учета",
  })
  dateUnregPoo: string | null;

  @Column("date", {
    name: "date_from",
    nullable: true,
    comment: "Дата ввода в эксплуатацию",
  })
  dateFrom: string | null;

  @Column("date", {
    name: "date_demont",
    nullable: true,
    comment: "Дата демонтажа(списания) оборудования",
  })
  dateDemont: string | null;

  @Column("int", {
    name: "num_element",
    nullable: true,
    comment: "Количество однотипных единиц (кранов, установок...)",
    unsigned: true,
  })
  numElement: number | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения",
  })
  dateRecord: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "1-действует,2-удалена,",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Ид.пользователя,изменившего запись",
    unsigned: true,
  })
  uid: number | null;

  @Column("varchar", {
    name: "comm",
    nullable: true,
    comment: "https://gospromnadzor.mchs.gov.by/novosti/303765/",
    length: 655,
  })
  comm: string | null;

  @Column("tinyint", {
    name: "type_abcd",
    nullable: true,
    comment:
      "0-ПБ.брать id_list из doc.s_poo_subj_pb;1-ПОГ. брать id_list из doc.s_poп_subj_auto;2-ПОГ. брать id_list из doc.s_poп_subj_avia;3-doc.s_poп_subj_rw;4-doc.s_poп_subj_water",
    unsigned: true,
  })
  typeAbcd: number | null;
}
