import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("task_result", { schema: "mchs" })
export class TaskResult {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_task_result",
    unsigned: true,
  })
  idTaskResult: number;

  @Column("int", { name: "id_task", comment: "Задание", unsigned: true })
  idTask: number;

  @Column("text", {
    name: "result",
    nullable: true,
    comment: "Результат выполнения (напр.:сообщение сервера об ошибке )",
  })
  result: string | null;

  @Column("datetime", {
    name: "date_begin",
    nullable: true,
    comment: "Дата начала выполнения задания",
  })
  dateBegin: Date | null;

  @Column("datetime", {
    name: "date_end",
    nullable: true,
    comment: "Дата окончания выполнения задания",
  })
  dateEnd: Date | null;

  @Column("tinyint", {
    name: "id_task_result_status",
    nullable: true,
    comment:
      "Результат выполнения задания (0-не выполнено,1-успешно, 2-выполнено с ошибкой,3-остановлено пользователем,4-ожидает sleep)",
    unsigned: true,
  })
  idTaskResultStatus: number | null;
}
