/* eslint-disable prettier/prettier */
import { SEventsOrderAdmBan } from 'src/modules/events/entity/eventsOrderAdmBan.entity';
import { SEventsOrderAdmForce } from 'src/modules/events/entity/eventsOrderAdmForce.entity';
import { SEventsOrderObj } from 'src/modules/events/entity/eventsOrderObj.entity';
import { SEventsOrderQueDef } from 'src/modules/events/entity/eventsOrderQueDef.entity';
import { SPogSubjAccidents } from 'src/modules/pog/entity/pogSubjAccident.entity';
import { SPogSubjAuto } from 'src/modules/pog/entity/pogSubjAuto.entity';
import { SPogSubjAvia } from 'src/modules/pog/entity/pogSubjAvia.entity';
import { SPogSubjRw } from 'src/modules/pog/entity/pogSubjRw.entity';
import { SPogSubjWater } from 'src/modules/pog/entity/pogSubjWater.entity';
import { SPooSubjPb } from 'src/modules/poo/entity/pooSubjPb.entity';
import { SSubj } from 'src/modules/subject/entity/subject.entity';
import { User } from 'src/modules/users/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('id_subj', ['idSubj'], {})
@Index('s_subj_obj_FK_1', ['uid'], {})
@Index('s_subj_obj_FK_2', ['idTypeDanger'], {})
@Index('s_subj_obj_FK_31', ['soatoCode'], {})
@Entity('s_subj_obj', { schema: 'mchs' })
export class SSubjObj {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id_obj', unsigned: true })
  idObj: number;

  @Column('bigint', { name: 'id_subj', unsigned: true })
  idSubj: number;

  @Column('tinyint', {
    name: 'id_type_danger',
    comment: 'тип опасности',
    unsigned: true,
    default: () => "'1'",
  })
  idTypeDanger: number;

  @Column('text', { name: 'note', nullable: true, comment: 'Примечание' })
  note: string | null;

  @Column('varchar', {
    name: 'unp',
    nullable: true,
    comment: 'УНП',
    length: 25,
  })
  unp: string | null;

  @Column('varchar', {
    name: 'addr_obj',
    nullable: true,
    comment:
      'Место нахождения oбъекта проверяемого субъекта (промышленной безопасности)',
    length: 550,
  })
  addrObj: string | null;

  @Column('varchar', {
    name: 'addr_descr',
    nullable: true,
    comment: 'Место осуществления деятельности (уточнение)',
    length: 254,
  })
  addrDescr: string | null;

  @Column('date', {
    name: 'date_record',
    nullable: true,
    comment: 'Дата изменения',
  })
  dateRecord: Date | null;

  @Column('tinyint', {
    name: 'active',
    comment: '0-удалена,1-действует',
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column('int', {
    name: 'uid',
    nullable: true,
    comment: 'Ид.пользователя,изменившего запись',
    unsigned: true,
  })
  uid: number | null;

  @Column('bigint', {
    name: 'soato_code',
    nullable: true,
    comment: 'местонахождения  объекта s_ate_reestr',
    unsigned: true,
  })
  soatoCode: number | null;

  @Column('int', {
    name: 'id_reestr',
    nullable: true,
    comment:
      'Уникальный идентификатор объекта (город, деревня…) Реестр АТЕ и ТЕ',
    unsigned: true,
  })
  idReestr: number | null;

  @Column('bigint', {
    name: 'id_street',
    nullable: true,
    comment: 'поле id_street таблицы s_ate_street',
    unsigned: true,
  })
  idStreet: number | null;

  @Column('varchar', {
    name: 'name_obj',
    nullable: true,
    comment: 'наименование объекта',
    length: 50,
  })
  nameObj: string | null;

  @Column('varchar', {
    name: 'fio_fireman',
    nullable: true,
    comment:
      'Инициалы служащего, контактн.телефон должн.лица, ответственного за обеспеч.пож.безоп.',
    length: 250,
  })
  fioFireman: string | null;

  @Column('tinyint', {
    name: 'org',
    nullable: true,
    comment: '0-госпромнадзор,1-пожарники',
    unsigned: true,
    default: () => "'0'",
  })
  org: number | null;

  @Column('varchar', {
    name: 'num_opo',
    nullable: true,
    comment: 'Номер ОПО (для надзорников, org=0)',
    length: 85,
  })
  numOpo: string | null;

  @OneToMany(
    () => SEventsOrderAdmBan,
    (sEventsOrderAdmBan) => sEventsOrderAdmBan.idObj2,
  )
  sEventsOrderAdmBans: SEventsOrderAdmBan[];

  @OneToMany(
    () => SEventsOrderAdmForce,
    (sEventsOrderAdmForce) => sEventsOrderAdmForce.idObj2,
  )
  sEventsOrderAdmForces: SEventsOrderAdmForce[];

  @OneToMany(() => SEventsOrderObj, (sEventsOrderObj) => sEventsOrderObj.idObj2)
  sEventsOrderObjs: SEventsOrderObj[];

  @OneToMany(
    () => SEventsOrderQueDef,
    (sEventsOrderQueDef) => sEventsOrderQueDef.idObj2,
  )
  sEventsOrderQueDefs: SEventsOrderQueDef[];

  @OneToMany(
    () => SPogSubjAccidents,
    (sPogSubjAccidents) => sPogSubjAccidents.idObj2,
  )
  sPogSubjAccidents: SPogSubjAccidents[];

  @OneToMany(() => SPogSubjAuto, (sPogSubjAuto) => sPogSubjAuto.idSubjObj2)
  sPogSubjAutos: SPogSubjAuto[];

  @OneToMany(() => SPogSubjAvia, (sPogSubjAvia) => sPogSubjAvia.idSubjObj2)
  sPogSubjAvias: SPogSubjAvia[];

  @OneToMany(() => SPogSubjRw, (sPogSubjRw) => sPogSubjRw.idSubjObj2)
  sPogSubjRws: SPogSubjRw[];

  @OneToMany(() => SPogSubjWater, (sPogSubjWater) => sPogSubjWater.idSubjObj2)
  sPogSubjWaters: SPogSubjWater[];

  @OneToMany(() => SPooSubjPb, (sPooSubjPb) => sPooSubjPb.idSubjObj2)
  sPooSubjPbs: SPooSubjPb[];

  @ManyToOne(() => User, (users) => users.sSubjObjs, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'uid', referencedColumnName: 'uid' }])
  u: User;

  @ManyToOne(() => SSubj, (sSubj) => sSubj.sSubjObjs, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_subj', referencedColumnName: 'idSubj' }])
  idSubj2: SSubj;
}
