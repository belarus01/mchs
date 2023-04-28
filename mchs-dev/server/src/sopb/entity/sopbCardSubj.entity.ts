import { User } from "src/modules/users/user.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SSopbCardSubjState } from "./sopbCardSubjState.entity";
import { SSopbCardSubjList } from "./sopbCardSubjList.entity";
import { SSubj } from "src/modules/subject/entity/subject.entity";

@Index("FK_s_sopb_card_subj_uid", ["uid"], {})
@Index("FK_s_sopb_card_subj_id_subj2", ["idSubj"], {})
@Entity("s_sopb_card_subj", { schema: "mchs" })
export class SSopbCardSubj {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_data", unsigned: true })
  idData: number;

  @Column("bigint", { name: "id_subj", unsigned: true })
  idSubj: number;

  @Column("bigint", {
    name: "id_subj_obj",
    nullable: true,
    comment:
      "Если это поле NULL, то объектов нет и все относится к субъекту (УНП)",
  })
  idSubjObj: number | null;

  @Column("tinyint", {
    name: "fl_proizv",
    nullable: true,
    comment:
      "1.6 Осуществл.виды деят. в отношении СОПБ.Производство 1-да,0-нет",
    unsigned: true,
  })
  flProizv: number | null;

  @Column("tinyint", {
    name: "fl_rozn",
    nullable: true,
    comment:
      "1.6 Осуществл.виды деят. в отношении СОПБ.Розничная торговля 1-да,0-нет",
    unsigned: true,
  })
  flRozn: number | null;

  @Column("tinyint", {
    name: "fl_opt",
    nullable: true,
    comment:
      "1.6 Осуществл.виды деят. в отношении СОПБ.Оптовая торговля 1-да,0-нет",
    unsigned: true,
  })
  flOpt: number | null;

  @Column("datetime", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateRecord: Date | null;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Ид.пользователя, внесшего изменения",
    unsigned: true,
  })
  uid: number | null;

  @Column("tinyint", {
    name: "active",
    comment: "1-активная запись,2 - удалено",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("varchar", {
    name: "name_agent",
    nullable: true,
    comment: "ФИО представителя (от субъекта)",
    length: 255,
  })
  nameAgent: string | null;

  @Column("varchar", {
    name: "job_agent",
    nullable: true,
    comment: "Должность представителя суъекта",
    length: 255,
  })
  jobAgent: string | null;

  @Column("varchar", {
    name: "tel_agent",
    nullable: true,
    comment: "Телефон представителя субъекта",
    length: 55,
  })
  telAgent: string | null;

  @Column("varchar", {
    name: "addr_agent",
    nullable: true,
    comment: "Адрес службы/ответственного",
    length: 255,
  })
  addrAgent: string | null;

  @ManyToOne(() => SSubj, (sSubj) => sSubj.sSopbCardSubjs, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_subj", referencedColumnName: "idSubj" }])
  idSubj2: SSubj;

  @OneToMany(
    () => SSopbCardSubjList,
    (sSopbCardSubjList) => sSopbCardSubjList.idSubjSopb2
  )
  sSopbCardSubjLists: SSopbCardSubjList[];

  @OneToMany(
    () => SSopbCardSubjState,
    (sSopbCardSubjState) => sSopbCardSubjState.idData2
  )
  sSopbCardSubjStates: SSopbCardSubjState[];

  @ManyToOne(() => User, (users) => users.sSopbCardSubjs, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "uid", referencedColumnName: "uid" }])
  u: User;
}
