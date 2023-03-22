import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("exams", { schema: "mchs" })
export class Exams {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_exam", unsigned: true })
  idExam: string;

  @Column("bigint", { name: "uid", unsigned: true })
  uid: string;

  @Column("int", { name: "id_subj", unsigned: true })
  idSubj: number;

  @Column("date", {
    name: "date_exam",
    nullable: true,
    comment: "Дата экзамена/проверки знаний",
  })
  dateExam: string | null;

  @Column("varchar", {
    name: "staff",
    nullable: true,
    comment: "ФИО представителя субъекта",
    length: 250,
  })
  staff: string | null;

  @Column("varchar", {
    name: "staff_tel",
    nullable: true,
    comment: "контактный телефон представителя субъекта",
    length: 100,
  })
  staffTel: string | null;

  @Column("varchar", {
    name: "staff_post",
    nullable: true,
    comment: "Должность представителя субъекта",
    length: 200,
  })
  staffPost: string | null;

  @Column("varchar", {
    name: "major",
    nullable: true,
    comment: "ФИО ответственного за всё на  субъекте",
    length: 250,
  })
  major: string | null;

  @Column("varchar", {
    name: "major_tel",
    nullable: true,
    comment: "контактный телефон ответственного за всё на  субъекте",
    length: 100,
  })
  majorTel: string | null;

  @Column("varchar", {
    name: "major_post",
    nullable: true,
    comment: "Должность ответственного за всё на  субъекте",
    length: 200,
  })
  majorPost: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата внесения изменения в запись",
  })
  dateRecord: string | null;
}
