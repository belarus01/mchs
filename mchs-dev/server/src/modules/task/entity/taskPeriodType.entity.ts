import { Column, Entity } from "typeorm";

@Entity("task_period_type", { schema: "mchs" })
export class TaskPeriodType {
  @Column("tinyint", { primary: true, name: "id_task_period", unsigned: true })
  idTaskPeriod: number;

  @Column("char", { name: "value", length: 20 })
  value: string;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name: string | null;
}