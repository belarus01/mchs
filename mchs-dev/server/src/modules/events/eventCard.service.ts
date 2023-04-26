import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, Repository } from 'typeorm';
import { CreateEventDTO } from './dto/create-event.dto';
import { SEvents } from './entity/events.entity';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { SEventsOrder } from './entity/eventsOrder.entity';
import { SEventsPrivate } from './entity/eventsPrivate.entity';
import * as moment from 'moment';
import { GetNowDTO } from './dto/getNow.dto';
import { ModuleRef } from '@nestjs/core';
import { channel } from 'diagnostics_channel';
import { EventNotFoundException } from './exception/event.not-found.exception';
import { EventBadRequestException } from './exception/event.bad-request.exception';


@Injectable()
export class EventCardService {
    constructor(@InjectRepository(SEvents, 'mchs_connection') private eventsRepository: Repository<SEvents>,
        @InjectRepository(SEventsOrder, 'mchs_connection') private eventsOrderRepository: Repository<SEventsOrder>,
        //@InjectRepository(SEventsPrivate, 'mchs_connection') private eventsPrivateRepository: Repository<SEventsPrivate>,

        //private moduleRef: ModuleRef,
    ) {

    }

    //1 страница (1-9)
    async getFirstPart() {
        const result1 = await this.eventsRepository.manager.query(`
        SELECT d.id_event,s.id_subj,@io:=id_event_order,
    s.subj ,#1
    s.unp,#2
    IFNULL(DATE_FORMAT(DATE(s.date_reg_unp), "%d.%m.%Y"),"")date_reg_unp, #3
    s.id_ved,IFNULL(ved.name,'-')ved,   #4
    s.addr_yur,                         #5
    IFNULL(s.addr_fact,'-')addr_fact,   #6
    s.boss_name,                        #7
    s.staff_boss,                       #8
    s.id_oked,oked.name_oked ,          #9
    
    
    # 3 страница (1-8, 13-15, 18-25)
    #     III. Данные по надзорно-профилактическому мероприятию
              
    (SELECT u.name FROM s_units u WHERE type_unit=4 AND id_unit = d.id_unit_4 AND active=1) type_check,#1
    (SELECT u.name FROM s_units u WHERE type_unit=3 AND id_unit = d.id_unit_3 AND active=1) type_order,#2
    (SELECT u.name FROM s_units u WHERE type_unit=0 AND id_unit = d.id_unit   AND active=1) sphera,#3
    
    CASE 
      WHEN d.id_event_plan IS NULL THEN CONCAT_WS(' ',IFNULL(d.name_order,""), IFNULL(d.reason_order,""))
      WHEN @ip:=d.id_event_plan IS NOT NULL THEN 
      (SELECT CONCAT("пункт плана выборочных проверок № ",p.num_order," на ",p.halfyear_event," полугодие ",p.year_plan) 
        FROM mchs.s_events_plan p WHERE p.id_event_plan = d.id_event_plan= @ip LIMIT 1)
      ELSE NULL
      END reason,       #4
    d.post_title,#5
    d.fio_post_title,#6
    (SELECT GROUP_CONCAT(CASE r.id_form WHEN 1002 THEN "Предписание на проведение проверки № " WHEN 1008 THEN "Решение о проведении мониторинга № " ELSE "" END,
                          IFNULL(r.num_doc,"") )
     FROM s_form_report r WHERE r.id_form IN (1002,1008) AND r.id_event_order = @io  AND r.active=1) num_order,#7_1
    d.num_order,#7
    
    (
    SELECT GROUP_CONCAT(IFNULL(DATE_FORMAT(date(r.date_doc), "%d.%m.%Y"),""))
     FROM s_form_report r WHERE r.id_form IN (1002,1008) AND r.id_event_order = @io  AND r.active=1
     ) date_order,#8_1
    IFNULL(DATE_FORMAT(DATE(d.date_order), "%d.%m.%Y"),"")date_order, #8
    
    CONCAT(d.period_check_from,' - ',d.period_check_to) period_check,#13
    IFNULL(DATE_FORMAT(DATE(d.date_begin), "%d.%m.%Y"),"")date_begin,#14
    IFNULL(DATE_FORMAT(DATE(d.date_end), "%d.%m.%Y"),"")date_end,#15
    IFNULL(DATE_FORMAT(DATE(d.date_begin_fact), "%d.%m.%Y"),"")date_begin_fact,#18
    IFNULL(DATE_FORMAT(DATE(d.date_end_fact), "%d.%m.%Y"),"")date_end_fact,    #19
    IFNULL(DATE_FORMAT(DATE(d.date_stop), "%d.%m.%Y"),"")date_stop,            #20
    IFNULL(DATE_FORMAT(DATE(d.date_continue), "%d.%m.%Y"),"")date_continue,    #21
    IF(d.date_to IS NULL, 'нет','да')fl_longer,#22
    IFNULL(DATE_FORMAT(DATE(d.date_to), "%d.%m.%Y"),"")date_to,    #23,
    d.post_agent,#24
    d.name_agent #25
    
    
    FROM mchs.s_events_order          d
    LEFT JOIN mchs.group              g   ON g.id_group=d.id_group
    LEFT JOIN mchs.s_dept             sd  ON g.id_dept=sd.id_dept
    LEFT JOIN mchs.s_subj             s   ON d.id_subj=s.id_subj
    LEFT JOIN mchs.s_subj_obj         so  ON so.id_subj=s.id_subj
    LEFT JOIN mchs.s_subj_obj_specif  sos ON sos.id_subj_obj=so.id_obj
    LEFT JOIN mchs.s_oked             oked ON s.id_oked=oked.id_oked
    LEFT JOIN mchs.s_vedomstva        ved ON s.id_ved=ved.id_ved
    LEFT JOIN mchs.s_subj_obj_specif  eo  ON eo.id_subj_obj=so.id_obj
    #LEFT JOIN s_form_report       r   ON r.id_event_order=d.id_event_order AND r.id_form  IN (1002,1008)  
    #LEFT JOIN mchs.s_events_plan     p   ON p.id_event = d.id_event 
    WHERE d.id_event_order=1
    GROUP BY so.id_subj
    ;
        `);

        //1 страница (10-13)
        const result2 = await this.eventsRepository.manager.query(`
        SELECT eo.id_specif,eo.name_build, eo.id_unit_41
        FROM mchs.s_events_order d 
        LEFT JOIN mchs.s_subj_obj so ON so.id_subj=d.id_subj
        LEFT JOIN mchs.s_subj_obj_specif eo ON eo.id_subj_obj=so.id_obj
        WHERE d.id_event_order=1 AND eo.active=1 AND so.active=1 AND so.org=1 AND eo.id_unit_41 IN (4000,4001,4002)
        ;
        `);

        //2 страница (1-5)
        const result3 = await this.eventsRepository.manager.query(`
        SELECT sd.departament,                    #1
        IFNULL(sd.unp,"нет данных") unp,          #2
        IFNULL(sd.address,"нет данных")address,   #3
        IFNULL(sd.fio_boss,"нет данных") fio_boss,#4
        IFNULL(sd.dolzn_boss_nadz_org,"нет данных")dolzn_boss_nadz_org #5
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_dept sd ON e.id_dept = sd.id_dept
        WHERE e.id_event_order=1 AND sd.active=1 AND sd.org=1 AND e.org=1;
        `);

        //3 страница (1-8, 13)
        // const result5 = await this.eventsRepository.manager.query(`
        //     SELECT
        //     @plan:=e.id_event_plan, 
        //     e.id_unit_3,    #1 выб,внепл
        //     e.id_unit_4 ,   #2 пров.мон.обсл.МТХ
        //     e.id_unit,      #3 sphera

        //     CASE 
        //     WHEN e.id_event_plan is NOT NULL THEN CONCAT("пункт плана выборочных проверок № ",p.num_order," на ",p.halfyear_event," полугодие ",p.year_plan)
        //     WHEN e.id_event_plan is  NULL THEN CONCAT_WS(' ',IFNULL(e.name_order,""), IFNULL(e.reason_order,""))
        //     ELSE ""
        //     END reason,     #4 основание
        //     j.job,          #5должность
        //     u.fio,          #6 фио лица, выдавшего...
        //     fr.num_doc,     #7 номер предписания(решения)  !!!!!GROUP_CONCAT(fr.num_doc)
        //     fr.date_doc,    #8 дата выдачи
        //     e.period_check_from  #13 проверяемый период


        //     FROM
        //     mchs.s_events_order e
        //     LEFT JOIN mchs.s_events_plan p  ON p.id_event_plan = e.id_event_plan
        //     LEFT JOIN mchs.s_dept d         ON d.id_dept=e.id_dept_iss
        //     LEFT JOIN mchs.group g        ON g.id_group=e.id_group 
        //     LEFT JOIN mchs.user_group ug    ON ug.id_group=g.id_group AND ug.type_user=0
        //     LEFT JOIN mchs.users u          ON u.uid= ug.uid_gr
        //     LEFT JOIN mchs.s_dept sd        ON sd.id_dept=u.id_dept
        //     LEFT JOIN mchs.s_dept_job j     ON j.id_dept_job=u.id_dept_job
        //     LEFT JOIN s_form_report fr  ON fr.id_event_order=e.id_event_order AND fr.id_form IN (1002,1008)
        //      WHERE e.id_event_order=1 AND fr.active=1 AND fr.active=1
        //     LIMIT 1

        //     ;`);

        //3 страница (9-12)
        const result4 = await this.eventsRepository.manager.query(`
            #9-12 группа. Исполнители только с type_user 1(только один) и 2(этих, с двойкой (2) может быть несколько). Остальные либо документы визируют (3-4), либо выдают задание (0)
            SELECT ug.type_user,g.id_group,
            CASE 
             WHEN ug.type_user=0 THEN 'Должн.лицо'
             WHEN ug.type_user=1 THEN 'Руководитель'
             WHEN ug.type_user=2 THEN 'Исполнитель'
             WHEN ug.type_user=3 THEN 'Государственный инспектор'
             WHEN ug.type_user=4 THEN 'Главный государственный инспектор'
             ELSE NULL
            END AS          cat,   #Тип участника проверки
                            j.job, #11 Должность участника проверки
                            u.fio #12 ФИО участника проверки

            FROM mchs.s_events_order  d
            LEFT JOIN mchs.group g ON g.id_group=d.id_group
            LEFT JOIN mchs.user_group ug ON ug.id_group=d.id_group
            LEFT JOIN mchs.users u ON u.uid=ug.uid
            LEFT JOIN mchs.s_dept sd ON g.id_dept=sd.id_dept
            LEFT JOIN mchs.s_dept_job j     ON j.id_dept_job=u.id_dept_job
            WHERE d.id_event_order=1 AND ug.type_user IN(1,2);`);



        //3 страница (16)
        //17 пункта нет (заполняется от руки?)
        const result5 = await this.eventsRepository.manager.query(`#вопросы по мроприятию # 16
            SELECT sq.name_que FROM 
            mchs.s_events_order_que e
            LEFT JOIN s_question sq ON e.id_que=sq.id_que
            WHERE e.id_event_order=1;`);

        //3 страница (26-29)
        const result6 = await this.eventsRepository.manager.query(`
            SELECT 
            GROUP_CONCAT(CASE r.id_form WHEN 1003 THEN "Акт проверки № " WHEN 1004 THEN "Справка проверки № "  WHEN 1018 THEN "Аналитическая записка "  ELSE "" END,
                                  IFNULL(r.num_doc,""))         num_last_doc,               #26
            GROUP_CONCAT(IFNULL(DATE_FORMAT(date(r.date_doc), "%d.%m.%Y"),""))date_doc ,    #27
            GROUP_CONCAT(IFNULL(DATE_FORMAT(date(r.date_rec), "%d.%m.%Y"),""))date_rec,     #28
            COUNT(r.other_info) other_info #29
            FROM s_form_report r WHERE r.id_form IN (1003,1004,1018) AND r.id_event_order = 1  AND r.active=1
            ;`);

        //3 страница (30-31)
        const result7 = await this.eventsRepository.manager.query(`
            SELECT 
            IFNULL(r.comm,"")resh , #30
            IFNULL(DATE_FORMAT(date(r.date_doc), "%d.%m.%Y"),"")date_resh #31
            FROM s_form_report r WHERE r.id_form IN (1019) AND r.id_event_order = 1  AND r.active=1;
            `);

        //3 страница (32, 38-42)
        const result8 = await this.eventsRepository.manager.query(`
            # 32, 38-42 перечень выявленных нарушений
            SELECT dd.name_def,  # 32

            IFNULL(DATE_FORMAT(date(d.date_fix), "%d.%m.%Y"),"")date_fix, #38
            IFNULL(DATE_FORMAT(date(d.date_inform), "%d.%m.%Y"),"")date_inform,  #39
            IFNULL(DATE_FORMAT(date(d.date_check_fix), "%d.%m.%Y"),"")date_check_fix,  #40
            CASE d.fl_ok
            WHEN 0 THEN "исправлено"
            WHEN 1 THEN "не исправлено"
            WHEN 2 THEN "частично исправлено"
            WHEN 3 THEN "перенесено"
            ELSE ""
            END fl_ok,    #41
            d.transfer_data  #сведения о переносе сроков устранения нарушения: наим.докум.,вход.№, дата
            FROM mchs.s_events_order_que_def d
            LEFT JOIN s_defection dd ON dd.id_def=d.id_def
            WHERE d.id_event_order=1 ORDER BY  d.fl_ok;`);

        //3 страница (43)
        const result9 = await this.eventsRepository.manager.query(`
            #43 Сведения о принятии решения о назначении внеплановой проверки (да/нет)
            SELECT 
            IF(COUNT(r.id_list)>0,"да","нет")num  #43
            FROM s_form_report r WHERE r.id_form IN (1020) AND r.id_event_order = 1  AND r.active=1;`);

        //3 страница (33)
        const result10 = await this.eventsRepository.manager.query(`
            #33 свед о принятых мерах адм. принуждения
            SELECT CONCAT_WS(": ",ff.name_im,count(ff.name_im)) adm_force #33
             FROM mchs.s_events_order_adm_force f
            LEFT JOIN s_adm_force ff ON ff.id_force=f.id_force
            WHERE f.id_event_order=1 AND f.active=1 GROUP BY f.id_force;`);

        //3 страница (34)
        const result11 = await this.eventsRepository.manager.query(`
            #34 свед о принятых мерах адм. пресечения
            SELECT CONCAT_WS(": ",ff.name_im,count(ff.name_im)) adm_ban #34
            FROM mchs.s_events_order_adm_ban  f
            LEFT JOIN s_adm_ban ff ON ff.id_ban=f.id_ban
            WHERE f.id_event_order=1 AND f.active=1 GROUP BY f.id_ban;`);

        //3 страница (35-37)
        const result12 = await this.eventsRepository.manager.query(`
            #35 - #37
            SELECT 
            IF(COUNT(r.id_list)>0,"да","нет" ) fl,   #35 0-нет,1-да
            IFNULL(DATE_FORMAT(date(r.date_doc), "%d.%m.%Y"),"")date_doc, #36
            IFNULL(DATE_FORMAT(date(r.date_rec), "%d.%m.%Y"),"")date_rec #37

            FROM s_form_report r WHERE r.id_form IN (1019) AND r.id_event_order = 1  AND r.active=1 GROUP BY r.id_list;`);

        //4 страница (1)
        const result13 = await this.eventsRepository.manager.query(`
        #IV. Результаты (здесь по всем зафиксированным проверкам. если надо - можно выбрать за период!)

        #1,сумма проверок по каждому виду
        SELECT COUNT(e.id_event_order) num,   
        GROUP_CONCAT(CONCAT_WS (" ",uu.name,u.name)) name 
        FROM mchs.s_events_order e 
        LEFT JOIN s_units u ON u.id_unit=e.id_unit_3
        LEFT JOIN s_units uu ON uu.id_unit=e.id_unit_4
        WHERE e.id_subj=1460  AND e.org=1 AND
         e.active=1  GROUP BY e.id_unit_4,e.id_unit_3;`);

        //4 страница (2)
        const result14 = await this.eventsRepository.manager.query(`
        # 2 количество выявленных нарушений
        SELECT COUNT(d.id_list) num  # 2
        FROM mchs.s_events_order_que_def d
        WHERE d.id_event_order=1;`);

        //4 страница (3)
        const result15 = await this.eventsRepository.manager.query(`
        #3 количество надз.-проф. меропр. по видам итогового документа
        SELECT 
        CASE
        WHEN r.id_form  IN (1003,16)  THEN "Акт проверки "
        WHEN r.id_form  IN (1004,18)  THEN "Справка проверки"
        WHEN r.id_form  IN (1018,41)  THEN "Аналитическая записка"
        END vid_doc,#вид документа
        COUNT(r.id_form) sum_exit_docs,#кол-во выходных документов
        COUNT(r.id_event_order) sum_events #кол-во проверок
        FROM s_form_report r 
        LEFT JOIN mchs.s_events_order e ON e.id_event_order=r.id_event_order
        WHERE r.id_form IN (1003,1004,1018,16,18,41) AND e.id_subj=1460 AND e.org=1 AND r.active=1  #AND r.id_event_order = 1  AND r.active=1 
        GROUP BY r.id_form;`);

        //4 страница (4)
        const result16 = await this.eventsRepository.manager.query(`
        #4  количество надз.-проф. меропр. по сферам контроля
        SELECT #COUNT(e.id_unit),e.id_subj,s.name
        s.name,#sph_name
        COUNT(e.id_unit) #sum_events
        FROM
        mchs.s_events_order e
        LEFT JOIN s_units s ON s.id_unit=e.id_unit
        WHERE e.id_subj=1460  AND e.org=1
        GROUP BY e.id_unit;`);

        //4 страница (5)
        const result17 = await this.eventsRepository.manager.query(`
        #5  количество и вид принятых мер адм.принуждения
        SELECT CONCAT_WS(": ",ff.name_im,count(ff.name_im)) adm_force #33
         FROM mchs.s_events_order_adm_force f
        LEFT JOIN s_adm_force ff ON ff.id_force=f.id_force
        LEFT JOIN mchs.s_events_order e ON e.id_event_order=f.id_event_order
        WHERE e.id_subj=1460  AND e.org=1 AND f.active=1 GROUP BY f.id_force;`);

        //4 страница (6)
        const result18 = await this.eventsRepository.manager.query(`
        #6  количество и вид принятых мер адм.принуждения
        SELECT CONCAT_WS(": ",ff.name_im,count(ff.name_im)) adm_ban #34
        FROM mchs.s_events_order_adm_ban  f
        LEFT JOIN s_adm_ban ff ON ff.id_ban=f.id_ban
        LEFT JOIN mchs.s_events_order e ON e.id_event_order=f.id_event_order
        WHERE e.id_subj=1460 AND e.org=1 AND f.active=1 GROUP BY  f.id_ban;`);

        return {
            //result1, result2, result4, result6,
            result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result14,
            result15, result16, result17, result18
        };
    }
}
