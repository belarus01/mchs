import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SChlistTnpa } from "./SChlistTnpa";
import { STnpaStrElem } from "./STnpaStrElem";
import { STnpaList } from "./STnpaList";

@Index("FK_s_tnpa_doc_id_list", ["idList"], {})
@Index("FK_s_tnpa_doc_id_elem", ["idElem"], {})
@Entity("s_tnpa_doc", { schema: "mchs" })
export class STnpaDoc {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_doc", unsigned: true })
  idDoc: string;

  @Column("int", {
    name: "id_list",
    nullable: true,
    comment: "Ссылка на название документа",
    unsigned: true,
  })
  idList: number | null;

  @Column("int", {
    name: "id_elem",
    nullable: true,
    comment: "тип элемента(статья, глава пункт)",
    unsigned: true,
  })
  idElem: number | null;

  @Column("varchar", {
    name: "num",
    nullable: true,
    comment: "номер пункта(подпункта)",
    length: 25,
  })
  num: string | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "Текст",
    length: 1550,
  })
  name: string | null;

  @Column("bigint", {
    name: "id_doc_parent",
    nullable: true,
    comment: "Родительская принадлежность",
    unsigned: true,
  })
  idDocParent: string | null;

  @Column("tinyint", {
    name: "num_link",
    nullable: true,
    comment: "номер ссылки в списке ссылок ЧЕК-ЛИСТА",
    unsigned: true,
  })
  numLink: number | null;

  @Column("date", {
    name: "date_begin",
    nullable: true,
    comment: "Дата начала действия",
  })
  dateBegin: string | null;

  @Column("date", {
    name: "date_end",
    nullable: true,
    comment: "Дата окончания действия",
  })
  dateEnd: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения",
  })
  dateRecord: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалена,1-действует",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("tinyint", {
    name: "org",
    comment: "1-пожарники,0-надзорники",
    unsigned: true,
    default: () => "'1'",
  })
  org: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Ид.пользователя,изменившего запись",
    unsigned: true,
  })
  uid: number | null;

  @OneToMany(() => SChlistTnpa, (sChlistTnpa) => sChlistTnpa.idDoc2)
  sChlistTnpas: SChlistTnpa[];

  @ManyToOne(() => STnpaStrElem, (sTnpaStrElem) => sTnpaStrElem.sTnpaDocs, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_elem", referencedColumnName: "idElem" }])
  idElem2: STnpaStrElem;

  @ManyToOne(() => STnpaList, (sTnpaList) => sTnpaList.sTnpaDocs, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_list", referencedColumnName: "idList" }])
  idList2: STnpaList;
}
