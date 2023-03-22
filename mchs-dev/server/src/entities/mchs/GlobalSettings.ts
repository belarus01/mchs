import { Column, Entity } from "typeorm";

@Entity("global_settings", { schema: "mchs" })
export class GlobalSettings {
  @Column("varchar", { primary: true, name: "id", length: 20 })
  id: string;

  @Column("varchar", { name: "value", nullable: true, length: 4000 })
  value: string | null;
}
