import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SQuestion } from "./SQuestion";

@Index("FK_s_event_que_id_que", ["idQue"], {})
@Index("FK_s_event_que_id_event", ["idEventOrder"], {})
@Entity("s_event_que", { schema: "doc" })
export class SEventQue {
  @PrimaryGeneratedColumn({ type: "int", name: "id_ev_que", unsigned: true })
  idEvQue: number;

  @Column("bigint", {
    name: "id_event_order",
    comment: "Мероприятие ",
    unsigned: true,
    default: () => "'1'",
  })
  idEventOrder: string;

  @Column("int", {
    name: "id_que",
    nullable: true,
    comment: "Вопрос к мероприятию",
    unsigned: true,
  })
  idQue: number | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-Госнадзор, 1-пожарники,2-ГУБОП",
    unsigned: true,
    default: () => "'1'",
  })
  org: number;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
  })
  dateRecord: string | null;

  @Column("date", {
    name: "date_begin",
    nullable: true,
    comment: "Дата начала действия записи",
  })
  dateBegin: string | null;

  @Column("date", {
    name: "date_end",
    nullable: true,
    comment: "Дата окончания действия записи",
  })
  dateEnd: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалено, 1-активно",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, изменивший запись",
    unsigned: true,
  })
  uid: number | null;

  @ManyToOne(() => SQuestion, (sQuestion) => sQuestion.sEventQues, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_que", referencedColumnName: "idQue" }])
  idQue2: SQuestion;
}
