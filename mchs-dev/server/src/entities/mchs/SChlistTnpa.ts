import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { STnpaDoc } from "./STnpaDoc";
import { SChlistForm } from "./SChlistForm";
import { Users } from "./Users";

@Index("s_chlist_tnpa_FK", ["idDoc"], {})
@Index("s_chlist_tnpa_FK_1", ["idChlistForm"], {})
@Index("s_chlist_tnpa_FK_2", ["uid"], {})
@Entity("s_chlist_tnpa", { schema: "mchs" })
export class SChlistTnpa {
  @Column("bigint", { name: "id_chlist_tnpa", nullable: true, unsigned: true })
  idChlistTnpa: string | null;

  @Column("bigint", {
    name: "id_chlist_form",
    nullable: true,
    comment: "Ид.требования формы чеклиста (для поля field_3)",
    unsigned: true,
  })
  idChlistForm: string | null;

  @Column("bigint", {
    name: "id_doc",
    nullable: true,
    comment: "Ид.части документа, накоторый ссылается поле  field_3",
    unsigned: true,
  })
  idDoc: string | null;

  @Column("date", { name: "date_record", nullable: true })
  dateRecord: string | null;

  @Column("date", { name: "date_begin", nullable: true })
  dateBegin: string | null;

  @Column("date", { name: "date_end", nullable: true })
  dateEnd: string | null;

  @Column("tinyint", {
    name: "active",
    nullable: true,
    comment: "0-удалено, 1 - актив",
    unsigned: true,
  })
  active: number | null;

  @Column("int", { name: "uid", nullable: true, unsigned: true })
  uid: number | null;

  @Column("tinyint", {
    name: "num_order",
    comment: "Порядок отображения при наведении",
    unsigned: true,
    default: () => "'1'",
  })
  numOrder: number;

  @ManyToOne(() => STnpaDoc, (sTnpaDoc) => sTnpaDoc.sChlistTnpas, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_doc", referencedColumnName: "idDoc" }])
  idDoc2: STnpaDoc;

  @ManyToOne(() => SChlistForm, (sChlistForm) => sChlistForm.sChlistTnpas, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "id_chlist_form", referencedColumnName: "idChlistForm" },
  ])
  idChlistForm2: SChlistForm;

  @ManyToOne(() => Users, (users) => users.sChlistTnpas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "uid", referencedColumnName: "uid" }])
  u: Users;
}
