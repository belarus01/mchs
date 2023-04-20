import { Column, Entity, Index } from "typeorm";

@Index("IDX_s_ate_reestr", ["idReestr", "active", "dateRecord"], {})
@Entity("s_ate_reestr", { schema: "mchs" })
export class SAteReestr {
  @Column("int", { name: "id_reestr", unsigned: true })
  idReestr: number;

  @Column("bigint", { name: "soato_code", unsigned: true })
  soatoCode: string;

  @Column("int", { name: "id_obl", nullable: true })
  idObl: number | null;

  @Column("int", { name: "id_rayon", nullable: true })
  idRayon: number | null;

  @Column("int", { name: "id_categ", nullable: true, unsigned: true })
  idCateg: number | null;

  @Column("varchar", {
    name: "name_reestr",
    nullable: true,
    comment: " наименование объекта реестра",
    length: 85,
  })
  nameReestr: string | null;

  @Column("int", {
    name: "id_reestr_pre",
    nullable: true,
    comment: "Уникальный идентификатор административного центра",
    unsigned: true,
  })
  idReestrPre: number | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалена,1-действует",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата обновления",
  })
  dateRecord: string | null;

  @Column("date", {
    name: "date_annul",
    nullable: true,
    comment: "Дата аннулирования записи",
  })
  dateAnnul: string | null;
}
