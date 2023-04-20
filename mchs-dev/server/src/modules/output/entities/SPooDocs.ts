import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SPooSubjPb } from "./SPooSubjPb";

@Entity("s_poo_docs", { schema: "doc" })
export class SPooDocs {
  @PrimaryGeneratedColumn({ type: "int", name: "id_num_reg", unsigned: true })
  idNumReg: number;

  @Column("int", {
    name: "id_poo",
    nullable: true,
    comment: "ссылка на id_poo",
    unsigned: true,
  })
  idPoo: number | null;

  @Column("varchar", {
    name: "num_reg",
    nullable: true,
    comment: "№ журнала регистра-ции ПОО",
    length: 25,
  })
  numReg: string | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "наименование документа",
    length: 3400,
  })
  name: string | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-Госнадзор, 1-пожарники",
    unsigned: true,
    default: () => "'0'",
  })
  org: number;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
    default: () => "'now()'",
  })
  dateRecord: string | null;

  @Column("date", {
    name: "date_begin",
    nullable: true,
    comment: "Дата начала действия записи",
  })
  dateBegin: string | null;

  @Column("date", {
    name: "date_end",
    nullable: true,
    comment: "Дата окончания действия записи",
  })
  dateEnd: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалено, 1-активно",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, изменивший запись",
    unsigned: true,
  })
  uid: number | null;

  @OneToMany(() => SPooSubjPb, (sPooSubjPb) => sPooSubjPb.idNumReg2)
  sPooSubjPbs: SPooSubjPb[];
}
