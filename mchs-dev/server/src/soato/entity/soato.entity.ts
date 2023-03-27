import { SSubj } from "src/modules/subject/entity/subject.entity";
import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";

  
  @Index("soato", ["soato"], {})
  @Entity("s_soato", { schema: "mchs" })
  export class SSoato {
    @Column("bigint", { name: "soato", unsigned: true, default: () => "'0'" })
    soato: number;
  
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
    datav: Date | null;
  
    @Column("varchar", { name: "soaton", nullable: true, length: 50 })
    soaton: string | null;
  
    @Column("varchar", { name: "datel", nullable: true, length: 50 })
    datel: string | null;
  
    @Column("varchar", { name: "mal", nullable: true, length: 50 })
    mal: string | null;
  
    @PrimaryGeneratedColumn({ type: "bigint", name: "id_soato", unsigned: true })
    idSoato: number;
  
    /* @OneToMany(() => SSubj, (sSubj) => sSubj.idSoato2)
    sSubjs: SSubj[]; */
  }
  