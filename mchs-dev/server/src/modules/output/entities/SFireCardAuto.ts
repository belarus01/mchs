import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_fire_card_auto", { schema: "doc" })
export class SFireCardAuto {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
  idList: string;

  @Column("bigint", { name: "id_card", nullable: true, unsigned: true })
  idCard: string | null;

  @Column("int", { name: "id_dept", nullable: true, unsigned: true })
  idDept: number | null;

  @Column("int", { name: "id_obl", nullable: true, unsigned: true })
  idObl: number | null;

  @Column("bigint", { name: "id_subj", nullable: true, unsigned: true })
  idSubj: string | null;

  @Column("int", {
    name: "num_reg",
    nullable: true,
    comment: "№ по порядку ",
    unsigned: true,
  })
  numReg: number | null;

  @Column("varchar", {
    name: "type_set",
    nullable: true,
    comment: "Вид установки",
    length: 55,
  })
  typeSet: string | null;

  @Column("varchar", {
    name: "type_fire_device",
    nullable: true,
    comment: "Вид огнетушащего средства",
    length: 55,
  })
  typeFireDevice: string | null;

  @Column("varchar", {
    name: "type_start_sys",
    nullable: true,
    comment: "Побудительная система",
    length: 55,
  })
  typeStartSys: string | null;

  @Column("varchar", {
    name: "num_secure_route",
    nullable: true,
    comment: "Количество защищаемых направлений  ?????",
    length: 55,
  })
  numSecureRoute: string | null;

  @Column("date", {
    name: "date_in",
    nullable: true,
    comment: "Дата приемки в эксплуатацию",
  })
  dateIn: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата составления (изменения)",
    default: () => "'now()'",
  })
  dateRecord: string | null;

  @Column("varchar", {
    name: "info",
    nullable: true,
    comment: "доп.инфо",
    length: 255,
  })
  info: string | null;

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
}
