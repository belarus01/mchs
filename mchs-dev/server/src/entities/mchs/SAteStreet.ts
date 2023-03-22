import { Column, Entity, Index } from "typeorm";

@Index(
  "s_ate_street_id_street_IDX",
  ["idReestr", "idStreet", "idTipeStreet", "soatoCode"],
  { unique: true }
)
@Index("name_rus", ["nameRus"], {})
@Index("obl", ["obl"], {})
@Index("rayon", ["rayon"], {})
@Index("name_reestr", ["nameReestr"], {})
@Entity("s_ate_street", { schema: "mchs" })
export class SAteStreet {
  @Column("bigint", {
    name: "soato_code",
    comment: "Код СОАТО (связь с таблицей s_soato)",
    unsigned: true,
  })
  soatoCode: string;

  @Column("int", {
    name: "id_reestr",
    nullable: true,
    comment:
      "идентификатор административно-территориальн.единицыs(Идентификатор АТЕ)",
    unsigned: true,
  })
  idReestr: number | null;

  @Column("varchar", {
    name: "obl",
    nullable: true,
    comment: "Область",
    length: 55,
  })
  obl: string | null;

  @Column("varchar", {
    name: "rayon",
    nullable: true,
    comment: "Район",
    length: 155,
  })
  rayon: string | null;

  @Column("varchar", {
    name: "sovet",
    nullable: true,
    comment: "Сельсовет",
    length: 155,
  })
  sovet: string | null;

  @Column("varchar", {
    name: "name_categ",
    nullable: true,
    comment: "Категория",
    length: 8,
  })
  nameCateg: string | null;

  @Column("varchar", {
    name: "name_reestr",
    nullable: true,
    comment: " Населённый пункт.наименование объекта реестра из s_ate_reestr",
    length: 85,
  })
  nameReestr: string | null;

  @Column("int", {
    name: "id_tipe_street",
    nullable: true,
    comment: " Идентификатор вида",
    unsigned: true,
  })
  idTipeStreet: number | null;

  @Column("varchar", {
    name: "name_tipe_street",
    nullable: true,
    comment: " Вид",
    length: 55,
  })
  nameTipeStreet: string | null;

  @Column("bigint", {
    name: "id_street",
    nullable: true,
    comment: "Идентификатор элемента",
    unsigned: true,
  })
  idStreet: string | null;

  @Column("varchar", {
    name: "name_rus",
    nullable: true,
    comment:
      "Наименование элемента(улицы, переулка, площади....) на русском яз.",
    length: 155,
  })
  nameRus: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалена,1-действует",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("date", {
    name: "date_registr",
    nullable: true,
    comment: "Дата регистрации",
  })
  dateRegistr: string | null;

  @Column("date", {
    name: "date_annul",
    nullable: true,
    comment: "Дата аннулирования",
  })
  dateAnnul: string | null;
}
