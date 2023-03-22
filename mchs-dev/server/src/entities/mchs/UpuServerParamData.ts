import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("upu_server_param_data", { schema: "mchs" })
export class UpuServerParamData {
  @PrimaryGeneratedColumn({ type: "int", name: "id_data", unsigned: true })
  idData: number;

  @Column("int", { name: "id_param", unsigned: true })
  idParam: number;

  @Column("int", {
    name: "id_upu_server",
    nullable: true,
    comment: "Сервер",
    unsigned: true,
  })
  idUpuServer: number | null;

  @Column("varchar", {
    name: "param_data",
    nullable: true,
    comment: "Данные",
    length: 255,
  })
  paramData: string | null;

  @Column("timestamp", { name: "date_record", nullable: true })
  dateRecord: Date | null;

  @Column("varchar", {
    name: "comm",
    nullable: true,
    comment: "Комментарций",
    length: 255,
  })
  comm: string | null;
}
