import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("task_data", { schema: "mchs" })
export class TaskData {
  @PrimaryGeneratedColumn({ type: "int", name: "id_task_data", unsigned: true })
  idTaskData: number;

  @Column("int", {
    name: "id_user",
    nullable: true,
    comment: "пользователь, установивший задание",
    unsigned: true,
  })
  idUser: number | null;

  @Column("varchar", {
    name: "task_name",
    nullable: true,
    comment: "Название задачи",
    length: 255,
  })
  taskName: string | null;

  @Column("datetime", {
    name: "date_record",
    nullable: true,
    comment: "Дата постановки задачи",
  })
  dateRecord: Date | null;

  @Column("datetime", {
    name: "date_begin",
    nullable: true,
    comment: "Дата, с которой начать выполнение задания",
  })
  dateBegin: Date | null;

  @Column("datetime", {
    name: "date_end",
    nullable: true,
    comment: "Дата окончания выполнения задания",
  })
  dateEnd: Date | null;

  @Column("datetime", {
    name: "date_last_run",
    nullable: true,
    comment: "Дата последнего запуска",
  })
  dateLastRun: Date | null;

  @Column("int", {
    name: "period_type",
    nullable: true,
    comment: "1-час 2-день 3-неделя 4-месяц 5-год",
  })
  periodType: number | null;

  @Column("int", { name: "period", nullable: true, comment: "Номер периода" })
  period: number | null;

  @Column("int", {
    name: "id_task_type",
    comment: "Тип задания",
    unsigned: true,
  })
  idTaskType: number;

  @Column("int", { name: "id_upu", nullable: true, unsigned: true })
  idUpu: number | null;

  @Column("int", {
    name: "id_upu_server",
    nullable: true,
    comment: "Сервер УПУ",
    unsigned: true,
  })
  idUpuServer: number | null;

  @Column("text", {
    name: "data",
    nullable: true,
    comment: "настройки задания в JSON",
  })
  data: string | null;

  @Column("int", {
    name: "id_task_status",
    nullable: true,
    comment: "Текущий статус выполнения задания",
    unsigned: true,
  })
  idTaskStatus: number | null;

  @Column("text", {
    name: "result",
    nullable: true,
    comment:
      "Результат выполнения задания (напр.:выполнение прервано пользователем;сообщение сервера об ошибке)",
  })
  result: string | null;
}
