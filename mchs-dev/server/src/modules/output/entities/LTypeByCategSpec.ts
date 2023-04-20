import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { LTypeByCateg } from "./LTypeByCateg";

@Index(
  "FK_l_type_by_categ_spec_l_type_by_categ_id_l_type_by_categ",
  ["idLTypeByCateg"],
  {}
)
@Entity("l_type_by_categ_spec", { schema: "mchs" })
export class LTypeByCategSpec {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_l_type_by_categ_spec",
    unsigned: true,
  })
  idLTypeByCategSpec: number;

  @Column("int", { name: "id_l_type_by_categ", nullable: true, unsigned: true })
  idLTypeByCateg: number | null;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("int", {
    name: "show_type",
    nullable: true,
    comment:
      "1-системный журнал,2_журнал админа,3-журнал оператора,4-системный and админа,5-системный anl оператора",
    default: () => "'1'",
  })
  showType: number | null;

  @ManyToOne(
    () => LTypeByCateg,
    (lTypeByCateg) => lTypeByCateg.lTypeByCategSpecs,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "id_l_type_by_categ", referencedColumnName: "idLTypeByCateg" },
  ])
  idLTypeByCateg2: LTypeByCateg;
}
