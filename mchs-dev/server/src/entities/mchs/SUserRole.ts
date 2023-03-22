import { Column, Entity } from "typeorm";

@Entity("s_user_role", { schema: "mchs" })
export class SUserRole {
  @Column("tinyint", { primary: true, name: "id_user_role", unsigned: true })
  idUserRole: number;

  @Column("varchar", { name: "role", nullable: true, length: 100 })
  role: string | null;
}
