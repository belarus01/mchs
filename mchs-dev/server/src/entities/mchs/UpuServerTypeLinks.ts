import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FK_upu_server_type_links1", ["idUpuServerTypeMaster"], {})
@Index("FK_upu_server_type_links2", ["idUpuServerTypeSlave"], {})
@Entity("upu_server_type_links", { schema: "mchs" })
export class UpuServerTypeLinks {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_upu_server_type_links",
    unsigned: true,
  })
  idUpuServerTypeLinks: number;

  @Column("int", {
    name: "id_upu_server_type_master",
    nullable: true,
    unsigned: true,
  })
  idUpuServerTypeMaster: number | null;

  @Column("int", {
    name: "id_upu_server_type_slave",
    nullable: true,
    unsigned: true,
  })
  idUpuServerTypeSlave: number | null;

  @Column("varchar", { name: "descroption", nullable: true, length: 255 })
  descroption: string | null;

  @Column("int", {
    name: "link_type",
    nullable: true,
    comment: "Тип связи (???) (0-логическая, 1-физическая)",
    unsigned: true,
  })
  linkType: number | null;
}
