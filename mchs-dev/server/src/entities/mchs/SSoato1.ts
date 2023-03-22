import { Column, Entity } from "typeorm";

@Entity("s_soato1", { schema: "mchs" })
export class SSoato1 {
  @Column("bigint", { name: "soato", unsigned: true, default: () => "'0'" })
  soato: string;

  @Column("varchar", {
    name: "name",
    comment: "Наименование населенного пункта",
    length: 100,
  })
  name: string;

  @Column("varchar", { name: "obl", nullable: true, length: 100 })
  obl: string | null;

  @Column("varchar", { name: "raion", nullable: true, length: 150 })
  raion: string | null;

  @Column("varchar", { name: "sovet", nullable: true, length: 200 })
  sovet: string | null;

  @Column("varchar", { name: "tip", nullable: true, length: 50 })
  tip: string | null;

  @Column("varchar", { name: "gni", nullable: true, length: 50 })
  gni: string | null;

  @Column("date", { name: "datav", nullable: true })
  datav: string | null;

  @Column("varchar", { name: "soaton", nullable: true, length: 50 })
  soaton: string | null;

  @Column("varchar", { name: "datel", nullable: true, length: 50 })
  datel: string | null;

  @Column("varchar", { name: "mal", nullable: true, length: 50 })
  mal: string | null;

  @Column("bigint", { name: "id_soato", unsigned: true, default: () => "'0'" })
  idSoato: string;
}
