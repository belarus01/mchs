import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SSubjLicDate } from "./SSubjLicDate";

@Entity("s_subj_lic", { schema: "mchs" })
export class SSubjLic {
  @PrimaryGeneratedColumn({ type: "int", name: "id_lic", unsigned: true })
  idLic: number;

  @Column("varchar", {
    name: "name_organ",
    nullable: true,
    comment: "Наименование органа, выдавшего лицензию ",
    length: 250,
  })
  nameOrgan: string | null;

  @Column("varchar", {
    name: "vid_deiat",
    nullable: true,
    comment: "Вид деятельности ",
    length: 250,
  })
  vidDeiat: string | null;

  @Column("bigint", { name: "id_subj", nullable: true, unsigned: true })
  idSubj: string | null;

  @Column("varchar", {
    name: "name_subj",
    nullable: true,
    comment: "Наименование лицензиата ",
    length: 250,
  })
  nameSubj: string | null;

  @Column("varchar", {
    name: "unp",
    nullable: true,
    comment: "УНП ",
    length: 25,
  })
  unp: string | null;

  @Column("tinyint", {
    name: "type_lic",
    nullable: true,
    comment:
      "0-лицензия ЕРЛ,1-разрешение(свидетельство Госпромнадзора),2-декларация о промышленной безоп.ОПО",
    unsigned: true,
    default: () => "'1'",
  })
  typeLic: number | null;

  @Column("varchar", {
    name: "addr",
    nullable: true,
    comment: "Местонахождение лицензиата ",
    length: 250,
  })
  addr: string | null;

  @Column("varchar", {
    name: "num",
    nullable: true,
    comment:
      "№лицензии (type_lic=0) №разрешения (type_lic=1)\r\n№декларации ОПО(type_lic=2) ",
    length: 85,
  })
  num: string | null;

  @Column("varchar", {
    name: "num_erl",
    nullable: true,
    comment: "Номер лицензии в ЕРЛ",
    length: 85,
  })
  numErl: string | null;

  @Column("varchar", {
    name: "num_resh",
    nullable: true,
    comment: "Номер принятия решения о выдаче лицензии",
    length: 85,
  })
  numResh: string | null;

  @Column("date", {
    name: "date_resh",
    nullable: true,
    comment:
      "Дата принятия решения о выдаче лицензии;Дата разработки (пересмотра)декларации ОПО",
  })
  dateResh: string | null;

  @Column("date", {
    name: "date_erl",
    nullable: true,
    comment: "Дата добавления в ЕРЛ",
  })
  dateErl: string | null;

  @Column("date", { name: "date_from", nullable: true, comment: "Дата выдачи" })
  dateFrom: string | null;

  @Column("date", {
    name: "date_to",
    nullable: true,
    comment: "Дата окончания ",
  })
  dateTo: string | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-Госнадзор, 1-пожарники,2-ГУБОП",
    unsigned: true,
    default: () => "'0'",
  })
  org: number;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
  })
  dateRecord: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "Статус лицензии 0-остановлена, 1-активно,2-удалена",
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

  @OneToMany(() => SSubjLicDate, (sSubjLicDate) => sSubjLicDate.idLic2)
  sSubjLicDates: SSubjLicDate[];
}
