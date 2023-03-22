import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { LCateg } from "./LCateg";
import { LTypeByCategSpec } from "./LTypeByCategSpec";

@Index("FK_l_type_by_categ_l_categ_id_l_categ", ["idLCateg"], {})
@Entity("l_type_by_categ", { schema: "mchs" })
export class LTypeByCateg {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_l_type_by_categ",
    unsigned: true,
  })
  idLTypeByCateg: number;

  @Column("int", {
    name: "id_l_categ",
    nullable: true,
    comment:
      "Ид.категории протоколирования (действий польз.,действ.админа,мониторинг...)",
    unsigned: true,
  })
  idLCateg: number | null;

  @Column("varchar", { name: "name", nullable: true, length: 85 })
  name: string | null;

  @Column("int", {
    name: "show_type",
    nullable: true,
    comment:
      "1-системный журнал,2_журнал админа,3-журнал оператора,4-системный and админа,5-системный and оператора",
    default: () => "'1'",
  })
  showType: number | null;

  @ManyToOne(() => LCateg, (lCateg) => lCateg.lTypeByCategs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_l_categ", referencedColumnName: "idLCateg" }])
  idLCateg2: LCateg;

  @OneToMany(
    () => LTypeByCategSpec,
    (lTypeByCategSpec) => lTypeByCategSpec.idLTypeByCateg2
  )
  lTypeByCategSpecs: LTypeByCategSpec[];
}
