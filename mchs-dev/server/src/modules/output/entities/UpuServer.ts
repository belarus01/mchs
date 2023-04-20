import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FK_upu_server_2", ["idUpuServerType"], {})
@Entity("upu_server", { schema: "mchs" })
export class UpuServer {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_upu_server",
    unsigned: true,
  })
  idUpuServer: number;

  @Column("int", {
    name: "id_upu_server_type",
    nullable: true,
    comment: "Тип сервера (СУБД, СП, СВ,.....)",
    unsigned: true,
  })
  idUpuServerType: number | null;

  @Column("int", {
    name: "num_order",
    comment: "Номер по порядку (порядок отображения)",
    default: () => "'1'",
  })
  numOrder: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "Наименование сервера",
    length: 255,
  })
  name: string | null;

  @Column("varchar", {
    name: "ip_addr",
    nullable: true,
    comment: "IP-адрес (???)",
    length: 255,
  })
  ipAddr: string | null;

  @Column("int", {
    name: "id_upu_server_status",
    nullable: true,
    comment:
      "0-плохо (красный) 1-так сабе (жоуты) 2-вс в агне (зилёны), 3-приостановлено",
    unsigned: true,
    default: () => "'0'",
  })
  idUpuServerStatus: number | null;

  @Column("int", { name: "is_ping", default: () => "'0'" })
  isPing: number;

  @Column("int", { name: "is_net", nullable: true, default: () => "'0'" })
  isNet: number | null;

  @Column("int", { name: "is_memory", nullable: true, default: () => "'0'" })
  isMemory: number | null;

  @Column("int", { name: "is_disk", nullable: true, default: () => "'0'" })
  isDisk: number | null;

  @Column("int", { name: "is_box", nullable: true, default: () => "'0'" })
  isBox: number | null;

  @Column("varchar", { name: "status_text", nullable: true, length: 3000 })
  statusText: string | null;

  @Column("timestamp", { name: "date_record", nullable: true })
  dateRecord: Date | null;
}
