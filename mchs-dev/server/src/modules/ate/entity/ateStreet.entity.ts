import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("name_reestr", ["nameReestr"], {})
@Index("name_rus", ["nameRus"], {})
@Index("obl", ["obl"], {})
@Index("rayon", ["rayon"], {})
@Index(
  "s_ate_street_id_street_IDX",
  ["idReestr", "idStreet", "idTipeStreet", "soatoCode"],
  { unique: true }
)
@Entity("s_ate_street", { schema: "mchs" })
export class SAteStreet {
  @PrimaryGeneratedColumn({ type: "int", name: "id_street" })
  idStreet: number;

  @Column("bigint", { name: "soato_code", unsigned: true })
  soatoCode: string;

  @Column("int", {
    name: "id_reestr",
    nullable: true,
    comment:
      "идентификатор административно-территориальн.единицыs(Идентификатор АТЕ)",
    unsigned: true,
  })
  idReestr: number | null;

  @Column("varchar", { name: "obl", nullable: true, length: 55 })
  obl: string | null;

  @Column("varchar", { name: "rayon", nullable: true, length: 155 })
  rayon: string | null;

  @Column("varchar", { name: "sovet", nullable: true, length: 155 })
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

/*   @Column("bigint", {
    name: "id_street",
    nullable: true,
    comment: "Идентификатор элемента",
    unsigned: true,
  })
  idStreet: number | null; */

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
  dateRegistr: Date | null;

  @Column("date", {
    name: "date_annul",
    nullable: true,
    comment: "Дата аннулирования",
  })
  dateAnnul: Date | null;
}
