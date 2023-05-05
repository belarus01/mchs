import { Injectable } from '@nestjs/common';
import { AppDataSource } from './dataSource'

import * as fs from 'fs'
import { type } from 'os';
import { count } from 'console';

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

@Injectable()
export class DocGenerationService {

    generate1 = async (dto: genDocDTO) => {
        //  console.log(dto);
        let zip: any;
        try {
            const temp = fs.readFileSync("./templates/text.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }

        const result = await AppDataSource.manager.query(`
        SELECT DISTINCT se.num_event,se.date_begin,se.event,IFNULL("блаблабла",sq.name_tnpa) dd
        FROM  mchs.s_events se
        LEFT JOIN  mchs.s_events_order eo ON eo.id_event= se.id_event
        LEFT JOIN  mchs.s_events_order_que e ON eo.id_event_order=e.id_event_order
        RIGHT JOIN s_question sq ON e.id_que=sq.id_que
        WHERE sq.org=1  AND sq.active=1 AND num_event > ${dto.num_event} AND se.date_begin < ${dto.now}`);
        //console.log(result);

        // const data = {
        //     subj: 'text1',
        //     addr_yur: 'text2',
        //     punkt: 1,
        //     start_period: 1,
        //     end_period: 1,
        //     mounth: 1,
        //     year: 1,
        // };


        try {
            let output = new Docxtemplater(zip);

            output.setData(result[0], { result });
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen14.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }

    }
    
    //101 - ЧЛ 1
    generate1_ch = async (dto: genDocDTO3) => {

        let id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____",
            technical = "", no_appeal = "",
            d_beg = "", m_beg = "", y_beg = "", d_end = "", m_end = "", y_end = "",
            d_send = "", m_send = "", y_send = "", hp = "", vyb = "", planir = "",vnepl = "",
            subj = "", subj_addr = "", place_addr = "", boss_name = "",
            boss_tel = "", addr_yur = "", addr_fact = "", unp = "", fio_fireman= "",
            //fl_proizv = "", fl_rozn = "", fl_opt = "",
            agent = "", post_agent = "", name_agent = "", comm = "", other_info = "",
            user_1 = "", dolj_user_1 = "",
            num_doc_pre="",date_doc_pre="",department_pre="",fl_no ="",fl_docs="",
            num_visit="", num_staff="", area=""
            //supbp="", fl_docum_made="", num_docum_made="", date_docum_made=""

            ;
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/101 - ЧЛ.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }

        const result = await AppDataSource.manager.query(`
        SELECT   @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
                                                        s.addr_record ,
                                                        IFNULL(s.num_doc,"") num_doc,
                                                        
        @fl_rec:=s.fl_rec,
        IFNULL(concat_ws("  ","да ",technical) ,"")     technical,
        CASE 
          WHEN IFNULL(technical,"")="" THEN "нет "
          ELSE  ""
        END no_appeal,
        
        IFNULL(DAY(DATE(s.date_doc)) ,"")        d_beg,
        IFNULL(MONTH(DATE(s.date_doc)) ,"")      m_beg,
        IFNULL(YEAR(s.date_doc)  ,"")            y_beg,

        IFNULL(DAY(DATE(s.date_book))  ,"")     d_end,
        IFNULL(MONTH(DATE(s.date_book)) ,"")    m_end,
        IFNULL(YEAR(DATE(s.date_book)),"")      y_end,
        

        IFNULL(DAY(DATE(s.date_rec))  ,"")       d_send,
        IFNULL(MONTH(DATE(s.date_rec)) ,"")      m_send,
        IFNULL(YEAR(DATE(s.date_rec))  ,"")      y_send,
        @hp:=@vyb:=@vnepl:=@planir:="",
        CASE 
          WHEN e.id_unit_4 = 91 AND e.id_unit_3=80 THEN @hp:=     "V"
          WHEN e.id_unit_4 = 91 AND e.id_unit_3=81 THEN @vyb:=    "V"
          WHEN e.id_unit_4 = 91 AND e.id_unit_3=82 THEN @vnepl:=  "V"
          WHEN e.id_unit_4 = 91 AND e.id_unit_3=83 THEN @planir:= "V"
          ELSE ""
        END d,
        @hp hp,@vyb vyb, @vnepl vnepl, @planir planir,

        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")           date_doc,

        IFNULL(ss.unp,"")                                   unp,
        IFNULL(ss.subj,"")                                  subj, 
        IFNULL(ss.addr_yur,"")                              subj_addr,
        IFNULL(ss.addr_fact,"")                             place_addr,
        IFNULL(ss.boss_name,"")                             boss_name,
        IFNULL(ss.boss_tel,"")                              boss_tel,
        IFNULL(ss.addr_yur,"")                              addr_yur,
        IFNULL(ss.addr_fact,"")                             addr_fact,
       
        IFNULL(CONCAT_WS(' ',e.post_agent,e.name_agent),"") agent,
        IFNULL(e.post_agent,"")                             post_agent ,
        IFNULL(e.name_agent,"")                             name_agent ,
        IFNULL(s.other_info,"")                             other_info,
        IFNULL(s.comm,"")                                   comm
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        WHERE ss.active=1 AND s.active=1 AND e.active=1  AND e.org=1   AND s.org=1  
        AND  e.num_order="${dto.num_order}" AND  s.id_list=${dto.id_list}  `);//'1   /П'   100008077  100297103

        if (result.length > 0) {
            id_event_order = result[0].id_event_order;
            d_beg = result[0].d_beg;
            m_beg = result[0].m_beg;
            y_beg = result[0].y_beg;
            d_end = result[0].d_end;
            m_end = result[0].m_end;
            y_end = result[0].y_end;
            d_send = result[0].d_send;
            m_send = result[0].m_send;
            y_send = result[0].y_send;
            hp = result[0].hp;
            vyb = result[0].vyb;
            vnepl = result[0].vnepl,
            planir = result[0].planir;
            num_doc = result[0].num_doc;
            technical = result[0].technical;
            no_appeal = result[0].no_appeal,
            date_doc = result[0].date_doc;
            subj = result[0].subj,
            subj_addr = result[0].subj_addr,
            place_addr = result[0].place_addr,
            boss_name = result[0].boss_name,
            boss_tel = result[0].boss_tel,
            addr_yur = result[0].addr_yur,
            addr_fact = result[0].addr_fact,
            //perio = result[0].perio,
            unp = result[0].unp,
            agent = result[0].agent,
            post_agent = result[0].post_agent,
            name_agent = result[0].name_agent,
            other_info = result[0].other_info,
            comm = result[0].comm;

        }
        
        // ХАРАКТЕРИСТИКИ ПРОВЕРЯЕМОГО СУБЪЕКТА: num_visit, num_staff,  area
        const result_char = await AppDataSource.manager.query(`
        SELECT SUM(os.num_visit) num_visit, SUM(os.num_staff) num_staff, SUM( os.area) area,
        GROUP_CONCAT(DISTINCT o.fio_fireman) fio_fireman
        FROM mchs.s_subj_obj_specif os
        LEFT JOIN mchs.s_subj_obj o ON o.id_obj=os.id_subj_obj
        LEFT JOIN mchs.s_subj s ON s.id_subj=o.id_subj
        WHERE s.unp="${dto.unp}" AND s.active=1 AND o.active=1 AND o.org=1 AND os.active=1  
        GROUP BY s.unp`);

        if (result_char.length > 0) {
            num_visit = result_char[0].num_visit,
            num_staff = result_char[0].num_staff,
            area = result_char[0].area,
            fio_fireman = result_char[0].fio_fireman
        }
        //Сведения об имеющихся в субъекте хозяйствования сооружениях Таблица 1 ЧЕК-ЛИСТ 1
        const result_build = await AppDataSource.manager.query(`
        SELECT su.type,os.area ,os.name_build

        FROM mchs.s_subj_obj_specif os
        LEFT JOIN mchs.s_units su ON os.id_unit_6=su.id_unit
        LEFT JOIN mchs.s_subj_obj o ON o.id_obj=os.id_subj_obj
        LEFT JOIN mchs.s_subj s ON s.id_subj=o.id_subj
        WHERE s.unp="${dto.unp}" AND s.active=1 AND o.active=1 AND o.org=1 AND os.active=1  
        ;`);
        if (result_build.length > 0) {
            result_build
        }
        //кол-во ЗДАНИЙ id_unit_41=4000, суммарная площадь по Классу функциональной пожарной безопасности Ф.1.1 -Ф.5.4
        const result_buildF = await AppDataSource.manager.query(`
        SELECT count( o.id_unit_6 )  AS num,su.type, SUM(o.area) area#,suz.name,COUNT(o.id_unit_41)#

        /*CASE 
        WHEN su.type = "Ф.1.1" THEN @t:=num f11 AND @p:= pl p11 end
        WHEN su.type = "Ф.1.2" THEN f12=num AND p12=pl
        WHEN su.type = "Ф.1.3" THEN f13=num AND p13=pl
        WHEN su.type = "Ф.1.4" THEN f14=num AND p14=pl
        WHEN su.type = "Ф.2.2" THEN f21=num AND p21=pl
        ELSE NULL
        END c*/
        FROM mchs.s_subj s 
        LEFT JOIN mchs.s_subj_obj so ON s.id_subj=so.id_subj
        right JOIN mchs.s_subj_obj_specif o ON o.id_subj_obj=so.id_obj
        LEFT JOIN mchs.s_units su ON o.id_unit_6 =su.id_unit
        #LEFT JOIN mchs.s_units suz ON o.id_unit_41 =suz.id_unit
        WHERE s.unp="${dto.unp}" AND id_unit_41=4000#AND org=1#100297103 1446 #100008077 1385
        AND so.active=1 AND o.active=1 AND so.org=1 AND so.active=1
        GROUP BY o.id_unit_6
                ;`);
        if (result_build.length > 0) {
            result_build
        }
        
        //кол-во ПОМЕЩЕНИЙ, суммарная площадь по Классу функциональной пожарной безопасности Ф.1.1 -Ф.5.4
        const result_buildR = await AppDataSource.manager.query(`
        SELECT count( o.id_unit_6 )  AS num,su.type, SUM(o.area) area#,suz.name,COUNT(o.id_unit_41)#

        FROM mchs.s_subj s 
        LEFT JOIN mchs.s_subj_obj so ON s.id_subj=so.id_subj
        right JOIN mchs.s_subj_obj_specif o ON o.id_subj_obj=so.id_obj
        LEFT JOIN mchs.s_units su ON o.id_unit_6 =su.id_unit
        #LEFT JOIN mchs.s_units suz ON o.id_unit_41 =suz.id_unit
        WHERE s.unp="${dto.unp}" AND id_unit_41=4003#AND org=1#100297103 1446 #100008077 1385
        AND so.active=1 AND o.active=1 AND so.org=1 AND so.active=1
        GROUP BY o.id_unit_6 ;`);

        // let obj_zd_keys = //{'1': 10, '2': 2, '3': 130};
        // ["Ф.1.1","Ф.1.2","Ф.1.3","Ф.1.4",
        //  "Ф.2.1","Ф.2.2","Ф.2.3","Ф.2.4",
        //  "Ф.3.1","Ф.3.2","Ф.3.3","Ф.3.4","Ф.3.5","Ф.3.6",
        //  "Ф.4.1","Ф.4.2","Ф.4.3","Ф.4.4",
        //  "Ф.5.1","Ф.5.2","Ф.5.3","Ф.5.4"];
        
        let zd = //{'1': 10, '2': 2, '3': 130};
        {"Ф.1.1":"","Ф.1.2":"","Ф.1.3":"","Ф.1.4":"",
         "Ф.2.1":"","Ф.2.2":"","Ф.2.3":"","Ф.2.4":"",
         "Ф.3.1":"","Ф.3.2":"","Ф.3.3":"","Ф.3.4":"","Ф.3.5":"","Ф.3.6":"","Ф.3.7":"",
         "Ф.4.1":"","Ф.4.2":"","Ф.4.3":"","Ф.4.4":"",
         "Ф.5.1":"","Ф.5.2":"","Ф.5.3":"","Ф.5.4":""};
        
        let p = //{'1': 10, '2': 2, '3': 130};
        {"Ф.1.1":"","Ф.1.2":"","Ф.1.3":"","Ф.1.4":"",
         "Ф.2.1":"","Ф.2.2":"","Ф.2.3":"","Ф.2.4":"",
         "Ф.3.1":"","Ф.3.2":"","Ф.3.3":"","Ф.3.4":"","Ф.3.5":"","Ф.3.6":"","Ф.3.7":"",
         "Ф.4.1":"","Ф.4.2":"","Ф.4.3":"","Ф.4.4":"",
         "Ф.5.1":"","Ф.5.2":"","Ф.5.3":"","Ф.5.4":""};
         
        let obj_zd = Object.assign({}, zd) ;
        let obj_p  = Object.assign({}, p);

        let obj_zdS = Object.assign({}, zd);//сооружения
        let obj_pS  = Object.assign({}, p);

        let obj_zdP = Object.assign({}, zd);//помещения
        let obj_pP  = Object.assign({}, zd);
        
         
        
        let obj_zd_key = [];//для теста
        let obj_zd_val = [];//для теста
    if (result_buildF.length > 0) {
        Object.keys(obj_zd).forEach((key)=> {
            obj_zd_key.push(key);
            for(let i=0; i<result_buildF.length; i++){
                if (key === result_buildF[i].type) {
                    obj_zd[key] = result_buildF[i].num;
                    obj_zd_val.push(result_buildF[i].num);//для теста
                } else { obj_zd_val.push("");//для теста
                }
            }
        });
        Object.keys(obj_p).forEach((key)=> {
            for(let i=0; i<result_buildF.length; i++){
                if (key === result_buildF[i].type) {
                    obj_p[key] = result_buildF[i].area;
                } 
            }
        });
    }
    //кол-во СООРУЖЕНИЙ id_unit_41=4001, суммарная площадь по Классу функциональной пожарной безопасности Ф.1.1 -Ф.5.4
    const result_buildS = await AppDataSource.manager.query(`
    SELECT count( o.id_unit_6 )  AS num,su.type, SUM(o.area) area#,suz.name,COUNT(o.id_unit_41)#

    FROM mchs.s_subj s 
    LEFT JOIN mchs.s_subj_obj so ON s.id_subj=so.id_subj
    right JOIN mchs.s_subj_obj_specif o ON o.id_subj_obj=so.id_obj
    LEFT JOIN mchs.s_units su ON o.id_unit_6 =su.id_unit
    #LEFT JOIN mchs.s_units suz ON o.id_unit_41 =suz.id_unit
    WHERE s.unp="${dto.unp}" AND id_unit_41=4001#AND org=1#100297103 1446 #100008077 1385
    AND so.active=1 AND o.active=1 AND so.org=1 AND so.active=1
    GROUP BY o.id_unit_6
            ;`);
    if (result_buildS.length > 0) {
        result_buildS
    }
    if (result_buildS.length > 0) {
        Object.keys(obj_zdS).forEach((key)=> {
            obj_zd_key.push(key);
            for(let i=0; i<result_buildS.length; i++){
                if (key === result_buildS[i].type) {
                    obj_zdS[key] = result_buildS[i].num;
                    obj_zd_val.push(result_buildS[i].num);//для теста
                } else { obj_zd_val.push("");//для теста
                }
            }
        });
        Object.keys(obj_pS).forEach((key)=> {
            for(let i=0; i<result_buildS.length; i++){
                if (key === result_buildS[i].type) {
                    obj_pS[key] = result_buildS[i].area;
                } 
            }
        });
    }
    if (result_buildR.length > 0) {
        Object.keys(obj_zdP).forEach((key)=> {
            for(let i=0; i<result_buildR.length; i++){
                if (key === result_buildR[i].type) {
                    obj_zdP[key] = result_buildR[i].num;
                } 
            }
        });
        Object.keys(obj_pP).forEach((key)=> {
            for(let i=0; i<result_buildR.length; i++){
                if (key === result_buildR[i].type) {
                    obj_pP[key] = result_buildR[i].area;
                } 
            }
        });
    }
        //Таблица 3 Чл1
         let obj_3 = {
            "А":"" ,"Б":"" ,"В":"" ,"Г":"" ,"Д":"",
            "Ан":"","Бн":"","Вн":"","Гн":"","Дн":""
         };
         
        let obj_zd3 = Object.assign({}, obj_3) ;//здания
        let obj_p3  = Object.assign({}, obj_3);

        let obj_zd3S = Object.assign({}, obj_3);//сооружения
        let obj_p3S  = Object.assign({}, obj_3);
        
        let obj_zd3N = Object.assign({}, obj_3);//сооружения
        let obj_p3N  = Object.assign({}, obj_3);

        let obj_zd3P = Object.assign({}, obj_3);//помещения
        let obj_p3P  = Object.assign({}, obj_3);
        
        //Количество зданий/наружных установок по Категориям по взрывопожарной и пожарной опасности
        const result_t3 = await AppDataSource.manager.query(`
        SELECT count( o.id_unit_17 )  num, MAX(o.id_unit_41) type, SUM(o.area) area ,MAX(su.type)letter #,    count( o.id_unit_41 ) num6 ,MAX(suz.name) ,MAX(suz.id_unit)
        FROM mchs.s_subj s 
        LEFT JOIN mchs.s_subj_obj so ON s.id_subj=so.id_subj
        right JOIN mchs.s_subj_obj_specif o ON o.id_subj_obj=so.id_obj
        LEFT JOIN mchs.s_units su ON o.id_unit_17 =su.id_unit
        LEFT JOIN mchs.s_units suz ON o.id_unit_41 =suz.id_unit
        WHERE s.unp="${dto.unp}" AND so.org=1 #AND suz.id_unit=4000# AND id_unit_17=4000#100297103 1446 #100008077 1385
        AND so.active=1 AND o.active=1 AND so.org=1 AND so.active=1
        GROUP BY o.id_unit_17,
        o.id_unit_41
        ;`);
        console.log('result_t3: '+result_t3);
        //obj_zd3 obj_zd3S obj_zd3N obj_zd3P
        //obj_p3  obj_p3S obj_p3N obj_p3P
        
        if (result_t3.length > 0) {
            //здания
            Object.keys(obj_zd3).forEach((key)=> {// кол-вo
                for(let i=0; i<result_t3.length; i++){
                    if (key === result_t3[i].letter) {
                        if(result_t3[i].type == 4000) {obj_zd3[key]  = result_t3[i].num};
                    } 
                }
            });
            Object.keys(obj_p3).forEach((key)=> {//площадь
                for(let i=0; i<result_t3.length; i++){
                    if (key === result_t3[i].letter) {
                        if(result_t3[i].type == 4000) {obj_p3[key]  = result_t3[i].area};
                    } 
                }
            });
            //сооружения
            Object.keys(obj_zd3S).forEach((key)=> {//кол-во
                for(let i=0; i<result_t3.length; i++){
                    if (key === result_t3[i].letter) {
                        if(result_t3[i].type == 4001) {obj_zd3S[key] = result_t3[i].num};
                    } 
                }
            });
            Object.keys(obj_p3S).forEach((key)=> {//площадь
                for(let i=0; i<result_t3.length; i++){
                    if (key === result_t3[i].letter) {
                        if(result_t3[i].type == 4001) {obj_p3S[key] = result_t3[i].area};
                    } 
                }
            });
            //наружные установки
            Object.keys(obj_zd3N).forEach((key)=> {//кол-во
                for(let i=0; i<result_t3.length; i++){
                    if (key === result_t3[i].letter) {
                        if(result_t3[i].type == 4002) {obj_zd3N[key] = result_t3[i].num};
                    } 
                }
            });
            Object.keys(obj_p3N).forEach((key)=> {//площадь
                for(let i=0; i<result_t3.length; i++){
                    if (key === result_t3[i].letter) {
                        if(result_t3[i].type == 4002) {obj_p3N[key] = result_t3[i].area};
                    } 
                }
            });
            //помещения
            Object.keys(obj_zd3P).forEach((key)=> {//кол-во
                for(let i=0; i<result_t3.length; i++){
                    if (key === result_t3[i].letter) {
                        if(result_t3[i].type == 4003) {obj_zd3P[key] = result_t3[i].num};
                    } 
                }
            });
            Object.keys(obj_p3P).forEach((key)=> {//площадь
                for(let i=0; i<result_t3.length; i++){
                    if (key === result_t3[i].letter) {
                        if(result_t3[i].type == 4003) {obj_p3P[key] = result_t3[i].area};
                    } 
                }
            });
        }
         
       
        //Вопросы чеклиста и данные к ним
        const result5 = await AppDataSource.manager.query(`
        SELECT d.num_question num_que,
        d.rule_punct que,
        short_tnpa,
        #row_number() OVER ()  n1,row_number() OVER (ORDER BY d.num_question DESC) AS n2,
        q.chl_fl_yes,
        @y:=@n:=@nn:="",
        CASE 
            WHEN q.chl_fl_yes = 0  THEN @y:=     "V"
            WHEN q.chl_fl_yes = 1  THEN @n:=     "V"
            WHEN q.chl_fl_yes = 2  THEN @nn:=    "V"
            ELSE ""
        END d,
        @y fl_yes,
        @n fl_no, 
        @nn fl_no_need,
        ifnull(q.chl_comm ,"")chl_comm
        FROM mchs.s_events_order_que_def q
        LEFT JOIN mchs.s_form_report sfr ON q.id_form_report=sfr.id_list
        LEFT JOIN mchs.s_defection d ON d.id_def=q.id_def
        WHERE q.id_event_order=${id_event_order} AND sfr.id_list=${dto.id_list} ORDER BY q.num_reg;`);//AND  s.id_list=${dto.id_list}
        if (result5.length > 0) {
            //console.log("result5=   " + result5);
           
        }
        //Руководитель user_1 
        const result6 = await AppDataSource.manager.query(` 
     
        SELECT  uu .fio user_1,j.job dolj_user_1
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                 WHERE   uu.active=1 #AND uu.org=1 AND g.active=1 AND g.org=1  
                    AND ug.active=1 #AND ug.org=1 #j.active=1 and 
                    AND ug.type_user in(1) AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order}   ;`);
        if (result6.length > 0) {
            user_1 = result6[0].user_1,
            dolj_user_1 = result6[0].dolj_user_1
        }
            
        const data = {
            result: result, result5: result5,//result2: result2, result21: result21,
            result_build,
            obj_zdS,obj_pS,obj_zd,obj_p,obj_zdP,obj_pP,//,obj_zd_val,
            obj_zd3, obj_zd3S, obj_zd3N, obj_zd3P,
            obj_p3,  obj_p3S,  obj_p3N,  obj_p3P,
            num_doc, date_doc,
            technical, no_appeal ,
            d_beg , m_beg, y_beg , d_end, m_end, y_end,
            d_send, m_send, y_send, hp, vyb, planir,vnepl,
            subj, subj_addr, place_addr, boss_name,
            boss_tel, addr_yur, addr_fact, unp, fio_fireman,
            agent, post_agent, name_agent, comm, other_info,
            user_1, dolj_user_1,
            num_visit, num_staff, area,
            num_doc_pre,date_doc_pre,department_pre,fl_no,    fl_docs//для этих сделать запрос

        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }


    }
    //102 - ЧЛ 2
    generate2_ch = async (dto: genDocDTO3) => {

        let id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____",
            technical = "", no_appeal = "",
            d_beg = "", m_beg = "", y_beg = "", d_end = "", m_end = "", y_end = "",
            d_send = "", m_send = "", y_send = "", hp = "", vyb = "", planir = "", vnepl = "",
            subj = "", subj_addr = "", place_addr = "", boss_name = "",
            boss_tel = "", addr_yur = "", addr_fact = "", unp = "", fl_proizv = "", fl_rozn = "", fl_opt = "",
            agent = "", post_agent = "", name_agent = "", comm = "", other_info = "",
            imp = "", exp = "", user_1 = "", dolj_user_1 = "",
            num_doc_pre = "", date_doc_pre = "", department_pre = "", fl_no = "", fl_docs = ""
            //supbp="", fl_docum_made="", num_docum_made="", date_docum_made=""

            ;
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/102 - ЧЛ.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }
        let sql = `
        SELECT   @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
                                                        s.addr_record ,
                                                        IFNULL(s.num_doc,"") num_doc,
                                                        
        @fl_rec:=s.fl_rec,
        IFNULL(concat_ws("  ","да ",technical) ,"")     technical,
        CASE 
          WHEN IFNULL(technical,"")="" THEN "нет "
          ELSE  ""
        END no_appeal,
        
        IFNULL(DAY(DATE(s.date_doc)) ,"")        d_beg,
        IFNULL(MONTH(DATE(s.date_doc)) ,"")      m_beg,
        IFNULL(YEAR(s.date_doc)  ,"")            y_beg,

        IFNULL(DAY(DATE(s.date_book))  ,"")     d_end,
        IFNULL(MONTH(DATE(s.date_book)) ,"")    m_end,
        IFNULL(YEAR(DATE(s.date_book)),"")      y_end,
        

        IFNULL(DAY(DATE(s.date_rec))  ,"")       d_send,
        IFNULL(MONTH(DATE(s.date_rec)) ,"")      m_send,
        IFNULL(YEAR(DATE(s.date_rec))  ,"")      y_send,
        @hp:=@vyb:=@vnepl:=@planir:="",
        CASE 
          WHEN e.id_unit_4 = 91 AND e.id_unit_3=80 THEN @hp:=     "V"
          WHEN e.id_unit_4 = 91 AND e.id_unit_3=81 THEN @vyb:=    "V"
          WHEN e.id_unit_4 = 91 AND e.id_unit_3=82 THEN @vnepl:=  "V"
          WHEN e.id_unit_4 = 91 AND e.id_unit_3=83 THEN @planir:= "V"
          ELSE ""
        END d,
        @hp hp,@vyb vyb, @vnepl vnepl, @planir planir,

        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")           date_doc,

        IFNULL(ss.unp,"")                                   unp,
        IFNULL(ss.subj,"")                                  subj, 
        IFNULL(ss.addr_yur,"")                              subj_addr,
        IFNULL(ss.addr_fact,"")                             place_addr,
        IFNULL(ss.boss_name,"")                             boss_name,
        IFNULL(ss.boss_tel,"")                              boss_tel,
        IFNULL(ss.addr_yur,"")                              addr_yur,
        IFNULL(ss.addr_fact,"")                             addr_fact,
        CASE
           WHEN  MAX( sc.fl_proizv) = 0 THEN "нет"
           WHEN  MAX( sc.fl_proizv) = 1 THEN "да"
           ELSE ""
        END fl_proizv,#fl_proizv,fl_rozn fl_opt
        CASE
           WHEN  MAX(sc.fl_rozn) = 0 THEN "нет"
           WHEN  MAX( sc.fl_rozn) = 1 THEN "да"
           ELSE ""
        END fl_rozn,
        CASE
           WHEN  MAX( sc.fl_opt) = 0 THEN "нет"
           WHEN  MAX( sc.fl_opt) = 1 THEN "да"
           ELSE ""
        END fl_opt, 
       
        @perio:= CONCAT_WS
        ("  ",
          DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y")," - ",
          DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),
          case WHEN e.date_stop IS NOT NULL THEN
                  CONCAT_WS(""," (период продления: ",DATE_FORMAT(DATE(e.date_stop), "%d.%m.%Y")," - ",
                  DATE_FORMAT(DATE(e.date_continue), "%d.%m.%Y"),")"  )
               ELSE ""
          END
        ),
         
        case    WHEN @perio IS NOT NULL   THEN  @perio
            ELSE "c ___ ________20__г. по ___ ________20__г."
        END                                                 perio, 

        IFNULL(CONCAT_WS(' ',e.post_agent,e.name_agent),"") agent,
        IFNULL(e.post_agent,"")                             post_agent ,
        IFNULL(e.name_agent,"")                             name_agent ,
        IFNULL(s.other_info,"")                             other_info,
        IFNULL(s.comm,"")                                   comm
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_sopb_card_subj sc ON sc.id_subj = e.id_subj
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        WHERE ss.active=1 AND s.active=1 AND e.active=1  AND e.org=1   AND s.org=1  
        AND  s.id_list= ${dto.id_list}#7002
        AND e.num_order="${dto.num_order}"`;
        console.log(sql);
        
        const result = await AppDataSource.manager.query(`
        SELECT   @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
                                                        s.addr_record ,
                                                        IFNULL(s.num_doc,"") num_doc,
                                                        
        @fl_rec:=s.fl_rec,
        IFNULL(concat_ws("  ","да ",technical) ,"")     technical,
        CASE 
          WHEN IFNULL(technical,"")="" THEN "нет "
          ELSE  ""
        END no_appeal,
        
        IFNULL(DAY(DATE(s.date_doc)) ,"")        d_beg,
        IFNULL(MONTH(DATE(s.date_doc)) ,"")      m_beg,
        IFNULL(YEAR(s.date_doc)  ,"")            y_beg,

        IFNULL(DAY(DATE(s.date_book))  ,"")     d_end,
        IFNULL(MONTH(DATE(s.date_book)) ,"")    m_end,
        IFNULL(YEAR(DATE(s.date_book)),"")      y_end,
        

        IFNULL(DAY(DATE(s.date_rec))  ,"")       d_send,
        IFNULL(MONTH(DATE(s.date_rec)) ,"")      m_send,
        IFNULL(YEAR(DATE(s.date_rec))  ,"")      y_send,
        @hp:=@vyb:=@vnepl:=@planir:="",
        CASE 
          WHEN e.id_unit_4 = 91 AND e.id_unit_3=80 THEN @hp:=     "V"
          WHEN e.id_unit_4 = 91 AND e.id_unit_3=81 THEN @vyb:=    "V"
          WHEN e.id_unit_4 = 91 AND e.id_unit_3=82 THEN @vnepl:=  "V"
          WHEN e.id_unit_4 = 91 AND e.id_unit_3=83 THEN @planir:= "V"
          ELSE ""
        END d,
        @hp hp,@vyb vyb, @vnepl vnepl, @planir planir,

        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")           date_doc,

        IFNULL(ss.unp,"")                                   unp,
        IFNULL(ss.subj,"")                                  subj, 
        IFNULL(ss.addr_yur,"")                              subj_addr,
        IFNULL(ss.addr_fact,"")                             place_addr,
        IFNULL(ss.boss_name,"")                             boss_name,
        IFNULL(ss.boss_tel,"")                              boss_tel,
        IFNULL(ss.addr_yur,"")                              addr_yur,
        IFNULL(ss.addr_fact,"")                             addr_fact,
        CASE
           WHEN  MAX( sc.fl_proizv) = 0 THEN "нет"
           WHEN  MAX( sc.fl_proizv) = 1 THEN "да"
           ELSE ""
        END fl_proizv,#fl_proizv,fl_rozn fl_opt
        CASE
           WHEN  MAX(sc.fl_rozn) = 0 THEN "нет"
           WHEN  MAX( sc.fl_rozn) = 1 THEN "да"
           ELSE ""
        END fl_rozn,
        CASE
           WHEN  MAX( sc.fl_opt) = 0 THEN "нет"
           WHEN  MAX( sc.fl_opt) = 1 THEN "да"
           ELSE ""
        END fl_opt, 
       
        @perio:= CONCAT_WS
        ("  ",
          DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y")," - ",
          DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),
          case WHEN e.date_stop IS NOT NULL THEN
                  CONCAT_WS(""," (период продления: ",DATE_FORMAT(DATE(e.date_stop), "%d.%m.%Y")," - ",
                  DATE_FORMAT(DATE(e.date_continue), "%d.%m.%Y"),")"  )
               ELSE ""
          END
        ),
         
        case    WHEN @perio IS NOT NULL   THEN  @perio
            ELSE "c ___ ________20__г. по ___ ________20__г."
        END                                                 perio, 

        IFNULL(CONCAT_WS(' ',e.post_agent,e.name_agent),"") agent,
        IFNULL(e.post_agent,"")                             post_agent ,
        IFNULL(e.name_agent,"")                             name_agent ,
        IFNULL(s.other_info,"")                             other_info,
        IFNULL(s.comm,"")                                   comm
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_sopb_card_subj sc ON sc.id_subj = e.id_subj
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        WHERE ss.active=1 AND s.active=1 AND e.active=1  AND e.org=1   AND s.org=1  
        AND  s.id_list= ${dto.id_list}#7002
        AND e.num_order="${dto.num_order}" `);//'1   /П'   100008077  100297103

        if (result.length > 0) {
            console.log("result= " + result);
            id_event_order = result[0].id_event_order;
            fl_proizv = result[0].fl_proizv;
            fl_rozn = result[0].fl_rozn;
            fl_opt = result[0].fl_opt;
            d_beg = result[0].d_beg;
            m_beg = result[0].m_beg;
            y_beg = result[0].y_beg;
            d_end = result[0].d_end;
            m_end = result[0].m_end;
            y_end = result[0].y_end;
            d_send = result[0].d_send;
            m_send = result[0].m_send;
            y_send = result[0].y_send;
            hp = result[0].hp;
            vyb = result[0].vyb;
            vnepl = result[0].vnepl,
                planir = result[0].planir;
            num_doc = result[0].num_doc;
            technical = result[0].technical;
            no_appeal = result[0].no_appeal,
                date_doc = result[0].date_doc;
            subj = result[0].subj,
                subj_addr = result[0].subj_addr,
                place_addr = result[0].place_addr,
                boss_name = result[0].boss_name,
                boss_tel = result[0].boss_tel,
                addr_yur = result[0].addr_yur,
                addr_fact = result[0].addr_fact,
                //perio = result[0].perio,
                unp = result[0].unp,
                fl_proizv = result[0].fl_proizv,
                fl_rozn = result[0].fl_rozn,
                fl_opt = result[0].fl_opt,
                agent = result[0].agent,
                post_agent = result[0].post_agent,
                name_agent = result[0].name_agent,
                other_info = result[0].other_info,
                comm = result[0].comm;

        }

        //1.9 Номенклатура изготавливаемых СОПБиП (наименование, тип (вид), марка, модель)
        //let result2: any;
        //if (sphera == 5 || sphera == 4) {
        //result2 = await AppDataSource.manager.query(`
        const result2 = await AppDataSource.manager.query(`
            
        SELECT 
        CONCAT_WS(" ",l.name, l.brend, l.model)             supbp ,
        IF(l.fl_docum_made =0,"нет","да")                   fl_docum_made,
        IFNULL(l.num_docum_made,"")                         num_docum_made  ,
        DATE_FORMAT(DATE(l.date_docum_made), "%d.%m.%Y")    date_docum_made
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_sopb_card_subj sc ON sc.id_subj = e.id_subj
        LEFT JOIN mchs.s_sopb_card_subj_list l ON l.id_subj_sopb=sc.id_data
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        WHERE ss.active=1 AND s.active=1 AND l.active=1 AND e.active=1  AND e.org=1   AND s.org=1  
        AND fl_mnf_exp=1  AND s.id_form=312 
        AND e.id_event_order=${id_event_order} `);

        if (result2.length > 0) {
            result2
        }
        //} else { nop2 = "нарушений не выявлено" }
        //1.11 Номенклатура выпускаемыз в обращение (реализуемых) СОПБ иП
        const result21 = await AppDataSource.manager.query(`
        SELECT 
        CONCAT_WS(" ",l.name, l.brend, l.model) supbp ,
        IF(l.fl_docum_sale =0,"нет","да") fl_docum_made,
        IFNULL(l.num_docum_sale,"") num_docum_made  ,
        "" fl_docs,#ВНИМАНИЕ!!! НЕ ОПРЕДЕЛЕНО!
        IFNULL(DATE_FORMAT(DATE(l.date_docum_sale), "%d.%m.%Y"),"") date_docum_made
        
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_sopb_card_subj sc ON sc.id_subj = e.id_subj
        LEFT JOIN mchs.s_sopb_card_subj_list l ON l.id_subj_sopb=sc.id_data
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        WHERE ss.active=1 AND s.active=1 AND l.active=1 AND e.active=1  AND e.org=1   AND s.org=1  
        AND fl_mnf_exp=0 AND s.id_form=312
        AND e.id_event_order=${id_event_order};`);
        if (result21.length > 0) {
            //console.log("result21=   " + result21);

        }
        //Импорт
        const result3 = await AppDataSource.manager.query(`
        SELECT GROUP_CONCAT(" ",ss.state ) imp
        FROM mchs.s_sopb_card_subj cs
        LEFT JOIN  mchs.s_sopb_card_subj_state s ON cs.id_data=s.id_data
        LEFT JOIN mchs.s_state ss ON ss.id_state = s.id_state
        LEFT JOIN mchs.s_events_order e ON e.id_subj=cs.id_subj 
        WHERE e.id_event_order=${id_event_order} AND ss.fl_eaes=1 AND ss.active= 1  
        AND cs.active= 1 AND s.active = 1 AND  fl_imp_exp=0;`);
        if (result3.length > 0) {
            //console.log("result3=   " + result3);
            imp = result3[0].imp
        }
        //Экспорт
        const result4 = await AppDataSource.manager.query(`
        SELECT GROUP_CONCAT(" ",ss.state ) exp
        FROM mchs.s_sopb_card_subj cs
        LEFT JOIN  mchs.s_sopb_card_subj_state s ON cs.id_data=s.id_data
        LEFT JOIN mchs.s_state ss ON ss.id_state = s.id_state
        LEFT JOIN mchs.s_events_order e ON e.id_subj=cs.id_subj 
        WHERE e.id_event_order=${id_event_order} AND ss.fl_eaes=1 AND ss.active= 1  
        AND cs.active= 1 AND s.active = 1 AND  fl_imp_exp=1;`);
        if (result4.length > 0) {
            //console.log("result4=   " + result4);
            exp = result4[0].exp
        }
        //Вопросы чеклиста и данные к ним
        const result5 = await AppDataSource.manager.query(`
        SELECT d.num_question num_que,
        d.rule_punct que,
        short_tnpa,
        #row_number() OVER ()  n1,row_number() OVER (ORDER BY d.num_question DESC) AS n2,
        q.chl_fl_yes,
        @y:=@n:=@nn:="",
                CASE 
                   WHEN q.chl_fl_yes = 0  THEN @y:=     "V"
                   WHEN q.chl_fl_yes = 1  THEN @n:=     "V"
                   WHEN q.chl_fl_yes = 2  THEN @nn:=    "V"
                   ELSE ""
                END d,
        @y fl_yes,@n fl_no, @nn fl_no_need,
        q.chl_comm 
        FROM mchs.s_events_order_que_def q
        LEFT JOIN mchs.s_defection d ON d.id_def=q.id_def
        WHERE q.id_event_order=${id_event_order} ORDER BY q.num_reg;`);
        if (result5.length > 0) {
            console.log("result5=   " + result5);

        }


        //Руководитель user_1 
        const result6 = await AppDataSource.manager.query(` 
     
        SELECT  uu .fio user_1,j.job dolj_user_1
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                 WHERE   uu.active=1 #AND uu.org=1 AND g.active=1 AND g.org=1  
                    AND ug.active=1 #AND ug.org=1 #j.active=1 and 
                    AND ug.type_user in(1) AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order}   ;`);
        if (result6.length > 0) {
            user_1 = result6[0].user_1,
                dolj_user_1 = result6[0].dolj_user_1

        }

        const data = {
            result: result, result2: result2, result5: result5, result21: result21,
            num_doc, date_doc,
            technical, no_appeal,
            d_beg, m_beg, y_beg, d_end, m_end, y_end,
            d_send, m_send, y_send, hp, vyb, planir, vnepl,
            subj, subj_addr, place_addr, boss_name,
            boss_tel, addr_yur, addr_fact, unp, fl_proizv, fl_rozn, fl_opt,
            agent, post_agent, name_agent, comm, other_info,
            imp, exp, user_1, dolj_user_1,
            num_doc_pre, date_doc_pre, department_pre, fl_no, fl_docs//для этих сделать запрос

        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }



    }
    //103 - ЧЛ 1
    generate3_ch = async (dto: genDocDTO3) => {
// не работает пока что . в процессе
        let id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____",
            technical = "", no_appeal = "",
            d_beg = "", m_beg = "", y_beg = "", d_end = "", m_end = "", y_end = "",
            d_send = "", m_send = "", y_send = "", hp = "", vyb = "", planir = "",vnepl = "",
            subj = "", subj_addr = "", place_addr = "", boss_name = "",
            boss_tel = "", addr_yur = "", addr_fact = "", unp = "", fio_fireman= "",
            //fl_proizv = "", fl_rozn = "", fl_opt = "",
            agent = "", post_agent = "", name_agent = "", comm = "", other_info = "",
            user_1 = "", dolj_user_1 = "",
            num_doc_pre="",date_doc_pre="",department_pre="",fl_no ="",fl_docs="",
            num_visit="", num_staff="", area=""
            //supbp="", fl_docum_made="", num_docum_made="", date_docum_made=""

            ;
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/nadz/103 - ЧЛ.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }

        const result = await AppDataSource.manager.query(`
        SELECT   @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
                                                        s.addr_record ,
                                                        IFNULL(s.num_doc,"") num_doc,
                                                        
        @fl_rec:=s.fl_rec,
        IFNULL(concat_ws("  ","да ",technical) ,"")     technical,
        CASE 
          WHEN IFNULL(technical,"")="" THEN "нет "
          ELSE  ""
        END no_appeal,
        
        IFNULL(DAY(DATE(s.date_doc)) ,"")        d_beg,
        IFNULL(MONTH(DATE(s.date_doc)) ,"")      m_beg,
        IFNULL(YEAR(s.date_doc)  ,"")            y_beg,

        IFNULL(DAY(DATE(s.date_book))  ,"")     d_end,
        IFNULL(MONTH(DATE(s.date_book)) ,"")    m_end,
        IFNULL(YEAR(DATE(s.date_book)),"")      y_end,
        

        IFNULL(DAY(DATE(s.date_rec))  ,"")       d_send,
        IFNULL(MONTH(DATE(s.date_rec)) ,"")      m_send,
        IFNULL(YEAR(DATE(s.date_rec))  ,"")      y_send,
        @hp:=@vyb:=@vnepl:=@planir:="",
        CASE 
          WHEN e.id_unit_4 = 91 AND e.id_unit_3=80 THEN @hp:=     "V"
          WHEN e.id_unit_4 = 91 AND e.id_unit_3=81 THEN @vyb:=    "V"
          WHEN e.id_unit_4 = 91 AND e.id_unit_3=82 THEN @vnepl:=  "V"
          WHEN e.id_unit_4 = 91 AND e.id_unit_3=83 THEN @planir:= "V"
          ELSE ""
        END d,
        @hp hp,@vyb vyb, @vnepl vnepl, @planir planir,

        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")           date_doc,

        IFNULL(ss.unp,"")                                   unp,
        IFNULL(ss.subj,"")                                  subj, 
        IFNULL(ss.addr_yur,"")                              subj_addr,
        IFNULL(ss.addr_fact,"")                             place_addr,
        IFNULL(ss.boss_name,"")                             boss_name,
        IFNULL(ss.boss_tel,"")                              boss_tel,
        IFNULL(ss.addr_yur,"")                              addr_yur,
        IFNULL(ss.addr_fact,"")                             addr_fact,
       
        IFNULL(CONCAT_WS(' ',e.post_agent,e.name_agent),"") agent,
        IFNULL(e.post_agent,"")                             post_agent ,
        IFNULL(e.name_agent,"")                             name_agent ,
        IFNULL(s.other_info,"")                             other_info,
        IFNULL(s.comm,"")                                   comm
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        WHERE ss.active=1 AND s.active=1 AND e.active=1  AND e.org=0   AND s.org=0  
        AND  e.num_order="${dto.num_order}" AND  s.id_list=${dto.id_list}  `);//'1   /П'   100008077  100297103

        if (result.length > 0) {
            id_event_order = result[0].id_event_order;
            d_beg = result[0].d_beg;
            m_beg = result[0].m_beg;
            y_beg = result[0].y_beg;
            d_end = result[0].d_end;
            m_end = result[0].m_end;
            y_end = result[0].y_end;
            d_send = result[0].d_send;
            m_send = result[0].m_send;
            y_send = result[0].y_send;
            hp = result[0].hp;
            vyb = result[0].vyb;
            vnepl = result[0].vnepl,
            planir = result[0].planir;
            num_doc = result[0].num_doc;
            technical = result[0].technical;
            no_appeal = result[0].no_appeal,
            date_doc = result[0].date_doc;
            subj = result[0].subj,
            subj_addr = result[0].subj_addr,
            place_addr = result[0].place_addr,
            boss_name = result[0].boss_name,
            boss_tel = result[0].boss_tel,
            addr_yur = result[0].addr_yur,
            addr_fact = result[0].addr_fact,
            //perio = result[0].perio,
            unp = result[0].unp,
            agent = result[0].agent,
            post_agent = result[0].post_agent,
            name_agent = result[0].name_agent,
            other_info = result[0].other_info,
            comm = result[0].comm;

        }
        
        // ХАРАКТЕРИСТИКИ ПРОВЕРЯЕМОГО СУБЪЕКТА: num_visit, num_staff,  area
        const result_char = await AppDataSource.manager.query(`
        SELECT SUM(os.num_visit) num_visit, SUM(os.num_staff) num_staff, SUM( os.area) area,
        GROUP_CONCAT(DISTINCT o.fio_fireman) fio_fireman
        FROM mchs.s_subj_obj_specif os
        LEFT JOIN mchs.s_subj_obj o ON o.id_obj=os.id_subj_obj
        LEFT JOIN mchs.s_subj s ON s.id_subj=o.id_subj
        WHERE s.unp="${dto.unp}" AND s.active=1 AND o.active=1 AND o.org=0 AND os.active=1  
        GROUP BY s.unp`);

        if (result_char.length > 0) {
            num_visit = result_char[0].num_visit,
            num_staff = result_char[0].num_staff,
            area = result_char[0].area,
            fio_fireman = result_char[0].fio_fireman
        }
        //Сведения об имеющихся в субъекте хозяйствования сооружениях Таблица 1 ЧЕК-ЛИСТ 1
        const result_build = await AppDataSource.manager.query(`
        SELECT su.type,os.area ,os.name_build

        FROM mchs.s_subj_obj_specif os
        LEFT JOIN mchs.s_units su ON os.id_unit_6=su.id_unit
        LEFT JOIN mchs.s_subj_obj o ON o.id_obj=os.id_subj_obj
        LEFT JOIN mchs.s_subj s ON s.id_subj=o.id_subj
        WHERE s.unp="${dto.unp}" AND s.active=1 AND o.active=1 AND o.org=0 AND os.active=1  
        ;`);
        if (result_build.length > 0) {
            result_build
        }
        //кол-во ЗДАНИЙ id_unit_41=4000, суммарная площадь по Классу функциональной пожарной безопасности Ф.1.1 -Ф.5.4
        const result_buildF = await AppDataSource.manager.query(`
        SELECT count( o.id_unit_6 )  AS num,su.type, SUM(o.area) area#,suz.name,COUNT(o.id_unit_41)#

        /*CASE 
        WHEN su.type = "Ф.1.1" THEN @t:=num f11 AND @p:= pl p11 end
        WHEN su.type = "Ф.1.2" THEN f12=num AND p12=pl
        WHEN su.type = "Ф.1.3" THEN f13=num AND p13=pl
        WHEN su.type = "Ф.1.4" THEN f14=num AND p14=pl
        WHEN su.type = "Ф.2.2" THEN f21=num AND p21=pl
        ELSE NULL
        END c*/
        FROM mchs.s_subj s 
        LEFT JOIN mchs.s_subj_obj so ON s.id_subj=so.id_subj
        right JOIN mchs.s_subj_obj_specif o ON o.id_subj_obj=so.id_obj
        LEFT JOIN mchs.s_units su ON o.id_unit_6 =su.id_unit
        #LEFT JOIN mchs.s_units suz ON o.id_unit_41 =suz.id_unit
        WHERE s.unp="${dto.unp}" AND id_unit_41=4000#AND org=1#100297103 1446 #100008077 1385
        AND so.active=1 AND o.active=1 AND so.org=0 AND so.active=1
        GROUP BY o.id_unit_6
                ;`);
        if (result_build.length > 0) {
            result_build
        }
        
        //кол-во ПОМЕЩЕНИЙ, суммарная площадь по Классу функциональной пожарной безопасности Ф.1.1 -Ф.5.4
        const result_buildR = await AppDataSource.manager.query(`
        SELECT count( o.id_unit_6 )  AS num,su.type, SUM(o.area) area#,suz.name,COUNT(o.id_unit_41)#

        FROM mchs.s_subj s 
        LEFT JOIN mchs.s_subj_obj so ON s.id_subj=so.id_subj
        right JOIN mchs.s_subj_obj_specif o ON o.id_subj_obj=so.id_obj
        LEFT JOIN mchs.s_units su ON o.id_unit_6 =su.id_unit
        #LEFT JOIN mchs.s_units suz ON o.id_unit_41 =suz.id_unit
        WHERE s.unp="${dto.unp}" AND id_unit_41=4003#AND org=1#100297103 1446 #100008077 1385
        AND so.active=1 AND o.active=1 AND so.org=0 AND so.active=1
        GROUP BY o.id_unit_6 ;`);

        // let obj_zd_keys = //{'1': 10, '2': 2, '3': 130};
        // ["Ф.1.1","Ф.1.2","Ф.1.3","Ф.1.4",
        //  "Ф.2.1","Ф.2.2","Ф.2.3","Ф.2.4",
        //  "Ф.3.1","Ф.3.2","Ф.3.3","Ф.3.4","Ф.3.5","Ф.3.6",
        //  "Ф.4.1","Ф.4.2","Ф.4.3","Ф.4.4",
        //  "Ф.5.1","Ф.5.2","Ф.5.3","Ф.5.4"];
        
        let zd = //{'1': 10, '2': 2, '3': 130};
        {"Ф.1.1":"","Ф.1.2":"","Ф.1.3":"","Ф.1.4":"",
         "Ф.2.1":"","Ф.2.2":"","Ф.2.3":"","Ф.2.4":"",
         "Ф.3.1":"","Ф.3.2":"","Ф.3.3":"","Ф.3.4":"","Ф.3.5":"","Ф.3.6":"","Ф.3.7":"",
         "Ф.4.1":"","Ф.4.2":"","Ф.4.3":"","Ф.4.4":"",
         "Ф.5.1":"","Ф.5.2":"","Ф.5.3":"","Ф.5.4":""};
        
        let p = //{'1': 10, '2': 2, '3': 130};
        {"Ф.1.1":"","Ф.1.2":"","Ф.1.3":"","Ф.1.4":"",
         "Ф.2.1":"","Ф.2.2":"","Ф.2.3":"","Ф.2.4":"",
         "Ф.3.1":"","Ф.3.2":"","Ф.3.3":"","Ф.3.4":"","Ф.3.5":"","Ф.3.6":"","Ф.3.7":"",
         "Ф.4.1":"","Ф.4.2":"","Ф.4.3":"","Ф.4.4":"",
         "Ф.5.1":"","Ф.5.2":"","Ф.5.3":"","Ф.5.4":""};
         
        let obj_zd = Object.assign({}, zd) ;
        let obj_p  = Object.assign({}, p);

        let obj_zdS = Object.assign({}, zd);//сооружения
        let obj_pS  = Object.assign({}, p);

        let obj_zdP = Object.assign({}, zd);//помещения
        let obj_pP  = Object.assign({}, zd);
        
         
        
        let obj_zd_key = [];//для теста
        let obj_zd_val = [];//для теста
    if (result_buildF.length > 0) {
        Object.keys(obj_zd).forEach((key)=> {
            obj_zd_key.push(key);
            for(let i=0; i<result_buildF.length; i++){
                if (key === result_buildF[i].type) {
                    obj_zd[key] = result_buildF[i].num;
                    obj_zd_val.push(result_buildF[i].num);//для теста
                } else { obj_zd_val.push("");//для теста
                }
            }
        });
        Object.keys(obj_p).forEach((key)=> {
            for(let i=0; i<result_buildF.length; i++){
                if (key === result_buildF[i].type) {
                    obj_p[key] = result_buildF[i].area;
                } 
            }
        });
    }
    //кол-во СООРУЖЕНИЙ id_unit_41=4001, суммарная площадь по Классу функциональной пожарной безопасности Ф.1.1 -Ф.5.4
    const result_buildS = await AppDataSource.manager.query(`
    SELECT count( o.id_unit_6 )  AS num,su.type, SUM(o.area) area#,suz.name,COUNT(o.id_unit_41)#

    FROM mchs.s_subj s 
    LEFT JOIN mchs.s_subj_obj so ON s.id_subj=so.id_subj
    right JOIN mchs.s_subj_obj_specif o ON o.id_subj_obj=so.id_obj
    LEFT JOIN mchs.s_units su ON o.id_unit_6 =su.id_unit
    #LEFT JOIN mchs.s_units suz ON o.id_unit_41 =suz.id_unit
    WHERE s.unp="${dto.unp}" AND id_unit_41=4001#AND org=1#100297103 1446 #100008077 1385
    AND so.active=1 AND o.active=1 AND so.org=0 AND so.active=1
    GROUP BY o.id_unit_6
            ;`);
    if (result_buildS.length > 0) {
        result_buildS
    }
    if (result_buildS.length > 0) {
        Object.keys(obj_zdS).forEach((key)=> {
            obj_zd_key.push(key);
            for(let i=0; i<result_buildS.length; i++){
                if (key === result_buildS[i].type) {
                    obj_zdS[key] = result_buildS[i].num;
                    obj_zd_val.push(result_buildS[i].num);//для теста
                } else { obj_zd_val.push("");//для теста
                }
            }
        });
        Object.keys(obj_pS).forEach((key)=> {
            for(let i=0; i<result_buildS.length; i++){
                if (key === result_buildS[i].type) {
                    obj_pS[key] = result_buildS[i].area;
                } 
            }
        });
    }
    if (result_buildR.length > 0) {
        Object.keys(obj_zdP).forEach((key)=> {
            for(let i=0; i<result_buildR.length; i++){
                if (key === result_buildR[i].type) {
                    obj_zdP[key] = result_buildR[i].num;
                } 
            }
        });
        Object.keys(obj_pP).forEach((key)=> {
            for(let i=0; i<result_buildR.length; i++){
                if (key === result_buildR[i].type) {
                    obj_pP[key] = result_buildR[i].area;
                } 
            }
        });
    }
        //Таблица 3 Чл1
         let obj_3 = {
            "А":"" ,"Б":"" ,"В":"" ,"Г":"" ,"Д":"",
            "Ан":"","Бн":"","Вн":"","Гн":"","Дн":""
         };
         
        let obj_zd3 = Object.assign({}, obj_3) ;//здания
        let obj_p3  = Object.assign({}, obj_3);

        let obj_zd3S = Object.assign({}, obj_3);//сооружения
        let obj_p3S  = Object.assign({}, obj_3);
        
        let obj_zd3N = Object.assign({}, obj_3);//сооружения
        let obj_p3N  = Object.assign({}, obj_3);

        let obj_zd3P = Object.assign({}, obj_3);//помещения
        let obj_p3P  = Object.assign({}, obj_3);
        
        //Количество зданий/наружных установок по Категориям по взрывопожарной и пожарной опасности
        const result_t3 = await AppDataSource.manager.query(`
        SELECT count( o.id_unit_17 )  num, MAX(o.id_unit_41) type, SUM(o.area) area ,MAX(su.type)letter #,    count( o.id_unit_41 ) num6 ,MAX(suz.name) ,MAX(suz.id_unit)
        FROM mchs.s_subj s 
        LEFT JOIN mchs.s_subj_obj so ON s.id_subj=so.id_subj
        right JOIN mchs.s_subj_obj_specif o ON o.id_subj_obj=so.id_obj
        LEFT JOIN mchs.s_units su ON o.id_unit_17 =su.id_unit
        LEFT JOIN mchs.s_units suz ON o.id_unit_41 =suz.id_unit
        WHERE s.unp="${dto.unp}" AND so.org=1 #AND suz.id_unit=4000# AND id_unit_17=4000#100297103 1446 #100008077 1385
        AND so.active=1 AND o.active=1 AND so.org=0 AND so.active=1
        GROUP BY o.id_unit_17,
        o.id_unit_41
        ;`);
        console.log('result_t3: '+result_t3);
        //obj_zd3 obj_zd3S obj_zd3N obj_zd3P
        //obj_p3  obj_p3S obj_p3N obj_p3P
        
        if (result_t3.length > 0) {
            //здания
            Object.keys(obj_zd3).forEach((key)=> {// кол-вo
                for(let i=0; i<result_t3.length; i++){
                    if (key === result_t3[i].letter) {
                        if(result_t3[i].type == 4000) {obj_zd3[key]  = result_t3[i].num};
                    } 
                }
            });
            Object.keys(obj_p3).forEach((key)=> {//площадь
                for(let i=0; i<result_t3.length; i++){
                    if (key === result_t3[i].letter) {
                        if(result_t3[i].type == 4000) {obj_p3[key]  = result_t3[i].area};
                    } 
                }
            });
            //сооружения
            Object.keys(obj_zd3S).forEach((key)=> {//кол-во
                for(let i=0; i<result_t3.length; i++){
                    if (key === result_t3[i].letter) {
                        if(result_t3[i].type == 4001) {obj_zd3S[key] = result_t3[i].num};
                    } 
                }
            });
            Object.keys(obj_p3S).forEach((key)=> {//площадь
                for(let i=0; i<result_t3.length; i++){
                    if (key === result_t3[i].letter) {
                        if(result_t3[i].type == 4001) {obj_p3S[key] = result_t3[i].area};
                    } 
                }
            });
            //наружные установки
            Object.keys(obj_zd3N).forEach((key)=> {//кол-во
                for(let i=0; i<result_t3.length; i++){
                    if (key === result_t3[i].letter) {
                        if(result_t3[i].type == 4002) {obj_zd3N[key] = result_t3[i].num};
                    } 
                }
            });
            Object.keys(obj_p3N).forEach((key)=> {//площадь
                for(let i=0; i<result_t3.length; i++){
                    if (key === result_t3[i].letter) {
                        if(result_t3[i].type == 4002) {obj_p3N[key] = result_t3[i].area};
                    } 
                }
            });
            //помещения
            Object.keys(obj_zd3P).forEach((key)=> {//кол-во
                for(let i=0; i<result_t3.length; i++){
                    if (key === result_t3[i].letter) {
                        if(result_t3[i].type == 4003) {obj_zd3P[key] = result_t3[i].num};
                    } 
                }
            });
            Object.keys(obj_p3P).forEach((key)=> {//площадь
                for(let i=0; i<result_t3.length; i++){
                    if (key === result_t3[i].letter) {
                        if(result_t3[i].type == 4003) {obj_p3P[key] = result_t3[i].area};
                    } 
                }
            });
        }
         
       
        //Вопросы чеклиста и данные к ним
        const result5 = await AppDataSource.manager.query(`
        SELECT d.num_question num_que,
        d.rule_punct que,
        short_tnpa,
        #row_number() OVER ()  n1,row_number() OVER (ORDER BY d.num_question DESC) AS n2,
        q.chl_fl_yes,
        @y:=@n:=@nn:="",
        CASE 
            WHEN q.chl_fl_yes = 0  THEN @y:=     "V"
            WHEN q.chl_fl_yes = 1  THEN @n:=     "V"
            WHEN q.chl_fl_yes = 2  THEN @nn:=    "V"
            ELSE ""
        END d,
        @y fl_yes,
        @n fl_no, 
        @nn fl_no_need,
        ifnull(q.chl_comm ,"")chl_comm
        FROM mchs.s_events_order_que_def q
        LEFT JOIN mchs.s_form_report sfr ON q.id_form_report=sfr.id_list
        LEFT JOIN mchs.s_defection d ON d.id_def=q.id_def
        WHERE q.id_event_order=${id_event_order} AND sfr.id_list=${dto.id_list} ORDER BY q.num_reg;`);//AND  s.id_list=${dto.id_list}
        if (result5.length > 0) {
            //console.log("result5=   " + result5);
           
        }
        //Руководитель user_1 
        const result6 = await AppDataSource.manager.query(` 
     
        SELECT  uu .fio user_1,j.job dolj_user_1
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                 WHERE   uu.active=1 #AND uu.org=1 AND g.active=1 AND g.org=0  
                    AND ug.active=1 #AND ug.org=0 #j.active=1 and 
                    AND ug.type_user in(1) AND e.active=1 AND e.org=0 AND e.id_event_order=${id_event_order}   ;`);
        if (result6.length > 0) {
            user_1 = result6[0].user_1,
            dolj_user_1 = result6[0].dolj_user_1
        }
            
        const data = {
            result: result, result5: result5,//result2: result2, result21: result21,
            result_build,
            obj_zdS,obj_pS,obj_zd,obj_p,obj_zdP,obj_pP,//,obj_zd_val,
            obj_zd3, obj_zd3S, obj_zd3N, obj_zd3P,
            obj_p3,  obj_p3S,  obj_p3N,  obj_p3P,
            num_doc, date_doc,
            technical, no_appeal ,
            d_beg , m_beg, y_beg , d_end, m_end, y_end,
            d_send, m_send, y_send, hp, vyb, planir,vnepl,
            subj, subj_addr, place_addr, boss_name,
            boss_tel, addr_yur, addr_fact, unp, fio_fireman,
            agent, post_agent, name_agent, comm, other_info,
            user_1, dolj_user_1,
            num_visit, num_staff, area,
            num_doc_pre,date_doc_pre,department_pre,fl_no,    fl_docs//для этих сделать запрос

        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }


    }
    //1_0 Уведомление о проведении проверки
    generate1_0 = async (dto: genDocDTO3) => {
         console.log(dto);
        let id_subj = 0, id_event = 0, id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = num_doc,
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc,
            perio = reason, reason1 = reason, month_year_plan = "", technical = departament, id_event_plan = null,
            date_end = date_doc, date_begin = date_doc,
            other_info = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament, users = departament,
            boss = num_doc, dolj_boss = num_doc, region_boss = num_doc,
            departament_boss = departament, dolj = dept_iss, region1 = num_doc, region = num_doc;

        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/nadz/1 Уведомление о проведении проверки.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }
        const result = await AppDataSource.manager.query(`
        SELECT @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        e.num_order,di.departament dept_iss,
        (SELECT GROUP_CONCAT(b.name_build SEPARATOR '; ') b 
        FROM s_fire_card_build b WHERE b.id_subj=@ee AND b.active=1)builds ,
        IFNULL(s.num_doc,"") num_doc,
        IFNULL(s.addr_record,"") addr_record,
        DATE(CURDATE()) curdate,
        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")date_doc,
        @db:=IFNULL(DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y"),"")date_begin,
        @de:=IFNULL(DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),"") date_end,
        @do:= CASE p.id_obl
        WHEN 1 THEN " брестской обл."
        WHEN  2 THEN " витебской обл."
        WHEN 3 THEN " гомельской обл."
        WHEN 4 THEN " гродненской обл."
        WHEN 5 THEN "г.Минску"
        WHEN 6 THEN " минской обл."
        WHEN 7 THEN " могилеской обл."
        ELSE "" 
        END id_obl,
        
        CASE 
         WHEN e.id_event_plan is NOT NULL THEN CONCAT("  № ",p.num_order," по ",@do,
            " на ",p.halfyear_event," полугодие ",p.year_plan," г. будет проводиться проверка за период с ",@db, " по ", @de, " г.")
         ELSE " №____ плана выборочных проверок по ____области (г.Минску) будет проводиться проверка за период с  ___________________г. по _____________ г. "
        END reason,
        CASE 
         WHEN e.id_event_plan is  NULL THEN CONCAT_WS(' '," за период с  ",@db, " по ", @de, " г. ",IFNULL(e.name_order,""), IFNULL(e.reason_order,""))
         ELSE " c _____г. по _______ г. внеплановую проверку"
        END reason1,
        CASE 
         WHEN e.id_event_plan is NOT NULL THEN CONCAT_WS(" ",p.month_event,p.year_plan ," г.") 
         ELSE ""
        END month_year_plan,
        u.name sphera,d.departament  dept,
        CONCAT_WS(' ',IFNULL(ss.subj,""), IFNULL(ss.unp,""))subj,
        CONCAT_WS(' - ',
         IFNULL(DATE_FORMAT(DATE(e.period_check_from), "%d.%m.%Y"),""),
         IFNULL(DATE_FORMAT(DATE(e.period_check_to), "%d.%m.%Y"),"")
         ) perio,
        
        IFNULL(CONCAT(e.post_agent,'  ' ,e.name_agent),"") agent,
        IFNULL(e.name_agent,"")name_agent ,
        IFNULL(e.technical,"") technical,
        IFNULL(s.other_info,"")other_info
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
        LEFT JOIN mchs.s_dept d ON d.id_dept=e.id_dept
        LEFT JOIN s_units u ON e.sphera=u.id_unit
        LEFT JOIN mchs.s_events_plan p ON p.id_event_plan=e.id_event_plan
        #LEFT JOIN s_fire_card_build b ON b.id_subj=ss.id_subj
        WHERE ss.active=1 and s.active=1 and di.active=1 AND di.org=0 and d.active=1  AND d.org=0  AND s.org=0 
        and  u.active=1 and  u.active=1 and  s.id_list=${dto.id_list} and #6001
        e.num_order="${dto.num_order}";#id_event_order=100  `);//'1/П'   100008077  100297103


        if (result.length > 0) {
            addr_record = result[0].addr_record;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;
            dept_iss = result[0].dept_iss;
            date_doc = result[0].date_doc;
            dept = result[0].dept,
                sphera = result[0].sphera,
                subj = result[0].subj,
                reason = result[0].reason,
                reason1 = result[0].reason1,
                builds = result[0].builds,
                curdate = result[0].curdate,
                agent = result[0].agent,
                name_agent = result[0].name_agent,
                perio = result[0].perio,
                technical = result[0].technical,
                id_event_plan = result[0].technical,
                date_begin = result[0].date_begin,
                date_end = result[0].date_end,
                month_year_plan = result[0].month_year_plan,
                other_info = result[0].other_info,
                id_event = result[0].id_event,
                id_event_order = result[0].id_event_order;

        }

        //ТНПА, подлежащие проверке 
        const result2 = await AppDataSource.manager.query(` SELECT l.name,#COUNT(*),str.name,t.num,t.name  #
        CONCAT(l.name,': ',GROUP_CONCAT(CONCAT(str.name,'  ',t.num) SEPARATOR '; '))tnpa
        #CONCAT(str.name,'  ',t.num,'  ',t.name)tnpa
        FROM
        mchs.s_events_tnpa e
        LEFT JOIN mchs.s_tnpa_doc t ON t.id_doc=e.id_doc  
        LEFT JOIN mchs.s_tnpa_list l ON l.id_list=t.id_list 
        LEFT JOIN mchs.s_tnpa_str_elem str ON str.id_elem=t.id_elem 
        WHERE e.id_event=${id_event}  AND e.active=1  AND str.active=1 AND l.active=1 AND t.active=1 GROUP BY( l.name)`);
        if (result2.length > 0) {
            tnpa = result2[0].tnpa

        }
        //Перечень вопросов, подлежащих проверке 
        const result3 = await AppDataSource.manager.query(` 
        SELECT 
        CONCAT_WS('. ',ROW_NUMBER() OVER ( ORDER BY e.id_list ) ,q.name_que) questions
            FROM mchs.s_events_order v
            LEFT JOIN mchs.s_events_order_que e ON e.id_event_order=v.id_event_order
            LEFT JOIN s_question q ON q.id_que=e.id_que
            WHERE v.id_event_order=${id_event_order}  AND v.active=1  AND e.active=1 AND q.org=0  AND q.active=1 ;`);
        if (result3.length > 0) {
            questions = result3[0].questions
            //num = result3[0].num

        }
        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
     SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
         SELECT 
                    j.job j,uu .fio f,
                    CASE ug.type_user
                    WHEN 1 THEN "руководитель"
                    WHEN 2 THEN "исполнитель"
                    ELSE "" 
                    END t
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE  j.active=1  # AND j.org=0 and  uu.active=1   AND uu.org=0 
                    AND g.active=1   AND g.org=0 AND  g.org=0 AND ug.active=1  AND  ug.org=0
                    AND ug.type_user not in(0,3) AND  e.org=0 AND e.active=1 AND e.id_event_order=${id_event_order} )dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }
        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT  uu .fio boss,LOWER(d.depart_rod) region1 ,
        CASE ug.type_user
            WHEN 0 THEN "Должн.лицо, направившее чек-лист"
            WHEN  1 THEN "руководитель группы"
            WHEN 2 THEN "инспектор"
            WHEN 3 THEN "Главный государcтвенный инспектор"
            WHEN 4 THEN "Государcтвенный инспектор "
            ELSE "" 
        END       dolj,
        j.job     dolj_boss,
     
        @dpt:=e.id_dept_iss ,@dpt_:=e.id_dept,@dpt_p:=d.id_parent,
        IF(@dpt_p IS  NOT NULL,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt_p AND d.active=1  LIMIT 1),d.departament)departament,
        IF(@dpt IS NOT NULL,di.depart_rod,"") region_boss,
        CASE d.id_obl
            WHEN 1 THEN "брестской обл."
            WHEN  2 THEN "витебской обл."
            WHEN 3 THEN "гомельской обл."
            WHEN 4 THEN "гродненской обл."
            WHEN 5 THEN "г.Минска"
            WHEN 6 THEN "минской обл."
            WHEN 7 THEN "могилеской обл."
            ELSE "" 
        END region
        
    
        FROM 
        mchs.s_events_order e 
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
        LEFT JOIN mchs.s_dept_job j ON j.id_dept_job=uu.id_dept_job
        LEFT JOIN mchs.s_dept d ON e.id_dept=d.id_dept
        LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
        WHERE uu.active=1 #AND uu.org=0
        AND d.active=1 AND d.org=0   
        AND g.active=1 AND g.org=0   AND ug.active=1  
        AND ug.type_user IN (3,4) 
        AND ug.org=0
        and  e.id_event_order=${id_event_order}  ;`);

        if (result5.length > 0) {
            boss = result5[0].boss,
                departament_boss = result5[0].departament_boss,
                dolj_boss = result5[0].dolj_boss,
                region_boss = result5[0].region_boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                dolj = result5[0].dolj

        }
        const data = {
            result3: result3,
            result4: result4,
            addr_record, id_subj, subj, dolj, departament_boss, month_year_plan,
            num_doc, dept_iss, date_doc, dept, sphera, reason, reason1, builds, curdate, agent, name_agent, perio, technical,
            date_begin, date_end, departament, other_info, tnpa, questions, users, region, region1,
            boss, dolj_boss, region_boss

        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }

    }
    //3 - Предписание на проведение проверки
    generate3 = async (dto: genDocDTO3) => {
        //  console.log(dto);
        let id_subj = 0, id_event = 0, id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc,
            perio = reason, technical = departament, date_end = date_doc, date_begin = date_doc, other_info = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament, users = departament,
            region = num_doc, boss = num_doc, region1 = num_doc, departament_boss = departament, dolj = dept_iss;

        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/3 - Предписание на проведение проверки.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }
        const result = await AppDataSource.manager.query(`
           SELECT @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
           e.num_order,di.departament dept_iss,
           (SELECT GROUP_CONCAT(b.name_build SEPARATOR '; ') b 
           FROM s_fire_card_build b WHERE b.id_subj=@ee AND b.active=1)builds ,
           s.num_doc,
           DATE(CURDATE()) curdate,
           DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")date_doc,
           CASE 
            WHEN e.id_event_plan is NOT NULL THEN CONCAT("пункт плана выборочных проверок № ",p.num_order," на ",p.halfyear_event," полугодие ",p.year_plan)
            WHEN e.id_event_plan is  NULL THEN CONCAT_WS(' ',IFNULL(e.name_order,""), IFNULL(e.reason_order,""))
            ELSE ""
           END reason,
           u.name sphera,d.departament  dept,
           CONCAT_WS(' ',IFNULL(ss.subj,""), IFNULL(ss.unp,""))subj,
           CONCAT_WS('-',
            IFNULL(DATE_FORMAT(DATE(e.period_check_from), "%d.%m.%Y"),""),
            IFNULL(DATE_FORMAT(DATE(e.period_check_to), "%d.%m.%Y"),"")
            ) perio,
           IFNULL(DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y"),"")date_begin,
           IFNULL(DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),"") date_end,
           IFNULL(CONCAT(e.post_agent,'  ' ,e.name_agent),"") agent,
           IFNULL(e.name_agent,"")name_agent ,
           IFNULL(e.technical,"") technical,
           IFNULL(s.other_info,"")other_info
           FROM 
           mchs.s_events_order e
           LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
           LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
           LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
           LEFT JOIN mchs.s_dept d ON d.id_dept=e.id_dept
           LEFT JOIN s_units u ON e.sphera=u.id_unit
           LEFT JOIN mchs.s_events_plan p ON p.id_event_plan=e.id_event_plan
           #LEFT JOIN s_fire_card_build b ON b.id_subj=ss.id_subj
           WHERE ss.active=1 and s.active=1 and di.active=1 AND di.org=1 and d.active=1  AND d.org=1  AND s.org=1 
           and  u.active=1 and  u.active=1 and  s.id_list=${dto.id_list} and
           e.num_order=${dto.num_order} `);//'1/П'   100008077  100297103


        if (result.length > 0) {
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;
            dept_iss = result[0].dept_iss;
            date_doc = result[0].date_doc;
            dept = result[0].dept,
                sphera = result[0].sphera,
                subj = result[0].subj,
                reason = result[0].reason,
                builds = result[0].builds,
                curdate = result[0].curdate,
                agent = result[0].agent,
                name_agent = result[0].name_agent,
                perio = result[0].perio,
                technical = result[0].technical,
                date_begin = result[0].date_begin,
                date_end = result[0].date_end,
                other_info = result[0].other_info,
                id_event = result[0].id_event,
                id_event_order = result[0].id_event_order;

        }

        //ТНПА, подлежащие проверке 
        const result2 = await AppDataSource.manager.query(` SELECT l.name,#COUNT(*),str.name,t.num,t.name  #
        CONCAT(l.name,': ',GROUP_CONCAT(CONCAT(str.name,'  ',t.num) SEPARATOR '; '))tnpa
        #CONCAT(str.name,'  ',t.num,'  ',t.name)tnpa
        FROM
        mchs.s_events_tnpa e
        LEFT JOIN mchs.s_tnpa_doc t ON t.id_doc=e.id_doc  
        LEFT JOIN mchs.s_tnpa_list l ON l.id_list=t.id_list 
        LEFT JOIN mchs.s_tnpa_str_elem str ON str.id_elem=t.id_elem 
        WHERE e.id_event=${id_event}  AND e.active=1  AND str.active=1 AND l.active=1 AND t.active=1 GROUP BY( l.name)`);
        if (result2.length > 0) {
            tnpa = result2[0].tnpa

        }
        //Перечень вопросов, подлежащих проверке 
        const result3 = await AppDataSource.manager.query(` 
        SELECT 
        CONCAT_WS('. ',ROW_NUMBER() OVER ( ORDER BY e.id_list ) ,q.name_que) questions
            FROM mchs.s_events_order v
            LEFT JOIN mchs.s_events_order_que e ON e.id_event_order=v.id_event_order
            LEFT JOIN s_question q ON q.id_que=e.id_que
            WHERE v.id_event_order=${id_event_order}  AND v.active=1  AND e.active=1 AND q.org=1  AND q.active=1 ;`);
        if (result3.length > 0) {
            questions = result3[0].questions
            //num = result3[0].num

        }
        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
           SELECT 
           GROUP_CONCAT(CONCAT(j.job,' ',uu .fio) SEPARATOR '; ')users
           FROM 
           mchs.s_events_order e
           LEFT JOIN mchs.group g ON g.id_group=e.id_group
           LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
           LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
           LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
            # GROUP BY ug.id_group 
           WHERE  j.active=1  AND j.org=1 AND uu.active=1 AND uu.org=1 AND g.active=1  AND g.org=1 AND ug.active=1  
           AND ug.org=1 AND ug.type_user not in(0,3,4) AND e.id_event_order=${id_event_order}  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }
        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT  uu .fio boss,LOWER(d.depart_rod) region1 ,
     CASE ug.type_user
      WHEN 0 THEN "Должн.лицо, направившее чек-лист"
        WHEN  1 THEN "руководитель группы"
        WHEN 2 THEN "инспектор"
        WHEN 3 THEN "Главный государcтвенный инспектор"
        WHEN 4 THEN "Государcтвенный инспектор "
        ELSE "" 
        END dolj,
     
        @dpt:=e.id_dept_iss ,@dpt_:=e.id_dept,@dpt_p:=d.id_parent,
        IF(@dpt_p IS  NOT NULL,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt_p AND d.active=1  LIMIT 1),d.departament)departament,
        IF(@dpt IS NOT NULL,di.departament,"") departament_boss,
        CASE d.id_obl
        WHEN 1 THEN "брестской обл."
        WHEN  2 THEN "витебской обл."
        WHEN 3 THEN "гомельской обл."
        WHEN 4 THEN "гродненской обл."
        WHEN 5 THEN "г.Минска"
        WHEN 6 THEN "минской обл."
        WHEN 7 THEN "могилеской обл."
        ELSE "" 
        END region
    
        FROM 
        mchs.s_events_order e 
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
        LEFT JOIN mchs.s_dept d ON e.id_dept=d.id_dept
        LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
        WHERE uu.active=1 AND uu.org=1 AND d.active=1 AND d.org=1   AND g.active=1 AND g.org=1   AND ug.active=1  
        AND ug.type_user IN (3,4) 
        AND ug.org=1
        and  e.id_event_order=${id_event_order}  ;`);
        if (result5.length > 0) {
            boss = result5[0].boss,
                departament_boss = result5[0].departament_boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                dolj = result5[0].dolj

        }
        const data = {
            result3: result3,
            id_subj, subj, dolj, departament_boss,
            num_doc, dept_iss, date_doc, dept, sphera, reason, builds, curdate, agent, name_agent, perio, technical,
            date_begin, date_end, departament, other_info, tnpa, questions, users, region, region1, boss

        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }

    }
    //3 - Предписание на проведение проверки
    generate3_0 = async (dto: genDocDTO3) => {
        //  console.log(dto);
        let id_subj = 0, id_event = 0, id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = num_doc,
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc,
            perio = reason, reason1 = reason, technical = departament, id_event_plan = null,
            date_end = date_doc, date_begin = date_doc,
            other_info = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament, users = departament,
            region = num_doc, boss = num_doc, region_boss = num_doc, dolj_boss = num_doc,
            region1 = num_doc, departament_boss = departament, dolj = dept_iss;

        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/nadz/3 Предписание на проведение проверки.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }
        const result = await AppDataSource.manager.query(`
        SELECT @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        e.num_order,di.departament dept_iss,
        (SELECT GROUP_CONCAT(b.name_build SEPARATOR '; ') b 
        FROM s_fire_card_build b WHERE b.id_subj=@ee AND b.active=1)builds ,
        IFNULL(s.num_doc,"") num_doc,
        IFNULL(s.addr_record,"") addr_record,
        DATE(CURDATE()) curdate,
        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")date_doc,
        @db:=IFNULL(DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y"),"")date_begin,
        @de:=IFNULL(DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),"") date_end,
        @do:= CASE p.id_obl
        WHEN 1 THEN " брестской обл."
        WHEN  2 THEN " витебской обл."
        WHEN 3 THEN " гомельской обл."
        WHEN 4 THEN " гродненской обл."
        WHEN 5 THEN "г.Минску"
        WHEN 6 THEN " минской обл."
        WHEN 7 THEN " могилеской обл."
        ELSE "" 
        END id_obl,
        
        CASE 
         WHEN e.id_event_plan is NOT NULL THEN CONCAT("  № ",p.num_order," плана выборочных проверок по ",@do,
            "области (г.Минску) на ",p.halfyear_event," полугодие ",p.year_plan," г. провести с ",@db, " по ", @de, " г. выборочную проверку")
         ELSE " №____ плана выборочных проверок по ____области (г.Минску) провести с  _______г. по _________ г. выборочную проверку"
        END reason,
        CASE 
         WHEN e.id_event_plan is  NULL THEN CONCAT_WS(' '," с ",@db, " по ", @de, " г. ",IFNULL(e.name_order,""), IFNULL(e.reason_order,""))
         ELSE " c _____г. по _______ г. внеплановую проверку"
        END reason1,
        u.name sphera,d.departament  dept,
        CONCAT_WS(' ',IFNULL(ss.subj,""), IFNULL(ss.unp,""))subj,
        CONCAT_WS(' - ',
         IFNULL(DATE_FORMAT(DATE(e.period_check_from), "%d.%m.%Y"),""),
         IFNULL(DATE_FORMAT(DATE(e.period_check_to), "%d.%m.%Y"),"")
         ) perio,
        
        IFNULL(CONCAT(e.post_agent,'  ' ,e.name_agent),"") agent,
        IFNULL(e.name_agent,"")name_agent ,
        IFNULL(e.technical,"") technical,
        IFNULL(s.other_info,"")other_info
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
        LEFT JOIN mchs.s_dept d ON d.id_dept=e.id_dept
        LEFT JOIN s_units u ON e.sphera=u.id_unit
        LEFT JOIN mchs.s_events_plan p ON p.id_event_plan=e.id_event_plan
        #LEFT JOIN s_fire_card_build b ON b.id_subj=ss.id_subj
        WHERE ss.active=1 and s.active=1 and di.active=1 AND di.org=0 and d.active=1  AND d.org=0  AND s.org=0 
        and  u.active=1 and  u.active=1 and  s.id_list=${dto.id_list} and
        e.num_order="${dto.num_order}";#id_event_order=100  `);//'1/П'   100008077  100297103


        if (result.length > 0) {
            addr_record = result[0].addr_record;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;
            dept_iss = result[0].dept_iss;
            date_doc = result[0].date_doc;
            dept = result[0].dept,
                sphera = result[0].sphera,
                subj = result[0].subj,
                reason = result[0].reason,
                reason1 = result[0].reason1,
                builds = result[0].builds,
                curdate = result[0].curdate,
                agent = result[0].agent,
                name_agent = result[0].name_agent,
                perio = result[0].perio,
                technical = result[0].technical,
                id_event_plan = result[0].technical,
                date_begin = result[0].date_begin,
                date_end = result[0].date_end

            other_info = result[0].other_info,
                id_event = result[0].id_event,
                id_event_order = result[0].id_event_order;

        }

        //ТНПА, подлежащие проверке 
        const result2 = await AppDataSource.manager.query(` SELECT l.name,#COUNT(*),str.name,t.num,t.name  #
        CONCAT(l.name,': ',GROUP_CONCAT(CONCAT(str.name,'  ',t.num) SEPARATOR '; '))tnpa
        #CONCAT(str.name,'  ',t.num,'  ',t.name)tnpa
        FROM
        mchs.s_events_tnpa e
        LEFT JOIN mchs.s_tnpa_doc t ON t.id_doc=e.id_doc  
        LEFT JOIN mchs.s_tnpa_list l ON l.id_list=t.id_list 
        LEFT JOIN mchs.s_tnpa_str_elem str ON str.id_elem=t.id_elem 
        WHERE e.id_event=${id_event}  AND e.active=1  AND str.active=1 AND l.active=1 AND t.active=1 GROUP BY( l.name)`);
        if (result2.length > 0) {
            tnpa = result2[0].tnpa

        }
        //Перечень вопросов, подлежащих проверке 
        const result3 = await AppDataSource.manager.query(` 
        SELECT 
        CONCAT_WS('. ',ROW_NUMBER() OVER ( ORDER BY e.id_list ) ,q.name_que) questions
            FROM mchs.s_events_order v
            LEFT JOIN mchs.s_events_order_que e ON e.id_event_order=v.id_event_order
            LEFT JOIN s_question q ON q.id_que=e.id_que
            WHERE v.id_event_order=${id_event_order}  AND v.active=1  AND e.active=1 AND q.org=0  AND q.active=1 ;`);
        if (result3.length > 0) {
            questions = result3[0].questions
            //num = result3[0].num

        }
        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
     SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
         SELECT 
                    j.job j,uu .fio f,
                    CASE ug.type_user
                    WHEN 1 THEN "руководитель"
                    WHEN 2 THEN "исполнитель"
                    ELSE "" 
                    END t
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE  j.active=1  # AND j.org=0 and  uu.active=1   AND uu.org=0 
                    AND g.active=1   AND g.org=0 AND  g.org=0 AND ug.active=1  AND  ug.org=0
                    AND ug.type_user not in(0,3) AND  e.org=0 AND e.active=1 AND e.id_event_order=${id_event_order} )dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }
        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT  uu .fio boss,LOWER(d.depart_rod) region1 ,
        CASE ug.type_user
            WHEN 0 THEN "Должн.лицо, направившее чек-лист"
            WHEN  1 THEN "руководитель группы"
            WHEN 2 THEN "инспектор"
            WHEN 3 THEN "Главный государcтвенный инспектор"
            WHEN 4 THEN "Государcтвенный инспектор "
            ELSE "" 
        END       dolj,
        j.job     dolj_boss,
     
        @dpt:=e.id_dept_iss ,@dpt_:=e.id_dept,@dpt_p:=d.id_parent,
        IF(@dpt_p IS  NOT NULL,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt_p AND d.active=1  LIMIT 1),d.departament)departament,
        IF(@dpt IS NOT NULL,di.depart_rod,"") region_boss,
        CASE d.id_obl
            WHEN 1 THEN "брестской обл."
            WHEN  2 THEN "витебской обл."
            WHEN 3 THEN "гомельской обл."
            WHEN 4 THEN "гродненской обл."
            WHEN 5 THEN "г.Минска"
            WHEN 6 THEN "минской обл."
            WHEN 7 THEN "могилеской обл."
            ELSE "" 
        END region
        
    
        FROM 
        mchs.s_events_order e 
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
        LEFT JOIN mchs.s_dept_job j ON j.id_dept_job=uu.id_dept_job
        LEFT JOIN mchs.s_dept d ON e.id_dept=d.id_dept
        LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
        WHERE uu.active=1 #AND uu.org=0
        AND d.active=1 AND d.org=0   
        AND g.active=1 AND g.org=0   AND ug.active=1  
        AND ug.type_user IN (3,4) 
        AND ug.org=0
        and  e.id_event_order=${id_event_order}  ;`);

        if (result5.length > 0) {
            boss = result5[0].boss,
                dolj_boss = result5[0].dolj_boss,
                region_boss = result5[0].region_boss,
                departament_boss = result5[0].departament_boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                dolj = result5[0].dolj


        }
        const data = {
            result3: result3,
            result4: result4,
            addr_record, id_subj, subj, dolj, departament_boss,
            num_doc, dept_iss, date_doc, dept, sphera, reason, reason1, builds, curdate, agent, name_agent, perio, technical,
            date_begin, date_end, departament, other_info, tnpa, questions, users, region, region1,
            boss, region_boss, dolj_boss

        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }

    }
    //4 Уведомление о применении технических средств
    generate4_0 = async (dto: genDocDTO3) => {
        //  console.log(dto);
        let id_subj = 0, id_event = 0, id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = num_doc,
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc,
            perio = reason, reason1 = reason, technical = departament, id_event_plan = null,
            date_end = date_doc, date_begin = date_doc,
            other_info = departament, checkk = num_doc,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament, users = departament,
            region = num_doc, boss = num_doc, region1 = num_doc, departament_boss = departament, dolj = dept_iss,
            user_1 = num_doc, user_staff = num_doc, dolj_user_1 = num_doc;

        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/nadz/4 Уведомление о применении технических средств.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }
        const result = await AppDataSource.manager.query(`
        SELECT @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        e.num_order,di.departament dept_iss,
        (SELECT GROUP_CONCAT(b.name_build SEPARATOR '; ') b 
        FROM s_fire_card_build b WHERE b.id_subj=@ee AND b.active=1)builds ,
        IFNULL(s.num_doc,"") num_doc,
        IFNULL(s.addr_record,"") addr_record,
        DATE(CURDATE()) curdate,
        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")date_doc,
        @db:=IFNULL(DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y"),"")date_begin,
        @de:=IFNULL(DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),"") date_end,
        @do:= CASE p.id_obl
        WHEN 1 THEN " брестской обл."
        WHEN  2 THEN " витебской обл."
        WHEN 3 THEN " гомельской обл."
        WHEN 4 THEN " гродненской обл."
        WHEN 5 THEN "г.Минску"
        WHEN 6 THEN " минской обл."
        WHEN 7 THEN " могилеской обл."
        ELSE "" 
        END id_obl,
        CASE e.id_unit_4
         WHEN 91 THEN (CASE e.id_unit_3 WHEN 80 THEN " в ходе проверки " WHEN 81 THEN " выборочной проверки " WHEN 82 THEN " внеплановой проверки " ELSE "" END)
         WHEN 92 THEN " мониторинга "
         WHEN 93 THEN " обследования "
         WHEN 94 THEN " МТХ "
        
        ELSE ""
        END   checkk,
        CASE 
         WHEN e.id_event_plan is NOT NULL THEN CONCAT("  № ",p.num_order," плана выборочных проверок по ",@do,
            "области (г.Минску) на ",p.halfyear_event," полугодие ",p.year_plan," г. провести с ",@db, " по ", @de, " г. выборочную проверку")
         ELSE " №____ плана выборочных проверок по ____области (г.Минску) провести с  _______г. по _________ г. выборочную проверку"
        END reason,
        CASE 
         WHEN e.id_event_plan is  NULL THEN CONCAT_WS(' '," с ",@db, " по ", @de, " г. ",IFNULL(e.name_order,""), IFNULL(e.reason_order,""))
         ELSE " c _____г. по _______ г. внеплановую проверку"
        END reason1,
        u.name sphera,d.departament  dept,
        CONCAT_WS(' ',IFNULL(ss.subj,""), IFNULL(ss.unp,""))subj,
        CONCAT_WS(' - ',
         IFNULL(DATE_FORMAT(DATE(e.period_check_from), "%d.%m.%Y"),""),
         IFNULL(DATE_FORMAT(DATE(e.period_check_to), "%d.%m.%Y"),"")
         ) perio,
        
        #IFNULL(CONCAT(e.post_agent,'  ' ,e.name_agent),"") agent,
        IFNULL(e.post_agent,"") agent,
        IFNULL(e.name_agent,"")name_agent ,
        IFNULL(e.technical,"") technical,
        IFNULL(s.other_info,"")other_info
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
        LEFT JOIN mchs.s_dept d ON d.id_dept=e.id_dept
        LEFT JOIN s_units u ON e.sphera=u.id_unit
        LEFT JOIN mchs.s_events_plan p ON p.id_event_plan=e.id_event_plan
        #LEFT JOIN s_fire_card_build b ON b.id_subj=ss.id_subj
        WHERE ss.active=1 and s.active=1 and di.active=1 AND di.org=0 and d.active=1  AND d.org=0  AND s.org=0 
        and  u.active=1 and  u.active=1 and  s.id_list=${dto.id_list} and
        e.num_order="${dto.num_order}";#id_event_order=100  `);//'1/П'   100008077  100297103


        if (result.length > 0) {
            addr_record = result[0].addr_record;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;
            checkk = result[0].checkk;
            dept_iss = result[0].dept_iss;
            date_doc = result[0].date_doc;
            dept = result[0].dept,
                sphera = result[0].sphera,
                subj = result[0].subj,
                reason = result[0].reason,
                reason1 = result[0].reason1,
                builds = result[0].builds,
                curdate = result[0].curdate,
                agent = result[0].agent,
                name_agent = result[0].name_agent,
                perio = result[0].perio,
                technical = result[0].technical,
                id_event_plan = result[0].technical,
                date_begin = result[0].date_begin,
                date_end = result[0].date_end

            other_info = result[0].other_info,
                id_event = result[0].id_event,
                id_event_order = result[0].id_event_order;

        }

        //ТНПА, подлежащие проверке 
        const result2 = await AppDataSource.manager.query(` SELECT l.name,#COUNT(*),str.name,t.num,t.name  #
        CONCAT(l.name,': ',GROUP_CONCAT(CONCAT(str.name,'  ',t.num) SEPARATOR '; '))tnpa
        #CONCAT(str.name,'  ',t.num,'  ',t.name)tnpa
        FROM
        mchs.s_events_tnpa e
        LEFT JOIN mchs.s_tnpa_doc t ON t.id_doc=e.id_doc  
        LEFT JOIN mchs.s_tnpa_list l ON l.id_list=t.id_list 
        LEFT JOIN mchs.s_tnpa_str_elem str ON str.id_elem=t.id_elem 
        WHERE e.id_event=${id_event}  AND e.active=1  AND str.active=1 AND l.active=1 AND t.active=1 GROUP BY( l.name)`);
        if (result2.length > 0) {
            tnpa = result2[0].tnpa

        }
        //Руководитель user_1 
        const result3 = await AppDataSource.manager.query(` 
     
        SELECT  uu .fio user_1,
        j.job dolj_user_1
        FROM 
           mchs.s_events_order e
           LEFT JOIN mchs.group g ON g.id_group=e.id_group
           LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
           LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
           LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
        WHERE   #uu.active=1 AND
            g.active=1 AND g.org=0  AND
            ug.active=1  AND j.active=1 
            AND ug.type_user in(1) AND e.active=1 AND e.org=0 AND e.id_event_order=${id_event_order}   ;`);
        if (result3.length > 0) {
            user_1 = result3[0].user_1,
                dolj_user_1 = result3[0].dolj_user_1

        }
        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
     SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
         SELECT 
                    j.job j,uu .fio f,
                    CASE ug.type_user
                    WHEN 1 THEN "руководитель"
                    WHEN 2 THEN "исполнитель"
                    ELSE "" 
                    END t
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE  j.active=1  # AND j.org=0 and  uu.active=1   AND uu.org=0 
                    AND g.active=1   AND g.org=0 AND  g.org=0 AND ug.active=1  AND  ug.org=0
                    AND ug.type_user not in(0,3) AND  e.org=0 AND e.active=1 AND e.id_event_order=${id_event_order} )dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }

        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT  uu .fio boss,LOWER(d.depart_rod) region1 ,
     CASE ug.type_user
      WHEN 0 THEN "Должн.лицо, направившее чек-лист"
        WHEN  1 THEN "руководитель группы"
        WHEN 2 THEN "инспектор"
        WHEN 3 THEN "Главный государcтвенный инспектор"
        WHEN 4 THEN "Государcтвенный инспектор "
        ELSE "" 
        END dolj,
     
        @dpt:=e.id_dept_iss ,@dpt_:=e.id_dept,@dpt_p:=d.id_parent,
        IF(@dpt_p IS  NOT NULL,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt_p AND d.active=1  LIMIT 1),d.departament)departament,
        IF(@dpt IS NOT NULL,di.departament,"") departament_boss,
        CASE d.id_obl
        WHEN 1 THEN "брестской обл."
        WHEN  2 THEN "витебской обл."
        WHEN 3 THEN "гомельской обл."
        WHEN 4 THEN "гродненской обл."
        WHEN 5 THEN "г.Минска"
        WHEN 6 THEN "минской обл."
        WHEN 7 THEN "могилеской обл."
        ELSE "" 
        END region
    
        FROM 
        mchs.s_events_order e 
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
        LEFT JOIN mchs.s_dept d ON e.id_dept=d.id_dept
        LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
        WHERE uu.active=1 AND uu.org=0 AND d.active=1 AND d.org=0   AND g.active=1 AND g.org=0   AND ug.active=1  
        AND ug.type_user IN (3,4) 
        AND ug.org=0
        and  e.id_event_order=${id_event_order}  ;`);

        if (result5.length > 0) {
            boss = result5[0].boss,
                departament_boss = result5[0].departament_boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                dolj = result5[0].dolj

        }
        const data = {
            //result3:result3,
            result4: result4,
            user_1, user_staff, dolj_user_1,
            addr_record, id_subj, subj, dolj, departament_boss, checkk,
            num_doc, dept_iss, date_doc, dept, sphera, reason, reason1, builds, curdate, agent, name_agent, perio, technical,
            date_begin, date_end, departament, other_info, tnpa, questions, users, region, region1, boss

        }
        console.log("user_staff = " + user_staff);
        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }

    }
    //5 - А К Т об отказе в допуске (предоставлении документов)
    generate5 = async (dto: genDocDTO3) => {
        //  console.log(dto);
        let id_subj = 0, id_event = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = "_____________________",
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc,
            perio = reason, technical = departament, date_end = date_doc, date_begin = date_doc,
            other_info = departament, comm = departament, id_event_order = 0, dolj = dept_iss,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament, users = departament, user_1 = departament,
            region = num_doc, boss = num_doc, region1 = num_doc, resh = departament, plan = num_doc;

        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/5 - Акт об отказе в допуске.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }

        const result = await AppDataSource.manager.query(`
        SELECT @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        s.addr_record ,
        CASE e.id_unit_4
         WHEN 91 THEN (SELECT CONCAT(DATE_FORMAT(DATE(r.date_doc), "%d.%m.%Y")," № ",r.num_doc) FROM s_form_report r WHERE r.id_event_order=@eo AND r.id_form=1009 AND active=1 LIMIT 1)
         ELSE (SELECT CONCAT("Решение № ",r.num_doc," от ",DATE_FORMAT(DATE(r.date_doc), "%d.%m.%Y")) FROM s_form_report r WHERE r.id_event_order=@eo AND r.id_form=1008 AND active=1 LIMIT 1)
        END   resh,
         CONCAT_WS(" ", " п.плана выборочных проверок №",pl.num_order," на ",pl.halfyear_event,"полугодие ",
         pl.year_plan,"(",ob.name_obl,"обл.)")plan,
        
        DATE(CURDATE()) curdate,
        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")date_doc,
        CONCAT_WS(' ',IFNULL(ss.unp,""),IFNULL(ss.subj,""), IFNULL(ss.addr_yur,ss.addr_fact))subj,
        IFNULL(CONCAT_WS(' ',e.post_agent,e.name_agent),"") agent,
        IFNULL(e.name_agent,"")name_agent ,
        IFNULL(s.other_info,"") other_info,
        IFNULL(s.comm,"") comm
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        LEFT JOIN mchs.s_events_plan pl on pl.id_event_plan=e.id_event_plan
        LEFT JOIN mchs.s_ate_obl ob ON ob.id_obl=pl.id_obl
        WHERE ss.active=1 AND s.active=1 AND e.active=1  AND e.org=1   AND s.org=1  
        AND  s.id_list=${dto.id_list} AND
        e.num_order=${dto.num_order} `);//'1/П'   100008077  100297103


        if (result.length > 0) {
            id_event_order = result[0].id_event_order;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;//
            addr_record = result[0].addr_record;
            date_doc = result[0].date_doc;
            subj = result[0].subj,
                curdate = result[0].curdate,
                agent = result[0].agent,
                other_info = result[0].other_info,
                comm = result[0].comm,
                id_event = result[0].id_event,
                resh = result[0].resh,
                plan = result[0].plan;

        }
        //Руководитель user_1 
        const result3 = await AppDataSource.manager.query(` 
        
            SELECT  uu .fio user_1
                    FROM 
                       mchs.s_events_order e
                       LEFT JOIN mchs.group g ON g.id_group=e.id_group
                       LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                       LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                       #LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE   uu.active=1 AND uu.org=1 AND g.active=1 AND g.org=1  
                       AND ug.active=1 AND ug.org=1 #j.active=1 and 
                       AND ug.type_user in(1) AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order}   ;`);
        if (result3.length > 0) {
            user_1 = result3[0].user_1

        }
        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
        SELECT 
           GROUP_CONCAT(CONCAT(j.job,' ',uu .fio) SEPARATOR '; ')users
           FROM 
           mchs.s_events_order e
           LEFT JOIN mchs.group g ON g.id_group=e.id_group
           LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
           LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
           LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
            # GROUP BY ug.id_group 
           WHERE  j.active=1  AND j.org=1 AND uu.active=1 AND uu.org=1 AND g.active=1  AND g.org=1 AND ug.active=1  
           AND ug.org=1 AND ug.type_user not in(0,3,4) AND e.id_event_order=${id_event_order}  
`);
        if (result4.length > 0) {
            users = result4[0].users

        }
        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT  uu .fio boss,LOWER(d.depart_rod) region1 ,
     CASE ug.type_user
      WHEN 0 THEN "Должн.лицо, направившее чек-лист"
        WHEN  1 THEN "руководитель группы"
        WHEN 2 THEN "инспектор"
        WHEN 3 THEN "Главный государcтвенный инспектор"
        WHEN 4 THEN "Государcтвенный инспектор "
        ELSE "" 
        END dolj,
     
        @dpt:=e.id_dept_iss ,@dpt_:=e.id_dept,@dpt_p:=d.id_parent,
        IF(@dpt_p IS  NOT NULL,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt_p AND d.active=1  LIMIT 1),d.departament)departament,
        IF(@dpt IS NOT NULL,di.departament,"") departament_boss,
        CASE d.id_obl
        WHEN 1 THEN "брестской обл."
        WHEN  2 THEN "витебской обл."
        WHEN 3 THEN "гомельской обл."
        WHEN 4 THEN "гродненской обл."
        WHEN 5 THEN "г.Минска"
        WHEN 6 THEN "минской обл."
        WHEN 7 THEN "могилеской обл."
        ELSE "" 
        END region
        FROM 
        mchs.s_events_order e 
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
        LEFT JOIN mchs.s_dept d ON e.id_dept=d.id_dept
        LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
        WHERE uu.active=1 AND uu.org=1 AND d.active=1 AND d.org=1   AND g.active=1 AND g.org=1   AND ug.active=1  
        AND ug.type_user IN (3,4) 
        AND ug.org=1
        and  e.id_event_order=${id_event_order} ;`);
        if (result5.length > 0) {
            boss = result5[0].boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                dolj = result5[0].dolj

        }
        resh = resh + " выдано " + dolj + " " + region + " " + boss;
        const data = {
            id_subj, subj, dolj, resh, plan,
            num_doc, dept_iss, date_doc, addr_record, dept, sphera, reason, builds, curdate, agent, name_agent, perio, technical,
            date_begin, date_end, comm, other_info, tnpa, questions, users, user_1, region, region1, boss

        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }



    }
    //////////////////////////////////////////////////////
    async getResult6(unp: string) {
        const result6 = await AppDataSource.manager.query(`
           SELECT area,descr,addr_record , service_org f7,f.date_record date_record 
           FROM s_fire_card_subj f 
           LEFT JOIN mchs.s_subj s ON s.id_subj=f.id_subj
           WHERE s.unp=${unp} AND s.active=1  AND f.active=1 ;`);
        return result6;
    }
    /////////////////{TO DO:}/////////////////////////////
    //5_0 - Акт проверки
    generate5_0 = async (dto: genDocDTO3) => {

        let id_subj = 0, id_event = 0, id_event_order = 0, sphera = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = "_____________________", resh = reason, rec_data = date_doc, rec = dept_iss,
            rec_mail = departament, plan = "",
            builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc, dolj = num_doc,
            perio = reason, perio_stop = reason, perio_check = reason,
            technical = departament, date_end = date_doc, date_begin = date_doc,
            other_info = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament, users = departament,
            user_1 = departament, dolj_user_1 = dept_iss,
            region = num_doc, boss = num_doc, region1 = num_doc, num = num_doc, tel_dover = dept_iss,
            tel_reception = dept_iss,
            short_tnpa = "", name_def = "", comm = dept_iss, sopb_subj = departament, nop2 = "", nop22 = "",
            checkk = num_doc, book = num_doc, num_book = num_doc, date_book = num_doc,
            ss = '(указываются место и время совершения (обнаружения) нарушений, существо нарушений с указанием нормативного правового акта,требования которого нарушены)';
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/nadz/5 Акт проверки.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }

        const result = await AppDataSource.manager.query(`
        SELECT @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        s.addr_record ,
        s.num_doc,
        e.sphera,
        @fl_rec:=s.fl_rec,
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(s.receiver,"____________________" ) 
        ELSE "______________________"
        END                                                 rec,

        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ) 
        ELSE "_____  ________  20__г."
        END                                                 rec_data,

        CASE 
        WHEN @fl_rec=1 THEN  CONCAT_WS(' ',
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ), " почтой")
        ELSE ""
        END                                                 rec_mail ,
        #DATE(CURDATE()) curdate,
        CASE e.id_unit_4
        WHEN 91 THEN (SELECT CONCAT(DATE_FORMAT(DATE(r.date_doc), "%d.%m.%Y")," № ",r.num_doc) FROM s_form_report r WHERE r.id_event_order=@eo AND r.id_form=14 AND active=1 LIMIT 1)
        ELSE (SELECT CONCAT("Решение № ",r.num_doc," от ",DATE_FORMAT(DATE(r.date_doc), "%d.%m.%Y")) FROM s_form_report r WHERE r.id_event_order=@eo AND r.id_form=35 AND active=1 LIMIT 1)
        END                                                  resh,
        CASE e.id_unit_4
        WHEN 91 THEN (CASE e.id_unit_3 WHEN 80 THEN " наезд " WHEN 81 THEN " выборочную проверку " WHEN 82 THEN " внеплановую проверку " ELSE "" END)
        WHEN 92 THEN " мониторинг "
        WHEN 93 THEN " обследование "
        WHEN 94 THEN " МТХ "

        ELSE ""
        END   checkk,
        CASE s.fl_book WHEN 1 THEN "предъявлялась" WHEN 0 THEN "не предъявлялась" ELSE "" END book,
        IFNULL(s.num_book ,"" )                                                           num_book,
        DATE_FORMAT(DATE(s.date_book), "%d.%m.%Y")                                         date_book,
        CONCAT_WS(" ", "  №",pl.num_order," на ",pl.halfyear_event,"полугодие ",
        pl.year_plan,"г.(",ob.name_obl,"обл.)")              plan,

        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")           date_doc,

        CONCAT_WS(' ',IFNULL(ss.unp,""),IFNULL(ss.subj,""), 
        IFNULL(ss.addr_yur,ss.addr_fact),
        IFNULL(sv.name ,"" )              )                 subj,

        @perio:= CONCAT_WS
        ("  "," c ",
        DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y")," по ",
        DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y")
        
        ),

        case     WHEN @perio IS NOT NULL   THEN  @perio
        ELSE "c ___ ________20__г. по ___ ________20__г."
        END                                                 perio, 
        @perio_stop:=CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.date_stop), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.date_continue), "%d.%m.%Y")),
        
        CASE 
        WHEN (e.date_stop IS NOT null ) THEN @perio_stop
        WHEN (e.date_stop IS NULL ) THEN " не приостанавливалось " 
        ELSE "" 
        END perio_stop,
        CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.period_check_from), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.period_check_to), "%d.%m.%Y")) perio_check,
        
        

        IFNULL(e.post_agent,"")                             agent,
        IFNULL(e.name_agent,"")                             name_agent ,
        IFNULL(s.other_info,"")                             other_info,
        IFNULL(s.comm,"")                                   comm
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_vedomstva sv ON sv.id_ved=ss.id_ved
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        LEFT JOIN mchs.s_events_plan pl on pl.id_event_plan=e.id_event_plan
        LEFT JOIN mchs.s_ate_obl ob ON ob.id_obl=pl.id_obl
        WHERE ss.active=1 AND s.active=1 AND e.active=1 AND  e.org=0   AND s.org=0  AND
        s.id_list=${dto.id_list}
        AND e.num_order="${dto.num_order}" `);//'1   /П'   100008077  100297103

        if (result.length > 0) {
            id_event_order = result[0].id_event_order;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;//
            addr_record = result[0].addr_record;
            date_doc = result[0].date_doc;
            subj = result[0].subj,
                perio = result[0].perio,
                perio_stop = result[0].perio_stop,
                perio_check = result[0].perio_check,
                curdate = result[0].curdate,
                agent = result[0].agent,
                name_agent = result[0].name_agent,
                other_info = result[0].other_info,
                comm = result[0].comm,
                id_event = result[0].id_event,
                resh = result[0].resh,
                plan = result[0].plan,
                rec = result[0].rec,
                rec_data = result[0].rec_data,
                rec_mail = result[0].rec_mail,
                sphera = result[0].sphera,
                checkk = result[0].checkk,
                book = result[0].book,
                num_book = result[0].num_book,
                date_book = result[0].date_book;

        }
        //СОПИБ 
        const result_sopb = await AppDataSource.manager.query(` 
 
 SELECT GROUP_CONCAT(sopb_subj SEPARATOR '; ') sopb_subj FROM (
    SELECT  CONCAT_WS("  " ,
         ROW_NUMBER() OVER ( ORDER BY s.id_data ),c.name,c.num_doc,c.date_doc )sopb_subj
         FROM s_sopb_card_subj s
         LEFT join s_sopb_card c ON c.id_card=s.id_card
         WHERE s.id_subj=${id_subj} AND s.active=1 AND c.active=1 AND s.fl_mnf_exp=1)dd; ;`);
        if (result_sopb.length > 0) {
            sopb_subj = result_sopb[0].sopb_subj

        }
        //Перечень нарушений по вопросам, подлежащим проверке в сфере ПБ sphera = 4,5
        let result2: any;
        if (sphera == 5 || sphera == 4) {
            result2 = await AppDataSource.manager.query(`
    SELECT num,#,id_list,dd.id_def 
    CASE WHEN dd.name_def IS NULL THEN " нарушений не выявлено"
    ELSE CONCAT("__________",dd.name_def)
    END name_def,
    CASE WHEN dd.short_tnpa IS NULL THEN ""
    ELSE CONCAT(", ТНПА: ",dd.short_tnpa)
    END short_tnpa
    FROM(SELECT 
     e.id_list, ROW_NUMBER() OVER ( ORDER BY e.id_list ) num #,q.name_que questions
     FROM  mchs.s_events_order_que e WHERE  e.active=1 AND e.id_event_order=${id_event_order} )e
     LEFT JOIN(
     SELECT d.id_event_que,d.id_def,q.name_def,q.short_tnpa 
     FROM mchs.s_events_order_que_def d #ON e.id_event_order=d.id_event_order AND d.id_event_que=e.id_list
     LEFT JOIN s_defection  q ON q.id_def=d.id_def
     WHERE d.id_event_order=${id_event_order}  AND q.active=1 AND d.active=1  
    )dd
    ON id_list=dd.id_event_que `);

            if (result2.length > 0) {

                name_def = result2[0].name_def,
                    short_tnpa = result2[0].short_tnpa,
                    num = result2[0].num

            }
        } else { nop2 = "нарушений не выявлено" }
        //Перечень нарушений по вопросам, подлежащим проверке в сфере ТС
        let result22: any;
        if (sphera == 6) {
            result22 = await AppDataSource.manager.query(`
   SELECT num,#,id_list,dd.id_def 
    CASE WHEN dd.name_def IS NULL THEN " нарушений не выявлено"
    ELSE CONCAT("__________",dd.name_def)
    END name_def,
    CASE WHEN dd.short_tnpa IS NULL THEN ""
    ELSE CONCAT(", ТНПА: ",dd.short_tnpa)
    END short_tnpa
    FROM(SELECT 
        e.id_list, ROW_NUMBER() OVER ( ORDER BY e.id_list ) num #,q.name_que questions
        FROM  mchs.s_events_order_que e WHERE  e.active=1 AND e.id_event_order=${id_event_order} )e
        LEFT JOIN(
        SELECT d.id_event_que,d.id_def,q.name_def,q.short_tnpa 
        FROM mchs.s_events_order_que_def d #ON e.id_event_order=d.id_event_order AND d.id_event_que=e.id_list
        LEFT JOIN s_defection  q ON q.id_def=d.id_def
        WHERE d.id_event_order=${id_event_order}  AND q.active=1 AND d.active=1  
    )dd
    ON id_list=dd.id_event_que`);
            if (result22.length > 0) {
                console.log("result22=   " + result22);
                name_def = result22[0].name_def,
                    short_tnpa = result22[0].short_tnpa,
                    num = result22[0].num

            }
        } else { nop22 = "нарушений не выявлено" }



        //Руководитель user_1 
        const result3 = await AppDataSource.manager.query(` 
 
        SELECT  uu .fio user_1,
        j.job dolj_user_1
        FROM 
           mchs.s_events_order e
           LEFT JOIN mchs.group g ON g.id_group=e.id_group
           LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
           LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
           LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
        WHERE   #uu.active=1 AND
            g.active=1 AND g.org=0  AND
            ug.active=1  AND j.active=1 
            AND ug.type_user in(1) AND e.active=1 AND e.org=0 AND e.id_event_order=${id_event_order}   ;`);
        if (result3.length > 0) {
            user_1 = result3[0].user_1,
                dolj_user_1 = result3[0].dolj_user_1

        }
        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
 SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
     SELECT 
                j.job j,uu .fio f,
                CASE ug.type_user
                WHEN 1 THEN "руководитель"
                WHEN 2 THEN "исполнитель"
                ELSE "" 
                END t
             FROM 
                mchs.s_events_order e
                LEFT JOIN mchs.group g ON g.id_group=e.id_group
                LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                WHERE  #j.active=1   AND j.org=1 and  uu.active=1   AND uu.org=0 AND
                g.active=1   AND g.org=0 # AND ug.active=1  #AND  ug.org=0 
                AND ug.type_user not in(0,3,4) AND  e.org=0 AND e.active=1 AND e.id_event_order=${id_event_order})dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }

        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
    SELECT  uu .fio boss,LOWER(d.depart_rod) region1 ,
    CASE ug.type_user
     WHEN 0 THEN "Должн.лицо, направившее чек-лист"
       WHEN  1 THEN "руководитель группы"
       WHEN 2 THEN "инспектор"
       WHEN 3 THEN "Главный государcтвенный инспектор"
       WHEN 4 THEN "Государcтвенный инспектор "
       ELSE "" 
       END dolj,
    
       @dpt:=e.id_dept_iss ,@dpt_:=e.id_dept,@dpt_p:=d.id_parent,
       IF(@dpt_p IS  NOT NULL,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt_p AND d.active=1  LIMIT 1),d.departament)departament,
       IF(@dpt IS NOT NULL,di.departament,"") departament_boss,
       IFNULL(d.tel_dover,"")tel_dover,
       IFNULL(d.tel_reception,"")tel_reception,
       CASE d.id_obl
       WHEN 1 THEN "брестской обл."
       WHEN  2 THEN "витебской обл."
       WHEN 3 THEN "гомельской обл."
       WHEN 4 THEN "гродненской обл."
       WHEN 5 THEN "г.Минска"
       WHEN 6 THEN "минской обл."
       WHEN 7 THEN "могилеской обл."
       ELSE "" 
       END region
   
       FROM 
       mchs.s_events_order e 
       LEFT JOIN mchs.group g ON g.id_group=e.id_group
       LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
       LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
       LEFT JOIN mchs.s_dept d ON e.id_dept=d.id_dept
       LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
       WHERE uu.active=1 #AND uu.org=0 
       #AND d.active=1 AND d.org=0   AND g.active=1 AND g.org=0   AND ug.active=1  
       AND ug.type_user IN (3,4) 
       #AND ug.org=1
       and  e.id_event_order=${id_event_order}  
`);
        if (result5.length > 0) {
            boss = result5[0].boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                departament = result5[0].departament,
                tel_dover = result5[0].tel_dover,
                tel_reception = result5[0].tel_reception,
                dolj = result5[0].dolj
        }
        const data = {
            result: result, result_sopb: result_sopb, result2: result2, result22: result22, id_subj, subj,
            tel_dover, tel_reception, departament, rec_mail, rec_data, rec,
            num, num_doc, dept_iss, date_doc, addr_record, dept, plan, sphera, reason,
            resh, builds, curdate, agent, name_agent, perio, perio_stop, perio_check, technical,
            date_begin, date_end, other_info, tnpa, questions, users, user_1, dolj_user_1, region, region1, ss, boss, dolj,
            short_tnpa, name_def, comm, sopb_subj, nop22, nop2, checkk, book, num_book, date_book

        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }



    }
    //6 - Акт проверки
    generate6 = async (dto: genDocDTO3) => {

        let id_subj = 0, id_event = 0, id_event_order = 0, sphera = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = "_____________________", resh = reason, rec_data = date_doc, rec = dept_iss, rec_mail = departament, plan = "",
            builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc, dolj = num_doc,
            perio = reason, technical = departament, date_end = date_doc, date_begin = date_doc, other_info = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament, users = departament, user_1 = departament,
            region = num_doc, boss = num_doc, region1 = num_doc, num = num_doc, tel_dover = dept_iss, tel_reception = dept_iss,
            short_tnpa = "", name_def = "", comm = dept_iss, sopb_subj = departament, nop2 = "", nop22 = "",
            ss = '(указываются место и время совершения (обнаружения) нарушений, существо нарушений с указанием нормативного правового акта,требования которого нарушены)';
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/6 - Акт проверки.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }

        const result = await AppDataSource.manager.query(`
        SELECT @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
                                                        s.addr_record ,s.num_doc,
                                                        e.sphera,
        @fl_rec:=s.fl_rec,
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(s.receiver,"____________________" ) 
        ELSE "______________________"
        END                                                 rec,
        
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ) 
        ELSE "_____  ________  20__г."
        END                                                 rec_data,
        
        CASE 
        WHEN @fl_rec=1 THEN  CONCAT_WS(' ',
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ), " почтой")
        ELSE ""
        END                                                 rec_mail ,
        #DATE(CURDATE()) curdate,
        CASE e.id_unit_4
         WHEN 91 THEN (SELECT CONCAT(DATE_FORMAT(DATE(r.date_doc), "%d.%m.%Y")," № ",r.num_doc) FROM s_form_report r WHERE r.id_event_order=@eo AND r.id_form=1009 AND active=1 LIMIT 1)
         ELSE (SELECT CONCAT("Решение № ",r.num_doc," от ",DATE_FORMAT(DATE(r.date_doc), "%d.%m.%Y")) FROM s_form_report r WHERE r.id_event_order=@eo AND r.id_form=1008 AND active=1 LIMIT 1)
        END                                                  resh,
        
        CONCAT_WS(" ", " пунктом плана выборочных проверок №",pl.num_order," на ",pl.halfyear_event,"полугодие ",
         pl.year_plan,"(",ob.name_obl,"обл.)")              plan,

        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")           date_doc,

        CONCAT_WS(' ',IFNULL(ss.unp,""),IFNULL(ss.subj,""), 
        IFNULL(ss.addr_yur,ss.addr_fact),
        IFNULL(sv.name ,"" )              )                 subj,
       
        @perio:= CONCAT_WS
        ("  ",
          DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y")," - ",
          DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),
          case WHEN e.date_stop IS NOT NULL THEN
                  CONCAT_WS(""," (период продления: ",DATE_FORMAT(DATE(e.date_stop), "%d.%m.%Y")," - ",
                  DATE_FORMAT(DATE(e.date_continue), "%d.%m.%Y"),")"  )
               ELSE ""
          END
        ),
         
        case    WHEN @perio IS NOT NULL   THEN  @perio
            ELSE "c ___ ________20__г. по ___ ________20__г."
        END                                                 perio, 

        IFNULL(CONCAT_WS(' ',e.post_agent,e.name_agent),"") agent,
        IFNULL(e.name_agent,"")                             name_agent ,
        IFNULL(s.other_info,"")                             other_info,
        IFNULL(s.comm,"")                                   comm
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_vedomstva sv ON sv.id_ved=ss.id_ved
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        LEFT JOIN mchs.s_events_plan pl on pl.id_event_plan=e.id_event_plan
        LEFT JOIN mchs.s_ate_obl ob ON ob.id_obl=pl.id_obl
        WHERE ss.active=1 AND s.active=1 AND e.active=1  AND e.org=1   AND s.org=1  
        AND  s.id_list=${dto.id_list}
        AND e.num_order="${dto.num_order}" `);//'1   /П'   100008077  100297103

        if (result.length > 0) {
            id_event_order = result[0].id_event_order;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;//
            addr_record = result[0].addr_record;
            date_doc = result[0].date_doc;
            subj = result[0].subj,
                perio = result[0].perio,
                curdate = result[0].curdate,
                agent = result[0].agent,
                other_info = result[0].other_info,
                comm = result[0].comm,
                id_event = result[0].id_event,
                resh = result[0].resh,
                plan = result[0].plan,
                rec = result[0].rec,
                rec_data = result[0].rec_data,
                rec_mail = result[0].rec_mail,
                sphera = result[0].sphera;

        }
        //СОПИБ 
        const result_sopb = await AppDataSource.manager.query(` 
     
     SELECT GROUP_CONCAT(sopb_subj SEPARATOR '; ') sopb_subj FROM (
        SELECT  CONCAT_WS("  " ,
             ROW_NUMBER() OVER ( ORDER BY s.id_data ),c.name,c.num_doc,c.date_doc )sopb_subj
             FROM s_sopb_card_subj s
             LEFT join s_sopb_card c ON c.id_card=s.id_card
             WHERE s.id_subj=${id_subj} AND s.active=1 AND c.active=1 AND s.fl_mnf_exp=1)dd; ;`);
        if (result_sopb.length > 0) {
            sopb_subj = result_sopb[0].sopb_subj

        }
        //Перечень нарушений по вопросам, подлежащим проверке в сфере ПБ sphera = 4,5
        let result2: any;
        if (sphera == 5 || sphera == 4) {
            result2 = await AppDataSource.manager.query(`
        SELECT num,#,id_list,dd.id_def 
        CASE WHEN dd.name_def IS NULL THEN " нарушений не выявлено"
        ELSE CONCAT("__________",dd.name_def)
        END name_def,
        CASE WHEN dd.short_tnpa IS NULL THEN ""
        ELSE CONCAT(", ТНПА: ",dd.short_tnpa)
        END short_tnpa
        FROM(SELECT 
         e.id_list, ROW_NUMBER() OVER ( ORDER BY e.id_list ) num #,q.name_que questions
         FROM  mchs.s_events_order_que e WHERE  e.active=1 AND e.id_event_order=${id_event_order} )e
         LEFT JOIN(
         SELECT d.id_event_que,d.id_def,q.name_def,q.short_tnpa 
         FROM mchs.s_events_order_que_def d #ON e.id_event_order=d.id_event_order AND d.id_event_que=e.id_list
         LEFT JOIN s_defection  q ON q.id_def=d.id_def
         WHERE d.id_event_order=${id_event_order}  AND q.active=1 AND d.active=1  
        )dd
        ON id_list=dd.id_event_que `);

            if (result2.length > 0) {

                name_def = result2[0].name_def,
                    short_tnpa = result2[0].short_tnpa,
                    num = result2[0].num

            }
        } else { nop2 = "нарушений не выявлено" }
        //Перечень нарушений по вопросам, подлежащим проверке в сфере ТС
        let result22: any;
        if (sphera == 6) {
            result22 = await AppDataSource.manager.query(`
       SELECT num,#,id_list,dd.id_def 
        CASE WHEN dd.name_def IS NULL THEN " нарушений не выявлено"
        ELSE CONCAT("__________",dd.name_def)
        END name_def,
        CASE WHEN dd.short_tnpa IS NULL THEN ""
        ELSE CONCAT(", ТНПА: ",dd.short_tnpa)
        END short_tnpa
        FROM(SELECT 
            e.id_list, ROW_NUMBER() OVER ( ORDER BY e.id_list ) num #,q.name_que questions
            FROM  mchs.s_events_order_que e WHERE  e.active=1 AND e.id_event_order=${id_event_order} )e
            LEFT JOIN(
            SELECT d.id_event_que,d.id_def,q.name_def,q.short_tnpa 
            FROM mchs.s_events_order_que_def d #ON e.id_event_order=d.id_event_order AND d.id_event_que=e.id_list
            LEFT JOIN s_defection  q ON q.id_def=d.id_def
            WHERE d.id_event_order=${id_event_order}  AND q.active=1 AND d.active=1  
        )dd
        ON id_list=dd.id_event_que`);
            if (result22.length > 0) {
                console.log("result22=   " + result22);
                name_def = result22[0].name_def,
                    short_tnpa = result22[0].short_tnpa,
                    num = result22[0].num

            }
        } else { nop22 = "нарушений не выявлено" }



        //Руководитель user_1 
        const result3 = await AppDataSource.manager.query(` 
     
         SELECT  uu .fio user_1
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    #LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                 WHERE   uu.active=1 AND uu.org=1 AND g.active=1 AND g.org=1  
                    AND ug.active=1 AND ug.org=1 #j.active=1 and 
                    AND ug.type_user in(1) AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order}   ;`);
        if (result3.length > 0) {
            user_1 = result3[0].user_1

        }
        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
     SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
         SELECT 
                    j.job j,uu .fio f,
                    CASE ug.type_user
                    WHEN 1 THEN "руководител"
                    WHEN 2 THEN "исполнитель"
                    ELSE "" 
                    END t
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE  j.active=1   AND j.org=1 and  uu.active=1   AND uu.org=1 
                    AND g.active=1   AND g.org=1 AND  g.org=1 AND ug.active=1  AND  ug.org=1
                    AND ug.type_user not in(0,3,4) AND  e.org=1 AND e.active=1 AND e.id_event_order=${id_event_order} LIMIT 2)dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }

        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT  uu .fio boss,LOWER(d.depart_rod) region1 ,
        CASE ug.type_user
         WHEN 0 THEN "Должн.лицо, направившее чек-лист"
           WHEN  1 THEN "руководитель группы"
           WHEN 2 THEN "инспектор"
           WHEN 3 THEN "Главный государcтвенный инспектор"
           WHEN 4 THEN "Государcтвенный инспектор "
           ELSE "" 
           END dolj,
        
           @dpt:=e.id_dept_iss ,@dpt_:=e.id_dept,@dpt_p:=d.id_parent,
           IF(@dpt_p IS  NOT NULL,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt_p AND d.active=1  LIMIT 1),d.departament)departament,
           IF(@dpt IS NOT NULL,di.departament,"") departament_boss,
           IFNULL(d.tel_dover,"")tel_dover,
           IFNULL(d.tel_reception,"")tel_reception,
           CASE d.id_obl
           WHEN 1 THEN "брестской обл."
           WHEN  2 THEN "витебской обл."
           WHEN 3 THEN "гомельской обл."
           WHEN 4 THEN "гродненской обл."
           WHEN 5 THEN "г.Минска"
           WHEN 6 THEN "минской обл."
           WHEN 7 THEN "могилеской обл."
           ELSE "" 
           END region
       
           FROM 
           mchs.s_events_order e 
           LEFT JOIN mchs.group g ON g.id_group=e.id_group
           LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
           LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
           LEFT JOIN mchs.s_dept d ON e.id_dept=d.id_dept
           LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
           WHERE uu.active=1 AND uu.org=1 AND d.active=1 AND d.org=1   AND g.active=1 AND g.org=1   AND ug.active=1  
           AND ug.type_user IN (3,4) 
           AND ug.org=1
           and  e.id_event_order=${id_event_order}  
   `);
        if (result5.length > 0) {
            boss = result5[0].boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                departament = result5[0].departament,
                tel_dover = result5[0].tel_dover,
                tel_reception = result5[0].tel_reception,
                dolj = result5[0].dolj
        }
        const data = {
            result: result, result_sopb: result_sopb, result2: result2, result22: result22, id_subj, subj, tel_dover, tel_reception, departament, rec_mail, rec_data, rec,
            num, num_doc, dept_iss, date_doc, addr_record, dept, plan, sphera, reason, resh, builds, curdate, agent, name_agent, perio, technical,
            date_begin, date_end, other_info, tnpa, questions, users, user_1, region, region1, ss, boss, dolj,
            short_tnpa, name_def, comm, sopb_subj, nop22, nop2

        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }



    }
    //7 - Справка проверки
    generate7 = async (dto: genDocDTO3) => {

        let id_subj = 0, id_event = 0, id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = "_____________________", rec_mail = addr_record, rec_data = date_doc, rec = dept_iss, vedomstva = num_doc,
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc,
            reason_order = dept_iss,
            perio = reason, perio_stop = reason, technical = departament, date_end = date_doc, date_begin = date_doc,
            other_info = departament, comm = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament, users = departament,
            user_1 = departament,
            region = num_doc, boss = num_doc, dolj = num_doc, region1 = num_doc, num = num_doc, tel_dover = dept_iss,
            tel_reception = dept_iss, resh = num_doc, plan = num_doc,
            ss = '(указываются место и время совершения (обнаружения) нарушений, существо нарушений с указанием нормативного правового акта,требования которого нарушены)';
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/7 - Справка проверки.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }

        const result = await AppDataSource.manager.query(`
        SELECT @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        s.addr_record ,s.num_doc,
        @fl_rec:=s.fl_rec,
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(s.receiver,"____________________" ) 
        ELSE "______________________"
        END                                                 rec,
        
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ) 
        ELSE "_____  ________  20__г."
        END                                                 rec_data,
        
        CASE 
        WHEN @fl_rec=1 THEN  CONCAT_WS(' ',
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ), " почтой")
        ELSE ""
        END                                                 rec_mail ,
        #DATE(CURDATE()) curdate,
        CASE e.id_unit_4
         WHEN 91 THEN (SELECT CONCAT(DATE_FORMAT(DATE(r.date_doc), "%d.%m.%Y")," № ",r.num_doc) FROM s_form_report r WHERE r.id_event_order=@eo AND r.id_form=1009 AND active=1 LIMIT 1)
         ELSE (SELECT CONCAT("Решение № ",r.num_doc," от ",DATE_FORMAT(DATE(r.date_doc), "%d.%m.%Y")) FROM s_form_report r WHERE r.id_event_order=@eo AND r.id_form=1008 AND active=1 LIMIT 1)
        END                                                  resh,
        
        CONCAT_WS(" ", " пунктом плана выборочных проверок №",pl.num_order," на ",pl.halfyear_event,"полугодие ",
         pl.year_plan,"(",ob.name_obl,"обл.)")              plan,

        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")           date_doc,

        CONCAT_WS(' ',IFNULL(ss.unp,""),IFNULL(ss.subj,""), 
        IFNULL(ss.addr_yur,ss.addr_fact),
        IFNULL(sv.name ,"" )              )                 subj,
       
        @perio:= CONCAT_WS
        ("  ",
          DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y"),
          DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y")," - ",
          case WHEN e.date_stop IS NOT NULL THEN
                  CONCAT_WS(" "," (период продления: ",DATE_FORMAT(DATE(e.date_stop), "%d.%m.%Y")," - ",
                  DATE_FORMAT(DATE(e.date_continue), "%d.%m.%Y"),")"  )
               ELSE ""
          END
        ),
         
        case    WHEN @perio IS NOT NULL   THEN  @perio
            ELSE "c ___ ________20__г. по ___ ________20__г."
        END                                                 perio, 

        IFNULL(CONCAT_WS(' ',e.post_agent,e.name_agent),"") agent,
        IFNULL(e.name_agent,"")                             name_agent ,
        IFNULL(s.other_info,"")                             other_info,
        IFNULL(s.comm,"")                                   comm
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_vedomstva sv ON sv.id_ved=ss.id_ved
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        LEFT JOIN mchs.s_events_plan pl on pl.id_event_plan=e.id_event_plan
        LEFT JOIN mchs.s_ate_obl ob ON ob.id_obl=pl.id_obl
        WHERE ss.active=1 AND s.active=1 AND e.active=1  AND e.org=1   AND s.org=1  
        AND  s.id_list=${dto.id_list} #3
        AND e.num_order="${dto.num_order}" `);//'1   /П'   100008077  100297103


        if (result.length > 0) {
            id_event_order = result[0].id_event_order;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;//
            addr_record = result[0].addr_record;
            date_doc = result[0].date_doc;
            subj = result[0].subj,
                perio = result[0].perio,
                curdate = result[0].curdate,
                agent = result[0].agent,
                other_info = result[0].other_info,
                comm = result[0].comm,
                id_event = result[0].id_event,
                reason_order = result[0].reason_order,
                rec = result[0].rec,
                rec_data = result[0].rec_data,
                vedomstva = result[0].vedomstva,
                rec_mail = result[0].rec_mail,
                resh = result[0].resh,
                plan = result[0].plan;

        }
        //Перечень вопросов, подлежащих проверке 
        const result2 = await AppDataSource.manager.query(` 
     SELECT 
         ROW_NUMBER() OVER ( ORDER BY e.id_list ) num,q.name_que questions 
         
         FROM mchs.s_events_order v
         LEFT JOIN mchs.s_events_que s ON v.id_event=s.id_event
         LEFT JOIN mchs.s_events_order_que e ON e.id_list=s.id_list
         
         LEFT JOIN s_question q ON q.id_que=s.id_que
         WHERE v.id_event_order=${id_event_order}  AND v.active=1  AND e.active=1 AND q.org= 1 AND s.active=1 AND q.active=1;`);
        if (result2.length > 0) {
            questions = result2[0].questions,
                num = result2[0].num

        }
        //Руководитель user_1 
        const result3 = await AppDataSource.manager.query(` 
     
         SELECT  uu .fio user_1
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    #LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                 WHERE   uu.active=1 AND uu.org=1 AND g.active=1 AND g.org=1  
                    AND ug.active=1 AND ug.org=1 #j.active=1 and 
                    AND ug.type_user in(1) AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order}   ;`);
        if (result3.length > 0) {
            user_1 = result3[0].user_1

        }
        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
     SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
         SELECT 
                    j.job j,uu .fio f,
                    CASE ug.type_user
                    WHEN 1 THEN "руководитель"
                    WHEN 2 THEN "исполнитель"
                    ELSE "" 
                    END t
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE  j.active=1   AND j.org=1 and  uu.active=1   AND uu.org=1 
                    AND g.active=1   AND g.org=1 AND  g.org=1 AND ug.active=1  AND  ug.org=1
                    AND ug.type_user not in(0,3,4) AND  e.org=1 AND e.active=1 AND e.id_event_order=${id_event_order} LIMIT 2)dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }

        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT  uu .fio boss,LOWER(d.depart_rod) region1 ,
        CASE ug.type_user
         WHEN 0 THEN "Должн.лицо, направившее чек-лист"
           WHEN  1 THEN "руководитель группы"
           WHEN 2 THEN "инспектор"
           WHEN 3 THEN "Главный государcтвенный инспектор"
           WHEN 4 THEN "Государcтвенный инспектор "
           ELSE "" 
           END dolj,
        
           @dpt:=e.id_dept_iss ,@dpt_:=e.id_dept,@dpt_p:=d.id_parent,
           IF(@dpt_p IS  NOT NULL,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt_p AND d.active=1  LIMIT 1),d.departament)departament,
           IF(@dpt IS NOT NULL,di.departament,"") departament_boss,
           IFNULL(d.tel_dover,"")tel_dover,
           IFNULL(d.tel_reception,"")tel_reception,
           CASE d.id_obl
           WHEN 1 THEN "брестской обл."
           WHEN  2 THEN "витебской обл."
           WHEN 3 THEN "гомельской обл."
           WHEN 4 THEN "гродненской обл."
           WHEN 5 THEN "г.Минска"
           WHEN 6 THEN "минской обл."
           WHEN 7 THEN "могилеской обл."
           ELSE "" 
           END region
       
           FROM 
           mchs.s_events_order e 
           LEFT JOIN mchs.group g ON g.id_group=e.id_group
           LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
           LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
           LEFT JOIN mchs.s_dept d ON e.id_dept=d.id_dept
           LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
           WHERE uu.active=1 AND uu.org=1 AND d.active=1 AND d.org=1   AND g.active=1 AND g.org=1   AND ug.active=1  
           AND ug.type_user IN (3,4) 
           AND ug.org=1
           and  e.id_event_order=${id_event_order}   ;`);
        if (result5.length > 0) {
            boss = result5[0].boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                departament = result5[0].departament,
                tel_dover = result5[0].tel_dover,
                tel_reception = result5[0].tel_reception,
                dolj = result5[0].dolj

        }
        const data = {
            result: result, result2: result2, id_subj, subj, tel_dover, tel_reception, departament, reason_order,
            rec_mail, rec_data, rec,
            num, num_doc, dept_iss, date_doc, addr_record, dept, sphera, reason, builds, curdate, agent, name_agent,
            perio, perio_stop, dolj, boss, resh, plan,
            technical, date_begin, date_end, other_info, comm, tnpa, questions, users, user_1, region, region1, ss

        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }



    }
    //9 - Предписание об устранении нарушений
    generate9 = async (dto: genDocDTO3) => {

        let id_subj = 0, id_event = 0, id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = "_____________________", rec_mail = addr_record, rec_data = date_doc, rec = dept_iss, sopb_subj = departament,
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc, reason_order = dept_iss,
            perio = reason, perio_stop = reason, technical = departament,
            date_end = date_doc, date_begin = date_doc, other_info = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament, users = departament, user_1 = departament,
            region = num_doc, boss = num_doc, dolj = num_doc, resh = "________ 20 __ г. № ___",
            region1 = num_doc, num = num_doc, tel_dover = dept_iss, tel_reception = dept_iss,
            num_def = 0, recomend = "", date_fix = "", date_inform = "", transfer_data = "",
            ss = '(указываются место и время совершения (обнаружения) нарушений, существо нарушений с указанием нормативного правового акта,требования которого нарушены)';
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/9 - Предписание об устранении нарушений.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }

        const result = await AppDataSource.manager.query(`
        SELECT @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        s.addr_record ,s.num_doc,
        @fl_rec:=s.fl_rec,
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(s.receiver,"____________________" ) 
        ELSE "______________________"
        END                                                 rec,
        
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ) 
        ELSE "_____  ________  20__г."
        END                                                 rec_data,
        
        CASE 
        WHEN @fl_rec=1 THEN  CONCAT_WS(' ',
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ), " почтой")
        ELSE ""
        END                                                 rec_mail ,
        #DATE(CURDATE()) curdate,
        CASE e.id_unit_4
         WHEN 91 THEN (SELECT CONCAT(DATE_FORMAT(DATE(r.date_doc), "%d.%m.%Y")," № ",r.num_doc) FROM s_form_report r WHERE r.id_event_order=@eo AND r.id_form=1003 AND active=1 LIMIT 1)
         ELSE (SELECT CONCAT("Решение № ",r.num_doc," от ",DATE_FORMAT(DATE(r.date_doc), "%d.%m.%Y")) FROM s_form_report r WHERE r.id_event_order=@eo AND r.id_form=1008 AND active=1 LIMIT 1)
        END                                                    resh,
        
        CONCAT_WS(" ", " п.плана выборочных проверок №",pl.num_order," на ",pl.halfyear_event,"полугодие ",
         pl.year_plan,"(",ob.name_obl,"обл.)")              plan,

        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")           date_doc,

        CONCAT_WS(' ',IFNULL(ss.unp,""),IFNULL(ss.subj,""), 
        IFNULL(ss.addr_yur,ss.addr_fact),
        IFNULL(sv.name ,"" )              )                 subj,
        
        @perio:= CONCAT_WS
        ("  ",
          DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y"),
          DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y")," - ",
          case WHEN e.date_stop IS NOT NULL THEN
                  CONCAT_WS(" "," (период продления: ",DATE_FORMAT(DATE(e.date_stop), "%d.%m.%Y")," - ",
                  DATE_FORMAT(DATE(e.date_continue), "%d.%m.%Y"),")"  )
               ELSE ""
          END
        ),
         
        case    WHEN @perio IS NOT NULL   THEN  @perio
            ELSE "c ___ ________20__г. по ___ ________20__г."
        END                                                 perio, 

        IFNULL(CONCAT_WS(' ',e.post_agent,e.name_agent),"") agent,
        IFNULL(e.name_agent,"")                             name_agent ,
        IFNULL(s.other_info,"")                             other_info,
        IFNULL(s.comm,"")                                   comm
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_vedomstva sv ON sv.id_ved=ss.id_ved
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        LEFT JOIN mchs.s_events_plan pl on pl.id_event_plan=e.id_event_plan
        LEFT JOIN mchs.s_ate_obl ob ON ob.id_obl=pl.id_obl
        WHERE ss.active=1 AND s.active=1 AND e.active=1  AND e.org=1   AND s.org=1  
        AND  s.id_list=${dto.id_list}#9
        AND e.num_order="${dto.num_order}" `);//'1   /П'   100008077  100297103


        if (result.length > 0) {
            id_event_order = result[0].id_event_order,
                id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;//
            addr_record = result[0].addr_record;
            date_doc = result[0].date_doc;
            subj = result[0].subj,
                perio = result[0].perio,
                curdate = result[0].curdate,
                agent = result[0].agent,
                other_info = result[0].other_info,
                id_event = result[0].id_event,
                reason_order = result[0].reason_order,
                rec = result[0].rec,
                rec_data = result[0].rec_data,
                rec_mail = result[0].rec_mail,
                resh = result[0].resh;

        }
        //Перечень вопросов, подлежащих проверке 
        /*const result2 = await AppDataSource.manager.query(` 
        SELECT 
            ROW_NUMBER() OVER ( ORDER BY e.id_list ) num,CONCAT_WS('  ',q.name_que )questions 
            
            FROM mchs.s_events_order v
            LEFT JOIN mchs.s_events_que s ON v.id_event=s.id_event
            LEFT JOIN mchs.s_events_order_que e ON e.id_list=s.id_list
            
            LEFT JOIN s_question q ON q.id_que=s.id_que
            WHERE v.id_event_order=${id_event_order}  AND v.active=1  AND e.active=1 AND q.org= 1 
            AND s.active=1 AND q.active=1;`);
        if (result2.length > 0) {
            questions = result2[0].questions,
            num = result2[0].num
   
        }*/
        //Перечень мероприятий по устранению нарушениий, подлежащих проверке 
        const result2 = await AppDataSource.manager.query(` 
    SELECT  ROW_NUMBER() OVER ( ORDER BY e.id_list )                num_def, 
           IFNULL(q.name_def,"")                                    name_def,
           IFNULL(q.recomend,"")                                    recomend,
           IFNULL(DATE_FORMAT(DATE(e.date_fix), "%d.%m.%Y"),"")     date_fix,
           IFNULL(DATE_FORMAT(DATE(e.date_inform), "%d.%m.%Y"),"")  date_inform,
           IFNULL( e.transfer_data,"")                              transfer_data
           #,q.id_def
       # CONCAT_WS('. ',ROW_NUMBER() OVER ( ORDER BY e.id_list ) ,q.name_que) questions
            FROM mchs.s_events_order_que_def e 
            LEFT JOIN s_defection  q ON q.id_def=e.id_def
            WHERE e.id_event_order=1  #AND e.active=1 AND q.org=1  AND q.active=1 ;`);
        if (result2.length > 0) {
            num_def = result2[0].num_def,
                recomend = result2[0].recomend,
                date_fix = result2[0].num,
                date_inform = result2[0].date_inform,
                transfer_data = result2[0].transfer_data


        }
        //Руководитель user_1 
        const result3 = await AppDataSource.manager.query(` 
     
         SELECT  uu .fio user_1
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    #LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                 WHERE   uu.active=1 AND uu.org=1 AND g.active=1 AND g.org=1  
                    AND ug.active=1 AND ug.org=1 #j.active=1 and 
                    AND ug.type_user in(1) AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order}   ;`);
        if (result3.length > 0) {
            user_1 = result3[0].user_1

        }
        //СОПИБ 
        const result_sopb = await AppDataSource.manager.query(` 
     
     SELECT GROUP_CONCAT(sopb_subj SEPARATOR '; ') sopb_subj FROM (
        SELECT  CONCAT_WS("  " ,
             ROW_NUMBER() OVER ( ORDER BY s.id_data ),c.name,c.num_doc,c.date_doc )sopb_subj
             FROM s_sopb_card_subj s
             LEFT join s_sopb_card c ON c.id_card=s.id_card
             WHERE s.id_subj=${id_subj} AND s.active=1 AND c.active=1 AND s.fl_mnf_exp=1)dd; ;`);
        if (result_sopb.length > 0) {
            sopb_subj = result_sopb[0].sopb_subj

        }
        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
     SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
         SELECT 
                    j.job j,uu .fio f,
                    CASE ug.type_user
                    WHEN 1 THEN "руководитель"
                    WHEN 2 THEN "исполнитель"
                    ELSE "" 
                    END t
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE  j.active=1   AND j.org=1 and  uu.active=1   AND uu.org=1 
                    AND g.active=1   AND g.org=1 AND  g.org=1 AND ug.active=1  AND  ug.org=1
                    AND ug.type_user not in(0,3) AND  e.org=1 AND e.active=1 AND e.id_event_order=${id_event_order} LIMIT 2)dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }

        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT  uu .fio boss,LOWER(d.depart_rod) region1 ,
        CASE ug.type_user
         WHEN 0 THEN "Должн.лицо, направившее чек-лист"
           WHEN  1 THEN "руководитель группы"
           WHEN 2 THEN "инспектор"
           WHEN 3 THEN "Главный государcтвенный инспектор"
           WHEN 4 THEN "Государcтвенный инспектор "
           ELSE "" 
           END dolj,
        
           @dpt:=e.id_dept_iss ,@dpt_:=e.id_dept,@dpt_p:=d.id_parent,
           IF(@dpt_p IS  NOT NULL,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt_p AND d.active=1  LIMIT 1),d.departament)departament,
           IF(@dpt IS NOT NULL,di.departament,"") departament_boss,
           IFNULL(d.tel_dover,"")tel_dover,
           IFNULL(d.tel_reception,"")tel_reception,
           CASE d.id_obl
           WHEN 1 THEN "брестской обл."
           WHEN  2 THEN "витебской обл."
           WHEN 3 THEN "гомельской обл."
           WHEN 4 THEN "гродненской обл."
           WHEN 5 THEN "г.Минска"
           WHEN 6 THEN "минской обл."
           WHEN 7 THEN "могилеской обл."
           ELSE "" 
           END region
       
           FROM 
           mchs.s_events_order e 
           LEFT JOIN mchs.group g ON g.id_group=e.id_group
           LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
           LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
           LEFT JOIN mchs.s_dept d ON e.id_dept=d.id_dept
           LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
           WHERE uu.active=1 AND uu.org=1 AND d.active=1 AND d.org=1   AND g.active=1 AND g.org=1   AND ug.active=1  
           AND ug.type_user IN (3,4) 
           AND ug.org=1
           and  e.id_event_order=${id_event_order}   ;`);
        if (result5.length > 0) {
            boss = result5[0].boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                departament = result5[0].departament,
                tel_dover = result5[0].tel_dover,
                tel_reception = result5[0].tel_reception,
                dolj = result5[0].dolj

        }
        const data = {
            result: result, result2: result2, id_subj, subj, tel_dover, tel_reception, departament, reason_order,
            rec_mail, rec_data, rec, sopb_subj, resh,
            num, num_doc, dept_iss, date_doc, addr_record, dept, sphera, reason, builds,
            curdate, agent, name_agent, perio, perio_stop,
            technical, date_begin, date_end, other_info, tnpa, questions, users, user_1, region, region1, ss,
            boss, dolj,
            num_def, recomend, date_fix, date_inform, transfer_data

        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }



    }
    //14 - Пожарно-техническая карта
    generate14 = async (dto: genDocDTO14) => {
        //  console.log(dto);
        console.log("generate14!!!!!!!!!!!!!");
        let id_subj = 0;
        let area = "_________________________", addr = "_________________________", descr = "____________________",
            addr_record = "_________________________", f7 = "____________________________________________________________",
            f1 = area, f2 = area, f3 = area, f4 = area, f5 = descr;
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/14 - Пожарно-техническая карта.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }
        /*const resul = await AppDataSource.transaction(async (entityManager)=>{

        }).;*/

        const result = await AppDataSource.manager.query(`
            SELECT s.id_subj,CONCAT_WS(' ',IFNULL(s.subj,""), IFNULL(s.unp,""),',  ',IFNULL(s.addr_yur,""))f1,
            CONCAT_WS(' ',s.subj, unp)f2,
            IFNULL(v.name,"")f3,s.addr_yur f4,DATE_FORMAT(CURDATE(), "%d.%m.%Y") f5
            FROM mchs.s_subj s 
            
            LEFT JOIN s_fire_card_subj  fc ON s.id_subj=fc.id_subj
            LEFT JOIN mchs.s_vedomstva v ON v.id_ved=s.id_ved
            WHERE s.unp =${dto.unp}`);//100297103
        // const res = this.getResult6("123456");

        if (result.length > 0) {
            id_subj = result[0].id_subj;
            f1 = result[0].f1, f2 = result[0].f2, f3 = result[0].f3, f4 = result[0].f4, f5 = result[0].f5;
        }
        //4. Сведения  о  должностных лицах
        const result4 = await AppDataSource.manager.query(`
           SELECT IFNULL(f.staff_name,"") staff,
           IFNULL(fio,"") fio,IFNULL(phone,"") phone 
           FROM s_fire_card_staff f
           LEFT JOIN mchs.s_subj s ON s.id_subj=f.id_subj
           WHERE s.unp=${dto.unp} AND s.active=1 AND f.active=1 AND type_org=0;`);
        //5. Сведения  о  внештатных пожарных формированиях объекта
        const result5 = await AppDataSource.manager.query(`
           SELECT IFNULL(f.staff_name,"") staff,IFNULL(fio,"") fio,IFNULL(phone,"") phone 
           FROM s_fire_card_staff f
           LEFT JOIN mchs.s_subj s ON s.id_subj=f.id_subj
           WHERE s.unp=${dto.unp} AND s.active=1  AND f.active=1 AND type_org=1;`);
        const result6 = await AppDataSource.manager.query(`
           SELECT IFNULL(area,"")area,IFNULL(descr,"")descr,IFNULL(addr_record,"") addr_record, IFNULL(service_org,"") f7,
           DATE_FORMAT(DATE(f.date_record), "%d.%m.%Y") date_record 
           FROM s_fire_card_subj f 
           LEFT JOIN mchs.s_subj s ON s.id_subj=f.id_subj
           WHERE s.unp=${dto.unp} AND s.active=1  AND f.active=1 ;`);

        if (result6.length > 0) {
            area = result6[0].area;
            descr = result6[0].descr;
            addr_record = result6[0].addr_record,
                f7 = result6[0].f7
        }
        //6.2. Характеристика отдельно стоящих зданий, наружных установок
        const result62 = await AppDataSource.manager.query(`
           SELECT IFNULL(su.type,"") type6,su1.type type17_37,IFNULL(f.name_build,"") name_build,IFNULL(f.num_person,"") num_person,
           IFNULL(f.level_build,"") level_build, IFNULL(f.space,"") space,IFNULL(f.area,"") area,
            IFNULL(space,"")space ,IFNULL(area_A,"")area_A ,IFNULL(area_6,"")area_6 ,IFNULL(area_B1,"")area_B1 ,
            IFNULL(area_B2,"")area_B2 ,IFNULL(area_B3,"")area_B3 ,IFNULL(area_B4,"")area_B4
           FROM s_fire_card_build f 
           LEFT JOIN mchs.s_subj s ON s.id_subj=f.id_subj
           LEFT JOIN s_units su ON su.id_unit=f.id_unit_6
           LEFT JOIN s_units su1 ON su1.id_unit=f.id_unit_17_37
           WHERE s.unp=${dto.unp} AND s.active=1  AND f.active=1 ;`);//100008077
        //6.2.2.1. автоматическая система пожаротушения
        const result6221 = await AppDataSource.manager.query(`
           SELECT IFNULL(type_set,"") type_set,IFNULL(type_fire_device,"") type_fire_device,
           IFNULL(type_start_sys,"") type_start_sys,
           IFNULL(num_secure_route,"") num_secure_route,
           DATE_FORMAT(DATE(date_in), "%d.%m.%Y")  date_in
           FROM s_fire_card_auto f 
           LEFT JOIN mchs.s_subj s ON s.id_subj=f.id_subj
           WHERE s.unp=${dto.unp}  AND s.active=1  AND f.active=1;`);
        //6.2.2.2. автоматическая пожарная сигнализация: 
        const result6222 = await AppDataSource.manager.query(`
           SELECT  IFNULL(receive_station,"") receive_station,IFNULL(addr,"") addr, 
           IFNULL(detector_mark,"") detector_mark,
           IFNULL(num_cable,"") num_cable,IFNULL(where_sygnal,"") where_sygnal,IFNULL(with_block,"") with_block,
           DATE_FORMAT(DATE(date_in), "%d.%m.%Y") date_in
           FROM s_fire_card_signal f 
           LEFT JOIN mchs.s_subj s ON s.id_subj=f.id_subj
           WHERE s.unp=${dto.unp}  AND s.active=1  AND f.active=1;`);
        //6.2.3. внутреннее  противопожарное водоснабжение
        const result623 = await AppDataSource.manager.query(`
           SELECT  IFNULL(num_pk,"") num_pk,IFNULL(num_pk_floor,"") num_pk_floor, 
           IFNULL(diam_water_network,"") diam_water_network,IFNULL(type_screw,"") type_screw
           FROM s_fire_card_internal f 
           LEFT JOIN mchs.s_subj s ON s.id_subj=f.id_subj
           WHERE s.unp=${dto.unp} AND s.active=1  AND f.active=1;`);
        //7. Наружное противопожарное водоснабжение   
        const result7 = await AppDataSource.manager.query(`
           SELECT IFNULL(type_space,"") type_space,IFNULL(addr,"") addr, IFNULL(type_network,"") type_network,
           IFNULL(diam_water_network,"") diam_water_network,IFNULL(water_take,"") water_take
           FROM s_fire_card_external f 
           LEFT JOIN mchs.s_subj s ON s.id_subj=f.id_subj
           WHERE s.unp=${dto.unp} AND s.active=1  AND f.active=1 ;`);
        //8. Сведения по направляемым информациям о противопожарном состоянии субъекта
        const result8 = await AppDataSource.manager.query(`
           SELECT IFNULL(date_num,"") date_num,IFNULL(target,"") target, IFNULL(content,"") content
           FROM s_fire_card_info_to f 
           LEFT JOIN mchs.s_subj s ON s.id_subj=f.id_subj
           WHERE s.unp=${dto.unp} AND s.active=1  AND f.active=1;`);
        //9.Сведения о применении мер административного принуждения
        const result9 = await AppDataSource.manager.query(`
        SELECT DATE_FORMAT(DATE(date_force), "%d.%m.%Y") date_force,
        IFNULL(staff,"") staff,IFNULL(fio,"") fio,IFNULL(num_case,"") num_case
        #f.id_event_order,f.id_obj,s.unp,f.id_report
                   FROM mchs.s_events_order_adm_force f  
                   left join mchs.s_events_order e ON e.id_event_order=f.id_event_order
                   LEFT JOIN mchs.s_subj s ON s.id_subj=e.id_subj
                   WHERE s.unp=${dto.unp} AND s.active=1 AND f.active=1 AND f.org=1  ;`);
        //10. Сведения о применении мер административного пресечения
        const result10 = await AppDataSource.manager.query(`
        SELECT 
           
        DATE_FORMAT(DATE(date_decision), "%d.%m.%Y") date_decision,
        IFNULL(os.name_build,"") ban_obj,IFNULL(num_case,"") num_case,
        DATE_FORMAT(DATE(f.date_begin), "%d.%m.%Y") date_begin,
        decision
        #f.id_event_order,f.id_obj,s.unp,f.id_report
                FROM mchs.s_events_order_adm_ban f  
                left join mchs.s_events_order e ON e.id_event_order=f.id_event_order
                LEFT JOIN mchs.s_subj s ON s.id_subj=e.id_subj
                LEFT JOIN mchs.s_subj_obj_specif os ON os.id_subj_obj=f.id_obj
                WHERE s.unp=${dto.unp} #100297103   100008077 
                AND s.active=1 AND f.active=1 AND f.org=1`);
        //11. Информация о происходивших пожарах
        const result11 = await AppDataSource.manager.query(`
           SELECT DATE_FORMAT(DATE(date_fire), "%d.%m.%Y") date_fire,
           IFNULL(addr,"") addr,IFNULL(trouble,"") trouble,IFNULL(ground,"") ground,IFNULL(step,"") step
           FROM s_fire_card_info f  
           LEFT JOIN mchs.s_subj s ON s.id_subj=f.id_subj
           WHERE s.unp=${dto.unp} AND s.active=1  AND f.active=1 ;`);
        //12. Сведения об арендаторах
        const result12 = await AppDataSource.manager.query(`
           SELECT  IFNULL(name_addr,"") name_addr,IFNULL(contract_info,"") contract_info,
           IFNULL(rent_info,"") rent_info,IFNULL(name_oked,"") name_oked
           FROM s_fire_card_rent f  
           LEFT JOIN mchs.s_subj s ON s.id_subj=f.id_subj
           WHERE s.unp=${dto.unp} AND s.active=1  AND f.active=1 ;`);

        const data = {
            id_subj: id_subj,
            f1: f1,
            f2: f2,
            f3: f3,
            f4: f4,
            f5: f5,
            f6: area,
            f7: f7,
            descr: descr,
            addr_record: addr_record,
            result4: result4,
            result5: result5,
            result: result,
            result62: result62,
            result6221: result6221,
            result6222: result6222,
            result623: result623,
            result7: result7,
            result8: result8,
            result9: result9,
            result10: result10,
            result11: result11,
            result12: result12
        }

        try {
            let output = new Docxtemplater(zip);

            /*output.setData(result[0], {result}, {result4}, {result5}, {result62}, {result6221}, {result6222}, {result623},
               {result7},{result8},{result9},{result10}, {result11}, {result12});*/
            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }

    }
    //15 - Решение о проведении мониторинга
    generate15 = async (dto: genDocDTO3) => {

        let id_subj = 0, id_event = 0, id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = "_____________________", rec_mail = addr_record, rec_data = date_doc, rec = dept_iss, sopb_subj = departament,
            obj_obj = departament,
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc, reason_order = dept_iss,
            perio = reason, perio_stop = reason, technical = departament, date_end = date_doc, date_begin = date_doc, other_info = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament, users = departament, user_1 = departament,
            region = num_doc, dolj = num_doc, boss = num_doc, region1 = num_doc, num = num_doc,
            tel_dover = dept_iss, tel_reception = dept_iss,
            ss = '(указываются место и время совершения (обнаружения) нарушений, существо нарушений с указанием нормативного правового акта,требования которого нарушены)';
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/15 - Решение о проведении мониторинга.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }

        const result = await AppDataSource.manager.query(`
        SELECT @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        s.addr_record ,s.num_doc,
        @fl_rec:=s.fl_rec,
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(s.receiver,"____________________" ) 
        ELSE "______________________"
        END         rec,
        
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ) 
        ELSE "_____  ________  20__г."
        END         rec_data,
        
        CASE 
        WHEN @fl_rec=1 THEN  CONCAT_WS(' ',
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ), " почтой")
        ELSE ""
        END rec_mail ,
        IFNULL(e.reason_order,"") reason_order,
        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")date_doc,
        CONCAT_WS(' ',IFNULL(ss.unp,""),IFNULL(ss.subj,""), IFNULL(ss.addr_yur,ss.addr_fact),IFNULL(sv.name,""))subj,
        @perio:= CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.period_check_from), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.period_check_to), "%d.%m.%Y")
            ),
        @perio_stop:=CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.date_stop), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.date_continue), "%d.%m.%Y")),
        CONCAT_WS(' ',(CASE 
        WHEN @perio IS NOT NULL   THEN  @perio
        ELSE "c _______________ по _______________"
        END) ,
        
        (CASE 
        WHEN @perio_stop IS NOT NULL  THEN ( CONCAT("(",@perio_stop,")") )
        ELSE "" 
        END ))perio,
        IFNULL(DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y"),"") date_begin,
        IFNULL(DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),"") date_end,
        IFNULL(CONCAT_WS(' ',e.post_agent,e.name_agent),"") agent,
        IFNULL(e.name_agent,"")name_agent ,
        IFNULL(s.other_info,"") other_info
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_vedomstva sv ON sv.id_ved=ss.id_ved
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        WHERE ss.active=1 AND s.active=1 AND e.active=1 AND e.org=1   
        AND  s.id_list=${dto.id_list} #4
        AND e.num_order="${dto.num_order}" `);//'1   /П'   100008077  100297103


        if (result.length > 0) {
            id_event_order = result[0].id_event_order;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;//
            addr_record = result[0].addr_record;
            date_doc = result[0].date_doc;
            date_begin = result[0].date_begin;
            date_end = result[0].date_end;
            subj = result[0].subj,
                perio = result[0].perio,
                curdate = result[0].curdate,
                agent = result[0].agent,
                other_info = result[0].other_info,
                id_event = result[0].id_event,
                reason_order = result[0].reason_order,
                rec = result[0].rec,
                rec_data = result[0].rec_data,
                rec_mail = result[0].rec_mail;

        }
        //Перечень вопросов, подлежащих проверке 
        /*const result2 = await AppDataSource.manager.query(` 
        SELECT GROUP_CONCAT(sq.name_que  SEPARATOR ";  ")questions 
        FROM mchs.s_events_order_que e
        LEFT JOIN mchs.s_events_que q ON q.id_list=e.id_que
        LEFT JOIN s_question sq ON sq.id_que=q.id_que
        WHERE e.id_event_order=${id_event_order} AND  e.active=1  AND sq.active=1 AND q.active=1;
         `);
        if (result2.length > 0) {
            questions = result2[0].questions,
            num = result2[0].num
   
        }*/
        //Перечень вопросов, подлежащих проверке в табличном виде 
        const result20 = await AppDataSource.manager.query(` 
     SELECT 
     e.id_list,q.id_que, CONCAT_WS('. ',ROW_NUMBER() OVER ( ORDER BY e.id_list ) ,q.name_que) questions
          FROM mchs.s_events_order v
          LEFT JOIN mchs.s_events_order_que e ON e.id_event_order=v.id_event_order
          LEFT JOIN s_question q ON q.id_que=e.id_que
          WHERE v.id_event_order=${id_event_order}   AND v.active=1  AND e.active=1 AND q.org=1  AND q.active=1;
         `);
        if (result20.length > 0) {
            result20
        }
        console.log("result20:  " + result20);
        //Перечень обособленных подразделений  
        //(его обособленного подразделения) и непосредственных объектов мониторинга, адрес места нахождения)
        const result_obj = await AppDataSource.manager.query(` 
     SELECT  GROUP_CONCAT(obj SEPARATOR '.   ') obj_obj from
     (SELECT CONCAT_WS(": ",so.name_obj , GROUP_CONCAT( CONCAT_WS("   ",o.addr_exect,o.name) SEPARATOR '; ')) obj 
     FROM mchs.s_events_order_obj o
     LEFT JOIN mchs.s_subj_obj so ON so.id_obj=o.id_obj
     LEFT JOIN mchs.s_events_order e ON e.id_event_order=o.id_event_order
     LEFT JOIN mchs.s_subj s ON  e.id_subj=s.id_subj
     WHERE e.id_event_order=${id_event_order} AND o.active=1 AND so.active=1 AND so.org=1 GROUP BY o.id_obj,s.id_subj)dd;
         `);
        if (result_obj.length > 0) {
            obj_obj = result_obj[0].obj_obj
        }

        //Руководитель user_1 
        const result3 = await AppDataSource.manager.query(` 
     
         SELECT  uu .fio user_1
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    #LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                 WHERE   uu.active=1 AND uu.org=1 AND g.active=1 AND g.org=1  
                    AND ug.active=1 AND ug.org=1 #j.active=1 and 
                    AND ug.type_user in(1) AND e.active=1 AND e.org=1 AND e.id_event=${id_event}   ;`);
        if (result3.length > 0) {
            user_1 = result3[0].user_1

        }
        //СОПИБ 
        const result_sopb = await AppDataSource.manager.query(` 
     
     SELECT GROUP_CONCAT(sopb_subj SEPARATOR '; ') sopb_subj FROM (
        SELECT  CONCAT_WS("  " ,
             ROW_NUMBER() OVER ( ORDER BY s.id_data ),c.name,c.num_doc,c.date_doc )sopb_subj
             FROM s_sopb_card_subj s
             LEFT join s_sopb_card c ON c.id_card=s.id_card
             WHERE s.id_subj=${id_subj} AND s.active=1 AND c.active=1 AND s.fl_mnf_exp=1)dd; ;`);
        if (result_sopb.length > 0) {
            sopb_subj = result_sopb[0].sopb_subj

        }
        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
     SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
         SELECT 
                    j.job j,uu .fio f,
                    CASE ug.type_user
                    WHEN 1 THEN "руководитель"
                    WHEN 2 THEN "исполнитель"
                    ELSE "" 
                    END t
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE  j.active=1   AND j.org=1 and  uu.active=1   AND uu.org=1 
                    AND g.active=1   AND g.org=1 AND  g.org=1 AND ug.active=1  AND  ug.org=1
                    AND ug.type_user not in(0,3) AND  e.org=1 AND e.active=1 AND e.id_event=${id_event} LIMIT 2)dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }

        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT  uu .fio boss,LOWER(d.depart_rod) region1 ,
        CASE ug.type_user
         WHEN 0 THEN "Должн.лицо, направившее чек-лист"
           WHEN  1 THEN "руководитель группы"
           WHEN 2 THEN "инспектор"
           WHEN 3 THEN "Главный государcтвенный инспектор"
           WHEN 4 THEN "Государcтвенный инспектор "
           ELSE "" 
           END dolj,
        
           @dpt:=e.id_dept_iss ,@dpt_:=e.id_dept,@dpt_p:=d.id_parent,
           IF(@dpt_p IS  NOT NULL,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt_p AND d.active=1  LIMIT 1),d.departament)departament,
           IF(@dpt IS NOT NULL,di.departament,"") departament_boss,

           IFNULL(d.tel_dover,"")tel_dover,
           IFNULL(d.tel_reception,"")tel_reception,



           CASE d.id_obl
           WHEN 1 THEN "брестской обл."
           WHEN  2 THEN "витебской обл."
           WHEN 3 THEN "гомельской обл."
           WHEN 4 THEN "гродненской обл."
           WHEN 5 THEN "г.Минска"
           WHEN 6 THEN "минской обл."
           WHEN 7 THEN "могилеской обл."
           ELSE "" 
           END region
       
           FROM 
           mchs.s_events_order e 
           LEFT JOIN mchs.group g ON g.id_group=e.id_group
           LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
           LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
           LEFT JOIN mchs.s_dept d ON e.id_dept=d.id_dept
           LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
           WHERE uu.active=1 AND uu.org=1 AND d.active=1 AND d.org=1   AND g.active=1 AND g.org=1   AND ug.active=1  
           AND ug.type_user IN (3,4) 
           AND ug.org=1
           and  e.id_event_order=${id_event_order}  ;`);
        if (result5.length > 0) {
            dolj = result5[0].dolj,
                boss = result5[0].boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                departament = result5[0].departament,
                tel_dover = result5[0].tel_dover,
                tel_reception = result5[0].tel_reception
        }
        const data = {
            result: result,
            //result2: result2,
            result20: result20,
            id_subj, subj, tel_dover, tel_reception, departament, reason_order,
            rec_mail, rec_data, rec, sopb_subj, obj_obj, id_event_order,
            num, num_doc, dept_iss, date_doc, addr_record, dept, sphera, reason, builds, curdate, agent, name_agent, perio, perio_stop,
            technical, date_begin, date_end, other_info, tnpa, questions, users, user_1, region, region1, ss, boss, dolj


        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }



    }
    //17 - Уведомление о проведении мониторинга
    generate17 = async (dto: genDocDTO3) => {

        let id_subj = 0, id_event = 0, id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = "_____________________", rec_mail = addr_record, rec_data = date_doc, rec = dept_iss, sopb_subj = departament,
            obj_obj = departament, month_begin = num_doc, year_plan = num_doc,
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc, reason_order = dept_iss,
            perio = reason, perio_stop = reason, technical = departament, date_end = date_doc, date_begin = date_doc, other_info = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament, users = departament, user_1 = departament,
            region = num_doc, boss = num_doc, dolj = num_doc, region1 = num_doc, num = num_doc, tel_dover = dept_iss, tel_reception = dept_iss,
            ss = '(указываются место и время совершения (обнаружения) нарушений, существо нарушений с указанием нормативного правового акта,требования которого нарушены)';
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/17 - Уведомление о проведении мониторинга.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }

        const result = await AppDataSource.manager.query(`
        SELECT @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        s.addr_record ,s.num_doc,
        @fl_rec:=s.fl_rec,
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(s.receiver,"____________________" ) 
        ELSE "______________________"
        END         rec,
        
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ) 
        ELSE "_____  ________  20__г."
        END         rec_data,
        
        CASE 
        WHEN @fl_rec=1 THEN  CONCAT_WS(' ',
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ), " почтой")
        ELSE ""
        END rec_mail ,
        IFNULL(e.reason_order,"") reason_order,
        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")date_doc,
        CONCAT_WS(' ',IFNULL(ss.unp,""),IFNULL(ss.subj,""), IFNULL(ss.addr_yur,ss.addr_fact),IFNULL(sv.name,""))subj,
        @perio:= CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.period_check_from), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.period_check_to), "%d.%m.%Y")
            ),
        @perio_stop:=CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.date_stop), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.date_continue), "%d.%m.%Y")),
        CONCAT_WS(' ',(CASE 
        WHEN @perio IS NOT NULL  THEN  @perio
        ELSE "c _______________ по _______________"
        END) ,
        
        (CASE 
        WHEN @perio_stop  IS NOT NULL  THEN ( CONCAT("(",@perio_stop,")") )
        ELSE "" 
        END ))                                                 perio,
        IFNULL(DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y"),"") date_begin,
        IFNULL(DATE_FORMAT(DATE(e.date_begin), "%Y"),"") year_plan,
        @month_begin:=IFNULL(DATE_FORMAT(DATE(e.date_begin), "%m"),"")       ,
        case
            when  @month_begin="01"   then "январь"
            when  @month_begin="02"   then "февраль"
            when  @month_begin="03"   then "март"
            when  @month_begin="04"   then "апрель"
            when  @month_begin="05"   then "май"
            when  @month_begin="06"   then "июнь"
            when  @month_begin="07"   then "июль"
            when  @month_begin="08"   then "август"
            when  @month_begin="09"   then "сентябрь"
            when  @month_begin="10"   then "октябрь"
            when  @month_begin="11"   then "ноябрь"
            when  @month_begin="12"   then "декабрь"

            else ""
        end month_begin,
        IFNULL(DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),"")   date_end,
        IFNULL(CONCAT_WS(' ',e.post_agent,e.name_agent),"")    agent,
        IFNULL(e.name_agent,"")                                name_agent ,
        IFNULL(s.other_info,"")                                other_info
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_vedomstva sv ON sv.id_ved=ss.id_ved
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        WHERE ss.active=1 AND s.active=1 AND e.active=1 AND e.org=1   
        AND  s.id_list=${dto.id_list} #4
        AND e.num_order="${dto.num_order}" `);//'1   /П'   100008077  100297103


        if (result.length > 0) {
            id_event_order = result[0].id_event_order;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;//
            addr_record = result[0].addr_record;
            date_doc = result[0].date_doc;
            date_begin = result[0].date_begin;
            date_end = result[0].date_end;
            subj = result[0].subj,
                perio = result[0].perio,
                curdate = result[0].curdate,
                agent = result[0].agent,
                other_info = result[0].other_info,
                id_event = result[0].id_event,
                reason_order = result[0].reason_order,
                rec = result[0].rec,
                rec_data = result[0].rec_data,
                rec_mail = result[0].rec_mail,
                month_begin = result[0].month_begin,
                year_plan = result[0].year_plan;

        }

        //Перечень вопросов, подлежащих проверке 
        /*const result2 = await AppDataSource.manager.query(` 
        SELECT GROUP_CONCAT(sq.name_que  SEPARATOR ";  ")questions 
        FROM mchs.s_events_order_que e
        LEFT JOIN mchs.s_events_que q ON q.id_list=e.id_event_que
        LEFT JOIN s_question sq ON sq.id_que=q.id_que
        WHERE e.id_event_order=${id_event_order} AND  e.active=1  AND sq.active=1 AND q.active=1;
         `);
        if (result2.length > 0) {
            questions = result2[0].questions,
            num = result2[0].num
   
        }*/
        //Перечень вопросов, подлежащих проверке в табличном виде 
        const result20 = await AppDataSource.manager.query(` 
     SELECT 
     e.id_list,q.id_que, CONCAT_WS('. ',ROW_NUMBER() OVER ( ORDER BY e.id_list ) ,q.name_que) questions
          FROM mchs.s_events_order v
          LEFT JOIN mchs.s_events_order_que e ON e.id_event_order=v.id_event_order
          LEFT JOIN s_question q ON q.id_que=e.id_que
          WHERE v.id_event_order=${id_event_order}   AND v.active=1  AND e.active=1 AND q.org=1  AND q.active=1;
         `);

        if (result20.length > 0) {
            result20
        }
        console.log("result20:  " + result20);
        //Перечень обособленных подразделений  
        //(его обособленного подразделения) и непосредственных объектов мониторинга, адрес места нахождения)
        const result_obj = await AppDataSource.manager.query(` 
     SELECT  GROUP_CONCAT(obj SEPARATOR '.   ') obj_obj from
     (SELECT CONCAT_WS(": ",so.name_obj , GROUP_CONCAT( CONCAT_WS("   ",o.addr_exect,o.name) SEPARATOR '; ')) obj 
     FROM mchs.s_events_order_obj o
     LEFT JOIN mchs.s_subj_obj so ON so.id_obj=o.id_obj
     LEFT JOIN mchs.s_events_order e ON e.id_event_order=o.id_event_order
     LEFT JOIN mchs.s_subj s ON  e.id_subj=s.id_subj
     WHERE e.id_event_order=${id_event_order} AND o.active=1 AND so.active=1 AND so.org=1 GROUP BY o.id_obj,s.id_subj)dd;
         `);
        if (result_obj.length > 0) {
            obj_obj = result_obj[0].obj_obj
        }

        //Руководитель user_1 
        const result3 = await AppDataSource.manager.query(` 
     
         SELECT  uu .fio user_1
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    #LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                 WHERE   uu.active=1 AND uu.org=1 AND g.active=1 AND g.org=1  
                    AND ug.active=1 AND ug.org=1 #j.active=1 and 
                    AND ug.type_user in(1) AND e.active=1 AND e.org=1 AND e.id_event=${id_event}   ;`);
        if (result3.length > 0) {
            user_1 = result3[0].user_1

        }
        //СОПИБ 
        const result_sopb = await AppDataSource.manager.query(` 
     
     SELECT GROUP_CONCAT(sopb_subj SEPARATOR '; ') sopb_subj FROM (
        SELECT  CONCAT_WS("  " ,
             ROW_NUMBER() OVER ( ORDER BY s.id_data ),c.name,c.num_doc,c.date_doc )sopb_subj
             FROM s_sopb_card_subj s
             LEFT join s_sopb_card c ON c.id_card=s.id_card
             WHERE s.id_subj=${id_subj} AND s.active=1 AND c.active=1 AND s.fl_mnf_exp=1)dd; ;`);
        if (result_sopb.length > 0) {
            sopb_subj = result_sopb[0].sopb_subj

        }
        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
     SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
         SELECT 
                    j.job j,uu .fio f,
                    CASE ug.type_user
                    WHEN 1 THEN "руководитель"
                    WHEN 2 THEN "исполнитель"
                    ELSE "" 
                    END t
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE  j.active=1   AND j.org=1 and  uu.active=1   AND uu.org=1 
                    AND g.active=1   AND g.org=1 AND  g.org=1 AND ug.active=1  AND  ug.org=1
                    AND ug.type_user not in(0,3) AND  e.org=1 AND e.active=1 AND e.id_event=${id_event} LIMIT 2)dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }

        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT  uu .fio boss,LOWER(d.depart_rod) region1 ,
        CASE ug.type_user
         WHEN 0 THEN "Должн.лицо, направившее чек-лист"
           WHEN  1 THEN "руководитель группы"
           WHEN 2 THEN "инспектор"
           WHEN 3 THEN "Главный государcтвенный инспектор"
           WHEN 4 THEN "Государcтвенный инспектор "
           ELSE "" 
           END dolj,
        
           @dpt:=e.id_dept_iss ,@dpt_:=e.id_dept,@dpt_p:=d.id_parent,
           IF(@dpt_p IS  NOT NULL,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt_p AND d.active=1  LIMIT 1),d.departament)departament,
           IF(@dpt IS NOT NULL,di.departament,"") departament_boss,

           IFNULL(d.tel_dover,"")tel_dover,
           IFNULL(d.tel_reception,"")tel_reception,



           CASE d.id_obl
           WHEN 1 THEN "брестской обл."
           WHEN  2 THEN "витебской обл."
           WHEN 3 THEN "гомельской обл."
           WHEN 4 THEN "гродненской обл."
           WHEN 5 THEN "г.Минска"
           WHEN 6 THEN "минской обл."
           WHEN 7 THEN "могилеской обл."
           ELSE "" 
           END region
       
           FROM 
           mchs.s_events_order e 
           LEFT JOIN mchs.group g ON g.id_group=e.id_group
           LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
           LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
           LEFT JOIN mchs.s_dept d ON e.id_dept=d.id_dept
           LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
           WHERE uu.active=1 AND uu.org=1 AND d.active=1 AND d.org=1   AND g.active=1 AND g.org=1   AND ug.active=1  
           AND ug.type_user IN (3,4) 
           AND ug.org=1
           and  e.id_event_order=${id_event_order}  ;`);
        if (result5.length > 0) {
            boss = result5[0].boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                departament = result5[0].departament,
                tel_dover = result5[0].tel_dover,
                tel_reception = result5[0].tel_reception,
                dolj = result5[0].dolj

        }
        const data = {
            result: result,
            //result2: result2,
            result20: result20,
            month_begin, year_plan,
            id_subj, subj, tel_dover, tel_reception, departament, reason_order,
            rec_mail, rec_data, rec, sopb_subj, obj_obj, id_event_order,
            num, num_doc, dept_iss, date_doc, addr_record, dept, sphera, reason, builds, curdate, agent, name_agent, perio, perio_stop,
            technical, date_begin, date_end, other_info, tnpa, questions, users, user_1, region, region1, ss, boss, dolj


        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }



    }
    //18 - Рекомендации по устранению выявленных нарушений
    generate18 = async (dto: genDocDTO3) => {
        console.log("generate18!!!!!!!!!!!!!");
        let id_subj = 0, id_event = 0, id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = "_____________________", rec_mail = addr_record, rec_data = date_doc, rec = dept_iss, sopb_subj = departament,
            obj_obj = departament, month_begin = num_doc, date_reg_unp = date_doc, vedomstvo = addr_record,
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc, reason_order = dept_iss,
            perio = reason, perio_stop = reason, technical = departament, date_end = date_doc, date_begin = date_doc, other_info = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament, users = departament, user_1 = departament,
            region = num_doc, dolj = num_doc, boss = num_doc, region1 = num_doc, num = num_doc,
            tel_dover = dept_iss, tel_reception = dept_iss,
            num_def = num_doc, recomend = num_doc, date_fix = num_doc, date_inform = num_doc, transfer_data = num_doc,
            ss = '(указываются место и время совершения (обнаружения) нарушений, существо нарушений с указанием нормативного правового акта,требования которого нарушены)';
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/18 - Рекомендации по устранению выявленных нарушений.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }

        const result = await AppDataSource.manager.query(`
        SELECT @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        s.addr_record ,s.num_doc,sv.name vedomstvo,
        IFNULL(DATE_FORMAT(DATE(ss.date_reg_unp), "%d.%m.%Y"),"_____  ________  20__г." ) date_reg_unp,
        
        @fl_rec:=s.fl_rec,
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(s.receiver,"____________________" ) 
        ELSE "______________________"
        END         rec,
        
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ) 
        ELSE "_____  ________  20__г."
        END         rec_data,
        
        CASE 
        WHEN @fl_rec=1 THEN  CONCAT_WS(' ',
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ), " почтой")
        ELSE ""
        END rec_mail ,
        IFNULL(e.reason_order,"") reason_order,
        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")date_doc,
        CONCAT_WS(' ',IFNULL(ss.unp,""),IFNULL(ss.subj,""), IFNULL(ss.addr_yur,ss.addr_fact),IFNULL(sv.name,""))subj,
        ss.date_reg_unp,
        @perio:= CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.period_check_from), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.period_check_to), "%d.%m.%Y")
            ),
        @perio_stop:=CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.date_stop), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.date_continue), "%d.%m.%Y")),
        CONCAT_WS(' ',(CASE 
        WHEN @perio IS NOT NULL   THEN  @perio
        ELSE "c _______________ по _______________"
        END) ,
        
        (CASE 
        WHEN @perio_stop IS NOT NULL   THEN ( CONCAT("(",@perio_stop,")") )
        ELSE "" 
        END ))                                                 perio,
        IFNULL(DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y"),"") date_begin,
        @month_begin:=IFNULL(DATE_FORMAT(DATE(e.date_begin), "%m"),"")       ,
        case
            when  @month_begin="01"   then "январь"
            when  @month_begin="02"   then "февраль"
            when  @month_begin="03"   then "март"
            when  @month_begin="04"   then "апрель"
            when  @month_begin="05"   then "май"
            when  @month_begin="06"   then "июнь"
            when  @month_begin="07"   then "июль"
            when  @month_begin="08"   then "август"
            when  @month_begin="09"   then "сентябрь"
            when  @month_begin="10"   then "октябрь"
            when  @month_begin="11"   then "ноябрь"
            when  @month_begin="12"   then "декабрь"

            else ""
        end month_begin,
        IFNULL(DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),"")   date_end,
        IFNULL(CONCAT_WS(' ',e.post_agent,e.name_agent),"")    agent,
        IFNULL(e.name_agent,"")                                name_agent ,
        IFNULL(s.other_info,"")                                other_info
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_vedomstva sv ON sv.id_ved=ss.id_ved
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        WHERE ss.active=1 AND s.active=1 AND e.active=1 AND e.org=1   
        AND  s.id_list=${dto.id_list} #18
        AND e.num_order="${dto.num_order}" `);//'1   /П'   100008077  100297103


        if (result.length > 0) {
            id_event_order = result[0].id_event_order;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;//
            addr_record = result[0].addr_record;
            date_doc = result[0].date_doc;
            date_begin = result[0].date_begin;
            date_end = result[0].date_end;
            subj = result[0].subj,
                perio = result[0].perio,
                curdate = result[0].curdate,
                agent = result[0].agent,
                other_info = result[0].other_info,
                id_event = result[0].id_event,
                reason_order = result[0].reason_order,
                rec = result[0].rec,
                rec_data = result[0].rec_data,
                rec_mail = result[0].rec_mail,
                month_begin = result[0].month_begin,
                vedomstvo = result[0].vedomstvo,
                date_reg_unp = result[0].date_reg_unp;

        }
        ///Перечень мероприятий по устранению нарушениий, подлежащих проверке 
        const result2 = await AppDataSource.manager.query(` 
    SELECT  ROW_NUMBER() OVER ( ORDER BY e.id_list )                num_def, 
           IFNULL(q.name_def,"")                                    name_def,
           IFNULL(q.recomend,"")                                    recomend,
           IFNULL(DATE_FORMAT(DATE(e.date_fix), "%d.%m.%Y"),"")     date_fix,
           IFNULL(DATE_FORMAT(DATE(e.date_inform), "%d.%m.%Y"),"")  date_inform,
           IFNULL( e.transfer_data,"")                              transfer_data
           #,q.id_def
       # CONCAT_WS('. ',ROW_NUMBER() OVER ( ORDER BY e.id_list ) ,q.name_que) questions
            FROM mchs.s_events_order_que_def e 
            LEFT JOIN s_defection  q ON q.id_def=e.id_def
            WHERE e.id_event_order=1  #AND e.active=1 AND q.org=1  AND q.active=1 ;`);
        if (result2.length > 0) {
            num_def = result2[0].num_def,
                recomend = result2[0].recomend
            date_fix = result2[0].num,
                date_inform = result2[0].questions,
                transfer_data = result2[0].transfer_data
            //num_def ,recomend  ,date_fix,date_inform,transfer_data
        }
        //Перечень обособленных подразделений  
        //(его обособленного подразделения) и непосредственных объектов мониторинга, адрес места нахождения)
        const result_obj = await AppDataSource.manager.query(` 
     SELECT  GROUP_CONCAT(obj SEPARATOR '.   ') obj_obj from
     (SELECT CONCAT_WS(": ",so.name_obj , GROUP_CONCAT( CONCAT_WS("   ",o.addr_exect,o.name) SEPARATOR '; ')) obj 
     FROM mchs.s_events_order_obj o
     LEFT JOIN mchs.s_subj_obj so ON so.id_obj=o.id_obj
     LEFT JOIN mchs.s_events_order e ON e.id_event_order=o.id_event_order
     LEFT JOIN mchs.s_subj s ON  e.id_subj=s.id_subj
     WHERE e.id_event_order=${id_event_order} AND o.active=1 AND so.active=1 AND so.org=1 GROUP BY o.id_obj,s.id_subj)dd;
         `);
        if (result_obj.length > 0) {
            obj_obj = result_obj[0].obj_obj
        }

        //Руководитель user_1 
        const result3 = await AppDataSource.manager.query(` 
     
         SELECT  uu .fio user_1
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    #LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                 WHERE   uu.active=1 AND uu.org=1 AND g.active=1 AND g.org=1  
                    AND ug.active=1 AND ug.org=1 #j.active=1 and 
                    AND ug.type_user in(1) AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order}   ;`);
        if (result3.length > 0) {
            user_1 = result3[0].user_1

        }
        //СОПИБ 
        const result_sopb = await AppDataSource.manager.query(` 
     
     SELECT GROUP_CONCAT(sopb_subj SEPARATOR '; ') sopb_subj FROM (
        SELECT  CONCAT_WS("  " ,
             ROW_NUMBER() OVER ( ORDER BY s.id_data ),c.name,c.num_doc,c.date_doc )sopb_subj
             FROM s_sopb_card_subj s
             LEFT join s_sopb_card c ON c.id_card=s.id_card
             WHERE s.id_subj=${id_subj} AND s.active=1 AND c.active=1 AND s.fl_mnf_exp=1)dd; ;`);
        if (result_sopb.length > 0) {
            sopb_subj = result_sopb[0].sopb_subj

        }
        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
     SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
         SELECT 
                    j.job j,uu .fio f,
                    CASE ug.type_user
                    WHEN 1 THEN "руководитель"
                    WHEN 2 THEN "исполнитель"
                    ELSE "" 
                    END t
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE  j.active=1   AND j.org=1 and  uu.active=1   AND uu.org=1 
                    AND g.active=1   AND g.org=1 AND  g.org=1 AND ug.active=1  AND  ug.org=1
                    AND ug.type_user not in(0,3) AND  e.org=1 AND e.active=1 AND e.id_event_order=${id_event_order} LIMIT 2)dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }

        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT  uu .fio boss,LOWER(d.depart_rod) region1 ,
        CASE ug.type_user
         WHEN 0 THEN "Должн.лицо, направившее чек-лист"
           WHEN  1 THEN "руководитель группы"
           WHEN 2 THEN "инспектор"
           WHEN 3 THEN "Главный государcтвенный инспектор"
           WHEN 4 THEN "Государcтвенный инспектор "
           ELSE "" 
           END dolj,
        
           @dpt:=e.id_dept_iss ,@dpt_:=e.id_dept,@dpt_p:=d.id_parent,
           IF(@dpt_p IS  NOT NULL,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt_p AND d.active=1  LIMIT 1),d.departament)departament,
           IF(@dpt IS NOT NULL,di.departament,"") departament_boss,

           IFNULL(d.tel_dover,"")tel_dover,
           IFNULL(d.tel_reception,"")tel_reception,



           CASE d.id_obl
           WHEN 1 THEN "брестской обл."
           WHEN  2 THEN "витебской обл."
           WHEN 3 THEN "гомельской обл."
           WHEN 4 THEN "гродненской обл."
           WHEN 5 THEN "г.Минска"
           WHEN 6 THEN "минской обл."
           WHEN 7 THEN "могилеской обл."
           ELSE "" 
           END region
       
           FROM 
           mchs.s_events_order e 
           LEFT JOIN mchs.group g ON g.id_group=e.id_group
           LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
           LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
           LEFT JOIN mchs.s_dept d ON e.id_dept=d.id_dept
           LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
           WHERE uu.active=1 AND uu.org=1 AND d.active=1 AND d.org=1   AND g.active=1 AND g.org=1   AND ug.active=1  
           AND ug.type_user IN (3,4) 
           AND ug.org=1
           and  e.id_event_order=${id_event_order};`);

        if (result5.length > 0) {
            boss = result5[0].boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                departament = result5[0].departament,
                tel_dover = result5[0].tel_dover,
                tel_reception = result5[0].tel_reception,
                dolj = result5[0].dolj

        }
        const data = {
            result: result,
            result2: result2,
            //result20: result20,
            month_begin, date_reg_unp, vedomstvo,
            id_subj, subj, tel_dover, tel_reception, departament, reason_order,
            rec_mail, rec_data, rec, sopb_subj, obj_obj, id_event_order,
            num, num_doc, dept_iss, date_doc, addr_record, dept, sphera, reason, builds, curdate, agent, name_agent, perio, perio_stop,
            technical, date_begin, date_end, other_info, tnpa, questions, users, user_1, region, region1, ss, boss, dolj


        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }



    }
    //20 - Протокол об АП (ПРИНУЖДЕНИЕ)
    generate20 = async (dto: genDocDTO3) => {

        let id_subj = 0, id_event = 0, id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = "_____________________", rec_mail = addr_record, rec_data = date_doc, rec = dept_iss, sopb_subj = departament,
            obj_obj = departament, month_begin = num_doc, date_reg_unp = date_doc, vedomstvo = addr_record, unp = "",
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc, reason_order = dept_iss,
            perio = reason, perio_stop = reason, technical = departament, date_end = date_doc, date_begin = date_doc, other_info = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament, users = departament, user_1 = departament,
            region = num_doc, boss = num_doc, region1 = num_doc, num = num_doc, tel_dover = dept_iss, tel_reception = dept_iss,
            user_staff = departament, defection = num_doc, short_tnpa = num_doc, form = num_doc,
            obst_sposob = departament, date_cath = date_doc, type_case = "",
            ss = '(указываются место и время совершения (обнаружения) нарушений, существо нарушений с указанием нормативного правового акта,требования которого нарушены)';
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/20 - Протокол об АП.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }
        //Внимание!!!! особый. это для протокола(20). для предложения/требования(по приостановлению в 43,44)!!!!!!!!!!!!!!!!!!!
        const result = await AppDataSource.manager.query(`
        
        SELECT 
        @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        s.addr_record ,s.num_doc,IFNULL(sv.name,"") vedomstvo,
        IFNULL(DATE_FORMAT(DATE(ss.date_reg_unp), "%d.%m.%Y"),"_____  ________  20__г." ) date_reg_unp,
        ss.unp,
        @fe:=CASE
        WHEN a.id_force=0 THEN "административная ответственность"
        WHEN a.id_force=1 THEN "уголовная ответственность"
        WHEN a.id_force=2 THEN "предупреждение"
        else ""
        END forcee,
        DATE_FORMAT(DATE(a.date_cath), "%d.%m.%Y") date_cath,
        IFNULL(a.obst_sposob,"") obst_sposob,
        CONCAT_WS(": ",IFNULL(@fe,""),IFNULL(af.name_im,"")) type_case,
        
        @fl_rec:=s.fl_rec,
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(s.receiver,"____________________" ) 
        ELSE "______________________"
        END         rec,
        
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ) 
        ELSE "_____  ________  20__г."
        END         rec_data,
        
        CASE 
        WHEN @fl_rec=1 THEN  CONCAT_WS(' ',
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ), " почтой")
        ELSE ""
        END rec_mail ,
        IFNULL(e.reason_order,"") reason_order,
        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")date_doc,
        CONCAT_WS(' ',IFNULL(ss.unp,""),IFNULL(ss.subj,""), IFNULL(ss.addr_yur,ss.addr_fact),IFNULL(sv.name,""))subj,
        @perio:= CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.period_check_from), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.period_check_to), "%d.%m.%Y")
            ),
        @perio_stop:=CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.date_stop), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.date_continue), "%d.%m.%Y")),
        CONCAT_WS(' ',(CASE 
        WHEN @perio IS NOT NULL   THEN  @perio
        ELSE "c _______________ по _______________"
        END) ,
        
        (CASE 
        WHEN @perio_stop IS NOT NULL  THEN ( CONCAT("(",@perio_stop,")") )
        ELSE "" 
        END ))                                                 perio,
        IFNULL(DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y"),"") date_begin,
        @month_begin:=IFNULL(DATE_FORMAT(DATE(e.date_begin), "%m"),"")       ,
        case
            when  @month_begin="01"   then "январь"
            when  @month_begin="02"   then "февраль"
            when  @month_begin="03"   then "март"
            when  @month_begin="04"   then "апрель"
            when  @month_begin="05"   then "май"
            when  @month_begin="06"   then "июнь"
            when  @month_begin="07"   then "июль"
            when  @month_begin="08"   then "август"
            when  @month_begin="09"   then "сентябрь"
            when  @month_begin="10"   then "октябрь"
            when  @month_begin="11"   then "ноябрь"
            when  @month_begin="12"   then "декабрь"

            else ""
        end month_begin,
        IFNULL(DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),"")    date_end,
        IFNULL(CONCAT_WS(' ',a.staff,a.fio),"")                 agent,
        IFNULL(a.fio,"")                                        name_agent ,
        IFNULL(e.technical,"")                                  technical ,
        IFNULL(s.other_info,"")                                 other_info
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_vedomstva sv ON sv.id_ved=ss.id_ved
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        LEFT JOIN mchs.s_events_order_adm_force a ON s.id_list=a.id_report AND a.id_event_order=e.id_event_order
        LEFT JOIN s_adm_force af ON a.id_force=af.id_force 
        #LEFT JOIN mchs.s_events_order_adm_ban ab ON s.id_list=ab.id_report AND ab.id_event_order=e.id_event_order
        WHERE ss.active=1 AND s.active=1 AND e.active=1 AND e.org=1   
        AND  s.id_list=${dto.id_list} #20
        AND e.num_order="${dto.num_order}" `);//'1   /П'   100008077  100297103


        if (result.length > 0) {
            id_event_order = result[0].id_event_order;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;//
            addr_record = result[0].addr_record;
            date_doc = result[0].date_doc;
            date_begin = result[0].date_begin;
            date_end = result[0].date_end;
            subj = result[0].subj,
                perio = result[0].perio,
                curdate = result[0].curdate,
                agent = result[0].agent,
                name_agent = result[0].name_agent,
                technical = result[0].technical,
                other_info = result[0].other_info,
                id_event = result[0].id_event,
                reason_order = result[0].reason_order,
                rec = result[0].rec,
                rec_data = result[0].rec_data,
                rec_mail = result[0].rec_mail,
                month_begin = result[0].month_begin,
                vedomstvo = result[0].vedomstvo,
                date_reg_unp = result[0].date_reg_unp,
                unp = result[0].unp,
                date_cath = result[0].date_cath,
                obst_sposob = result[0].obst_sposob,
                type_case = result[0].type_case
                ;

        }
        //Перечень вопросов, подлежащих проверке 
        /*const result2 = await AppDataSource.manager.query(` 
        SELECT GROUP_CONCAT(sq.name_que  SEPARATOR ";  ")questions 
        FROM mchs.s_events_order_que e
        LEFT JOIN mchs.s_events_que q ON q.id_list=e.id_que
        LEFT JOIN s_question sq ON sq.id_que=q.id_que
        WHERE e.id_event_order=${id_event_order} AND  e.active=1  AND sq.active=1 AND q.active=1;
         `);
        if (result2.length > 0) {
            questions = result2[0].questions,
            num = result2[0].num
   
        }
        */
        //Перечень нарушений в табличном виде 

        /* SELECT 
             ROW_NUMBER() OVER ( ORDER BY e.id_def ) num ,q.name_def     defection, 
                                                            q.short_tnpa short_tnpa
             
             FROM mchs.s_events_order v
             LEFT JOIN mchs.s_events_order_que_def e ON e.id_event_order=v.id_event_order
             
             LEFT JOIN s_defection q ON q.id_def=e.id_def
             WHERE v.id_event_order=${id_event_order}  AND v.active=1  AND e.active=1 AND q.org= 1 AND v.org= 1 AND q.active=1 ;
             */
        //Перечень нарушений в табличном виде с группировкой по видам нарушений и с названиями видов
        const result20 = await AppDataSource.manager.query(` 
         SELECT @rn:=num,num,dd.defection,id_form,short_tnpa,id_list,@rn,IF(@rn=1, dd.name_doc,"")form FROM(
            SELECT 
            ROW_NUMBER() OVER ( PARTITION BY q.id_form ORDER BY e.id_list ) num,q.name_def , f.name_doc,   
            #PARTITION BY productLine  ORDER BY quantityInStock DESC
            q.name_def defection, q.id_form,e.id_list,q.short_tnpa short_tnpa
            FROM mchs.s_events_order v
            LEFT JOIN mchs.s_events_order_que_def e ON e.id_event_order=v.id_event_order
            LEFT JOIN s_defection q ON q.id_def=e.id_def
            LEFT JOIN s_form f ON f.id_form=q.id_form
            WHERE v.id_event_order=${id_event_order} AND v.active=1  AND e.active=1 AND q.org= 1 AND v.org= 1 AND q.active=1)dd 
            `);

        if (result20.length > 0) {
            defection = result20[0].defection,
                num = result20[0].num,
                short_tnpa = result20[0].short_tnpa,
                form = result20[0].form
        }
        //Перечень обособленных подразделений  
        //(его обособленного подразделения) и непосредственных объектов мониторинга, адрес места нахождения)
        const result_obj = await AppDataSource.manager.query(` 
     SELECT  GROUP_CONCAT(obj SEPARATOR '.   ') obj_obj from
     (SELECT CONCAT_WS(": ",so.name_obj , GROUP_CONCAT( CONCAT_WS("   ",o.addr_exect,o.name) SEPARATOR '; ')) obj 
     FROM mchs.s_events_order_obj o
     LEFT JOIN mchs.s_subj_obj so ON so.id_obj=o.id_obj
     LEFT JOIN mchs.s_events_order e ON e.id_event_order=o.id_event_order
     LEFT JOIN mchs.s_subj s ON  e.id_subj=s.id_subj
     WHERE e.id_event_order=${id_event_order} AND o.active=1 AND so.active=1 AND so.org=1 GROUP BY o.id_obj,s.id_subj)dd;
         `);
        if (result_obj.length > 0) {
            obj_obj = result_obj[0].obj_obj
        }

        //Руководитель user_1 
        const result3 = await AppDataSource.manager.query(` 
     
     SELECT CONCAT_WS(" ",j.job,"(",d.departament,")",uu.l_name,uu.f_name,uu.s_name) user_staff, uu .fio user_1
     FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
        LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
        LEFT JOIN mchs.s_dept d ON d.id_dept=uu.id_dept
     WHERE   uu.active=1 AND uu.org=1 AND g.active=1 AND g.org=1  
        AND ug.active=1 AND ug.org=1 #j.active=1 and 
        AND ug.type_user in(1) AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order}   ;`);
        if (result3.length > 0) {
            user_1 = result3[0].user_1,
                user_staff = result3[0].user_staff

        }
        //СОПИБ 
        const result_sopb = await AppDataSource.manager.query(` 
     
     SELECT GROUP_CONCAT(sopb_subj SEPARATOR '; ') sopb_subj FROM (
        SELECT  CONCAT_WS("  " ,
             ROW_NUMBER() OVER ( ORDER BY s.id_data ),c.name,c.num_doc,c.date_doc )sopb_subj
             FROM s_sopb_card_subj s
             LEFT join s_sopb_card c ON c.id_card=s.id_card
             WHERE s.id_subj=${id_subj} AND s.active=1 AND c.active=1 AND s.fl_mnf_exp=1)dd; ;`);
        if (result_sopb.length > 0) {
            sopb_subj = result_sopb[0].sopb_subj

        }
        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
     SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
         SELECT 
                    j.job j,uu .fio f,
                    CASE ug.type_user
                    WHEN 1 THEN "руководитель"
                    WHEN 2 THEN "исполнитель"
                    ELSE "" 
                    END t
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE  j.active=1   AND j.org=1 and  uu.active=1   AND uu.org=1 
                    AND g.active=1   AND g.org=1 AND  g.org=1 AND ug.active=1  AND  ug.org=1
                    AND ug.type_user not in(0,3) AND  e.org=1 AND e.active=1 AND e.id_event=${id_event} LIMIT 2)dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }

        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT uu .fio boss,LOWER(d.depart_rod) region1 ,
        @dpt:=d.id_parent ,d.departament,IFNULL(d.tel_dover,"")tel_dover,
        #IF(@dpt IS  NULL,d.departament,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt LIMIT 1))departament,
        IFNULL(IF(@dpt IS  NULL,d.tel_reception,(SELECT d.tel_reception FROM mchs.s_dept d WHERE d.id_dept=@dpt LIMIT 1))
        ,"")tel_reception,
        #(SELECT departament,tel_reception FROM mchs.s_dept d WHERE d.id_dept=@dpt LIMIT 1)departament,
        CASE d.id_obl
        WHEN 1 THEN "брестской обл."
        WHEN  2 THEN "витебской обл."
        WHEN 3 THEN "гомельской обл."
        WHEN 4 THEN "гродненской обл."
        WHEN 5 THEN "г.Минска"
        WHEN 6 THEN "минской обл."
        WHEN 7 THEN "могилеской обл."
        ELSE "" 
        END region
    
        FROM 
        mchs.s_events_order e 
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
        LEFT JOIN mchs.s_dept d ON uu.id_dept=d.id_dept
        WHERE uu.active=1 AND uu.org=1 AND d.active=1 AND d.org=1   AND g.active=1 AND g.org=1   AND ug.active=1  
        AND ug.type_user =3 AND ug.org=1
        and  e.id_event=${id_event}  ;`);
        if (result5.length > 0) {
            boss = result5[0].boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                departament = result5[0].departament,
                tel_dover = result5[0].tel_dover,
                tel_reception = result5[0].tel_reception
        }
        const data = {
            result: result,
            result20: result20,
            month_begin, date_reg_unp, vedomstvo, unp,
            id_subj, subj, tel_dover, tel_reception, departament, reason_order,
            rec_mail, rec_data, rec, sopb_subj, obj_obj, id_event_order,
            num_doc, dept_iss, date_doc, addr_record, dept, sphera, reason, builds, curdate,
            agent, name_agent, perio, perio_stop, form,
            technical, date_begin, date_end, other_info, tnpa, questions, users, user_1, user_staff,
            region, region1, ss, boss, obst_sposob, date_cath, type_case//num,,defection, short_tnpa


        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }



    }
    //31 - Постановление о наложении АВ
    generate31 = async (dto: genDocDTO3) => {

        let id_subj = 0, id_event = 0, id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = "_____________________", rec_mail = addr_record, rec_data = date_doc, rec = dept_iss, sopb_subj = departament,
            obj_obj = departament, month_begin = num_doc, date_reg_unp = date_doc, vedomstvo = addr_record, unp = "",
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc, reason_order = dept_iss,
            perio = reason, perio_stop = reason, technical = departament, date_end = date_doc, date_begin = date_doc, other_info = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament,
            users = departament, user_1 = departament, user_staff_doc = departament, user_doc = departament,
            region = num_doc, boss = num_doc, region1 = num_doc, num = num_doc, tel_dover = dept_iss, tel_reception = dept_iss,
            user_staff = "", acts_data = addr_record,
            ss = '(указываются место и время совершения (обнаружения) нарушений, существо нарушений с указанием нормативного правового акта,требования которого нарушены)';
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/31 - Постановление о наложении АВ.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }

        const result = await AppDataSource.manager.query(`
        SELECT @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        s.addr_record ,s.num_doc,IFNULL(sv.name,"") vedomstvo,
        IFNULL(DATE_FORMAT(DATE(ss.date_reg_unp), "%d.%m.%Y"),"_____  ________  20__г." ) date_reg_unp,
        ss.unp,
        @fl_rec:=s.fl_rec,
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(s.receiver,"____________________" ) 
        ELSE "______________________"
        END         rec,
        
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ) 
        ELSE "_____  ________  20__г."
        END         rec_data,
        
        CASE 
        WHEN @fl_rec=1 THEN  CONCAT_WS(' ',
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ), " почтой")
        ELSE ""
        END rec_mail ,
        IFNULL(e.reason_order,"") reason_order,
        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")date_doc,
        CONCAT_WS(' ',IFNULL(ss.unp,""),IFNULL(ss.subj,""), IFNULL(ss.addr_yur,ss.addr_fact))subj,
        @perio:= CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.period_check_from), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.period_check_to), "%d.%m.%Y")
            ),
        @perio_stop:=CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.date_stop), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.date_continue), "%d.%m.%Y")),
        CONCAT_WS(' ',(CASE 
        WHEN @perio IS NOT NULL   THEN  @perio
        ELSE "c _______________ по _______________"
        END) ,
        
        (CASE 
        WHEN @perio_stop IS NOT NULL  THEN ( CONCAT("(",@perio_stop,")") )
        ELSE "" 
        END ))                                                 perio,
        IFNULL(DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y"),"") date_begin,
        @month_begin:=IFNULL(DATE_FORMAT(DATE(e.date_begin), "%m"),"")       ,
        case
            when  @month_begin="01"   then "январь"
            when  @month_begin="02"   then "февраль"
            when  @month_begin="03"   then "март"
            when  @month_begin="04"   then "апрель"
            when  @month_begin="05"   then "май"
            when  @month_begin="06"   then "июнь"
            when  @month_begin="07"   then "июль"
            when  @month_begin="08"   then "август"
            when  @month_begin="09"   then "сентябрь"
            when  @month_begin="10"   then "октябрь"
            when  @month_begin="11"   then "ноябрь"
            when  @month_begin="12"   then "декабрь"

            else ""
        end month_begin,
        IFNULL(DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),"")   date_end,
        IFNULL(CONCAT_WS(' ',e.post_agent,e.name_agent),"")    agent,
        IFNULL(e.name_agent,"")                                name_agent ,
        IFNULL(s.other_info,"")                                other_info
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_vedomstva sv ON sv.id_ved=ss.id_ved
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        WHERE ss.active=1 AND s.active=1 AND e.active=1 AND e.org=1   
        AND  s.id_list=${dto.id_list} #4
        AND e.num_order="${dto.num_order}" `);//'1   /П'   100008077  100297103


        if (result.length > 0) {
            id_event_order = result[0].id_event_order;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;//
            addr_record = result[0].addr_record;
            date_doc = result[0].date_doc;
            date_begin = result[0].date_begin;
            date_end = result[0].date_end;
            subj = result[0].subj,
                perio = result[0].perio,
                curdate = result[0].curdate,
                agent = result[0].agent,
                name_agent = result[0].name_agent,
                other_info = result[0].other_info,
                id_event = result[0].id_event,
                reason_order = result[0].reason_order,
                rec = result[0].rec,
                rec_data = result[0].rec_data,
                rec_mail = result[0].rec_mail,
                month_begin = result[0].month_begin,
                vedomstvo = result[0].vedomstvo,
                date_reg_unp = result[0].date_reg_unp,
                unp = result[0].unp;

        }
        //Протокол id_form= 1011
        const result2 = await AppDataSource.manager.query(` 
        SELECT GROUP_CONCAT(CONCAT_WS( " ",          
        IFNULL(CONCAT("№ ",r.num_doc), ""),# num_act,
        IFNULL(CONCAT(" от ",DATE_FORMAT(DATE(r.date_doc), "%d.%m.%Y")),"") #date_act 
        ))acts_data
        FROM s_form_report r 
        LEFT JOIN mchs.s_events_order e ON e.id_event_order=r.id_event_order
        WHERE r.id_form=1011 AND r.org=1 AND r.active=1 AND e.org=1 AND e.active=1 
        AND r.id_event_order=${id_event_order}  
        `);

        if (result2.length > 0) {
            acts_data = result2[0].acts_data
        }
        //Перечень нарушений в табличном виде с группировкой по видам нарушений и с названиями видов
        const result20 = await AppDataSource.manager.query(` 
     SELECT @rn:=num,num,dd.defection,id_form,short_tnpa,id_list,@rn,IF(@rn=1, dd.name_doc,"")form FROM(
        SELECT 
        ROW_NUMBER() OVER ( PARTITION BY q.id_form ORDER BY e.id_list ) num,q.name_def , f.name_doc,   
        #PARTITION BY productLine  ORDER BY quantityInStock DESC
        q.name_def defection, q.id_form,e.id_list,q.short_tnpa short_tnpa
        FROM mchs.s_events_order v
        LEFT JOIN mchs.s_events_order_que_def e ON e.id_event_order=v.id_event_order
        LEFT JOIN s_defection q ON q.id_def=e.id_def
        LEFT JOIN s_form f ON f.id_form=q.id_form
        WHERE v.id_event_order=${id_event_order} AND v.active=1  AND e.active=1 AND q.org= 1 AND v.org= 1 AND q.active=1)dd 
        `);

        if (result20.length > 0) {
            result20
        }


        //Руководитель user_1 
        const result3 = await AppDataSource.manager.query(` 
     
     SELECT CONCAT_WS(" ",j.job,"(",d.departament,")",uu.l_name,uu.f_name,uu.s_name) user_staff, uu .fio user_1
     FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
        LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
        LEFT JOIN mchs.s_dept d ON d.id_dept=uu.id_dept
     WHERE   uu.active=1 AND uu.org=1 AND g.active=1 AND g.org=1  
        AND ug.active=1 AND ug.org=1 #j.active=1 and 
        AND ug.type_user in(1) AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order}   ;`);
        if (result3.length > 0) {
            user_1 = result3[0].user_1,
                user_staff = result3[0].user_staff

        }
        //Пользователь, составивший и подписавшй документ  
        const result_doc = await AppDataSource.manager.query(` 
     
     SELECT CONCAT_WS(" ",j.job,"(",d.depart_rod,")",uu.l_name,uu.f_name,uu.s_name) user_staff_doc, uu .fio user_doc
     FROM 
     s_form_report f
      LEFT JOIN   mchs.s_events_order e ON f.id_event_order=e.id_event_order
        LEFT JOIN mchs.users uu ON f.uid=uu.uid
        LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
        LEFT JOIN mchs.s_dept d ON d.id_dept=uu.id_dept
        WHERE   uu.active=1 AND uu.org=1# AND g.active=1 AND g.org=1  
        AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order} AND f.id_form=1011 ;`);
        if (result_doc.length > 0) {
            user_doc = result_doc[0].user_doc,
                user_staff_doc = result_doc[0].user_staff_doc
        }

        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
     SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
         SELECT 
                    j.job j,uu .fio f,
                    CASE ug.type_user
                    WHEN 1 THEN "руководитель"
                    WHEN 2 THEN "исполнитель"
                    ELSE "" 
                    END t
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE  j.active=1   AND j.org=1 and  uu.active=1   AND uu.org=1 
                    AND g.active=1   AND g.org=1 AND  g.org=1 AND ug.active=1  AND  ug.org=1
                    AND ug.type_user not in(0,3) AND  e.org=1 AND e.active=1 AND e.id_event=${id_event} LIMIT 2)dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }

        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT uu .fio boss,LOWER(d.depart_rod) region1 ,
        @dpt:=d.id_parent ,d.departament,IFNULL(d.tel_dover,"")tel_dover,
        #IF(@dpt IS  NULL,d.departament,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt LIMIT 1))departament,
        IFNULL(IF(@dpt IS  NULL,d.tel_reception,(SELECT d.tel_reception FROM mchs.s_dept d WHERE d.id_dept=@dpt LIMIT 1))
        ,"")tel_reception,
        #(SELECT departament,tel_reception FROM mchs.s_dept d WHERE d.id_dept=@dpt LIMIT 1)departament,
        CASE d.id_obl
        WHEN 1 THEN "брестской обл."
        WHEN  2 THEN "витебской обл."
        WHEN 3 THEN "гомельской обл."
        WHEN 4 THEN "гродненской обл."
        WHEN 5 THEN "г.Минска"
        WHEN 6 THEN "минской обл."
        WHEN 7 THEN "могилеской обл."
        ELSE "" 
        END region
    
        FROM 
        mchs.s_events_order e 
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid=uu.uid
        LEFT JOIN mchs.s_dept d ON uu.id_dept=d.id_dept
        WHERE uu.active=1 AND uu.org=1 AND d.active=1 AND d.org=1   AND g.active=1 AND g.org=1   AND ug.active=1  
        AND ug.type_user =3 AND ug.org=1
        and  e.id_event=${id_event}  ;`);
        if (result5.length > 0) {
            boss = result5[0].boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                departament = result5[0].departament,
                tel_dover = result5[0].tel_dover,
                tel_reception = result5[0].tel_reception
        }
        const data = {
            result: result,
            result20: result20,
            result_doc: result_doc,
            month_begin, date_reg_unp, vedomstvo, unp,
            id_subj, subj, tel_dover, tel_reception, departament, reason_order,
            rec_mail, rec_data, rec, sopb_subj, obj_obj, id_event_order,
            num, num_doc, date_doc, acts_data, dept_iss, addr_record, dept, sphera, reason, builds, curdate,
            agent, name_agent, perio, perio_stop, user_staff_doc, user_doc,
            technical, date_begin, date_end, other_info, tnpa, questions, users, user_1, user_staff, region, region1, ss, boss


        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }



    }
    //34 - Постановление о наложении АВ по совокупности
    generate34 = async (dto: genDocDTO3) => {

        let id_subj = 0, id_event = 0, id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = "_____________________", rec_mail = addr_record, rec_data = date_doc, rec = dept_iss, sopb_subj = departament,
            obj_obj = departament, month_begin = num_doc, date_reg_unp = date_doc, vedomstvo = addr_record, unp = "",
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc, reason_order = dept_iss,
            perio = reason, perio_stop = reason, technical = departament, date_end = date_doc, date_begin = date_doc, other_info = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament,
            users = departament, user_1 = departament, user_staff_doc = departament, user_doc = departament,
            region = num_doc, boss = num_doc, region1 = num_doc, num = num_doc, tel_dover = dept_iss, tel_reception = dept_iss,
            user_staff = "", acts_data = addr_record,
            ss = '(указываются место и время совершения (обнаружения) нарушений, существо нарушений с указанием нормативного правового акта,требования которого нарушены)';
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/34 - Постановление о наложении АВ по совокупности.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }

        const result = await AppDataSource.manager.query(`
        SELECT @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        s.addr_record ,s.num_doc,IFNULL(sv.name,"") vedomstvo,
        IFNULL(DATE_FORMAT(DATE(ss.date_reg_unp), "%d.%m.%Y"),"_____  ________  20__г." ) date_reg_unp,
        ss.unp,
        @fl_rec:=s.fl_rec,
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(s.receiver,"____________________" ) 
        ELSE "______________________"
        END         rec,
        
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ) 
        ELSE "_____  ________  20__г."
        END         rec_data,
        
        CASE 
        WHEN @fl_rec=1 THEN  CONCAT_WS(' ',
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ), " почтой")
        ELSE ""
        END rec_mail ,
        IFNULL(e.reason_order,"") reason_order,
        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")date_doc,
        CONCAT_WS(' ',IFNULL(ss.unp,""),IFNULL(ss.subj,""), IFNULL(ss.addr_yur,ss.addr_fact))subj,
        @perio:= CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.period_check_from), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.period_check_to), "%d.%m.%Y")
            ),
        @perio_stop:=CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.date_stop), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.date_continue), "%d.%m.%Y")),
        CONCAT_WS(' ',(CASE 
        WHEN @perio IS NOT NULL   THEN  @perio
        ELSE "c _______________ по _______________"
        END) ,
        
        (CASE 
        WHEN @perio_stop IS NOT NULL  THEN ( CONCAT("(",@perio_stop,")") )
        ELSE "" 
        END ))                                                 perio,
        IFNULL(DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y"),"") date_begin,
        @month_begin:=IFNULL(DATE_FORMAT(DATE(e.date_begin), "%m"),"")       ,
        case
            when  @month_begin="01"   then "январь"
            when  @month_begin="02"   then "февраль"
            when  @month_begin="03"   then "март"
            when  @month_begin="04"   then "апрель"
            when  @month_begin="05"   then "май"
            when  @month_begin="06"   then "июнь"
            when  @month_begin="07"   then "июль"
            when  @month_begin="08"   then "август"
            when  @month_begin="09"   then "сентябрь"
            when  @month_begin="10"   then "октябрь"
            when  @month_begin="11"   then "ноябрь"
            when  @month_begin="12"   then "декабрь"

            else ""
        end month_begin,
        IFNULL(DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),"")   date_end,
        IFNULL(CONCAT_WS(' ',e.post_agent,e.name_agent),"")    agent,
        IFNULL(e.name_agent,"")                                name_agent ,
        IFNULL(s.other_info,"")                                other_info
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_vedomstva sv ON sv.id_ved=ss.id_ved
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        WHERE ss.active=1 AND s.active=1 AND e.active=1 AND e.org=1   
        AND  s.id_list=${dto.id_list} #4
        AND e.num_order="${dto.num_order}" `);//'1   /П'   100008077  100297103


        if (result.length > 0) {
            id_event_order = result[0].id_event_order;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;//
            addr_record = result[0].addr_record;
            date_doc = result[0].date_doc;
            date_begin = result[0].date_begin;
            date_end = result[0].date_end;
            subj = result[0].subj,
                perio = result[0].perio,
                curdate = result[0].curdate,
                agent = result[0].agent,
                name_agent = result[0].name_agent,
                other_info = result[0].other_info,
                id_event = result[0].id_event,
                reason_order = result[0].reason_order,
                rec = result[0].rec,
                rec_data = result[0].rec_data,
                rec_mail = result[0].rec_mail,
                month_begin = result[0].month_begin,
                vedomstvo = result[0].vedomstvo,
                date_reg_unp = result[0].date_reg_unp,
                unp = result[0].unp;

        }
        //Протокол id_form= 1011
        const result2 = await AppDataSource.manager.query(` 
        SELECT GROUP_CONCAT(CONCAT_WS( " ",          
        IFNULL(CONCAT("№ ",r.num_doc), ""),# num_act,
        IFNULL(CONCAT(" от ",DATE_FORMAT(DATE(r.date_doc), "%d.%m.%Y")),"") #date_act 
        ))acts_data
        FROM s_form_report r 
        LEFT JOIN mchs.s_events_order e ON e.id_event_order=r.id_event_order
        WHERE r.id_form=1011 AND r.org=1 AND r.active=1 AND e.org=1 AND e.active=1 
        AND r.id_event_order=${id_event_order}  
        `);

        if (result2.length > 0) {
            acts_data = result2[0].acts_data
        }
        //Перечень нарушений в табличном виде с группировкой по видам нарушений и с названиями видов
        const result20 = await AppDataSource.manager.query(` 
     SELECT @rn:=num,num,dd.defection,id_form,short_tnpa,id_list,@rn,IF(@rn=1, dd.name_doc,"")form FROM(
        SELECT 
        ROW_NUMBER() OVER ( PARTITION BY q.id_form ORDER BY e.id_list ) num,q.name_def , f.name_doc,   
        #PARTITION BY productLine  ORDER BY quantityInStock DESC
        q.name_def defection, q.id_form,e.id_list,q.short_tnpa short_tnpa
        FROM mchs.s_events_order v
        LEFT JOIN mchs.s_events_order_que_def e ON e.id_event_order=v.id_event_order
        LEFT JOIN s_defection q ON q.id_def=e.id_def
        LEFT JOIN s_form f ON f.id_form=q.id_form
        WHERE v.id_event_order=${id_event_order} AND v.active=1  AND e.active=1 AND q.org= 1 AND v.org= 1 AND q.active=1)dd 
        `);

        if (result20.length > 0) {
            result20
        }


        //Руководитель user_1 
        const result3 = await AppDataSource.manager.query(` 
     
     SELECT CONCAT_WS(" ",j.job,"(",d.departament,")",uu.l_name,uu.f_name,uu.s_name) user_staff, uu .fio user_1
     FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
        LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
        LEFT JOIN mchs.s_dept d ON d.id_dept=uu.id_dept
     WHERE   uu.active=1 AND uu.org=1 AND g.active=1 AND g.org=1  
        AND ug.active=1 AND ug.org=1 #j.active=1 and 
        AND ug.type_user in(1) AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order}   ;`);
        if (result3.length > 0) {
            user_1 = result3[0].user_1,
                user_staff = result3[0].user_staff

        }
        //Пользователь, составивший и подписавшй документ  
        const result_doc = await AppDataSource.manager.query(` 
     
     SELECT CONCAT_WS(" ",j.job,"(",d.depart_rod,")",uu.l_name,uu.f_name,uu.s_name) 
     user_staff_doc, 
     uu .fio user_doc
     FROM 
     s_form_report f
      LEFT JOIN   mchs.s_events_order e ON f.id_event_order=e.id_event_order
       LEFT JOIN mchs.users uu ON f.uid=uu.uid
        LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
        LEFT JOIN mchs.s_dept d ON d.id_dept=uu.id_dept
     WHERE   uu.active=1 AND uu.org=1# AND g.active=1 AND g.org=1  
        AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order} AND f.id_form=1011 ;`);
        if (result_doc.length > 0) {
            user_doc = result_doc[0].user_doc,
                user_staff_doc = result_doc[0].user_staff_doc

        }

        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
     SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
         SELECT 
                    j.job j,uu .fio f,
                    CASE ug.type_user
                    WHEN 1 THEN "руководитель"
                    WHEN 2 THEN "исполнитель"
                    ELSE "" 
                    END t
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE  j.active=1   AND j.org=1 and  uu.active=1   AND uu.org=1 
                    AND g.active=1   AND g.org=1 AND  g.org=1 AND ug.active=1  AND  ug.org=1
                    AND ug.type_user not in(0,3) AND  e.org=1 AND e.active=1 AND e.id_event=${id_event} LIMIT 2)dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }

        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT uu .fio boss,LOWER(d.depart_rod) region1 ,
        @dpt:=d.id_parent ,d.departament,IFNULL(d.tel_dover,"")tel_dover,
        #IF(@dpt IS  NULL,d.departament,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt LIMIT 1))departament,
        IFNULL(IF(@dpt IS  NULL,d.tel_reception,(SELECT d.tel_reception FROM mchs.s_dept d WHERE d.id_dept=@dpt LIMIT 1))
        ,"")tel_reception,
        #(SELECT departament,tel_reception FROM mchs.s_dept d WHERE d.id_dept=@dpt LIMIT 1)departament,
        CASE d.id_obl
        WHEN 1 THEN "брестской обл."
        WHEN  2 THEN "витебской обл."
        WHEN 3 THEN "гомельской обл."
        WHEN 4 THEN "гродненской обл."
        WHEN 5 THEN "г.Минска"
        WHEN 6 THEN "минской обл."
        WHEN 7 THEN "могилеской обл."
        ELSE "" 
        END region
    
        FROM 
        mchs.s_events_order e 
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid=uu.uid
        LEFT JOIN mchs.s_dept d ON uu.id_dept=d.id_dept
        WHERE uu.active=1 AND uu.org=1 AND d.active=1 AND d.org=1   AND g.active=1 AND g.org=1   AND ug.active=1  
        AND ug.type_user =3 AND ug.org=1
        and  e.id_event=${id_event}  ;`);
        if (result5.length > 0) {
            boss = result5[0].boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                departament = result5[0].departament,
                tel_dover = result5[0].tel_dover,
                tel_reception = result5[0].tel_reception
        }
        const data = {
            result: result,
            result20: result20,
            result_doc: result_doc,
            month_begin, date_reg_unp, vedomstvo, unp,
            id_subj, subj, tel_dover, tel_reception, departament, reason_order,
            rec_mail, rec_data, rec, sopb_subj, obj_obj, id_event_order,
            num, num_doc, date_doc, acts_data, dept_iss, addr_record, dept, sphera, reason, builds, curdate,
            agent, name_agent, perio, perio_stop, user_staff_doc, user_doc,
            technical, date_begin, date_end, other_info, tnpa, questions, users, user_1, user_staff, region, region1, ss, boss


        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }



    }
    //43 - Предложение по приостановлению
    generate43 = async (dto: genDocDTO3) => {

        let id_subj = 0, id_event = 0, id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = "_____________________", rec_mail = addr_record, rec_data = date_doc, rec = dept_iss, sopb_subj = departament,
            obj_obj = departament, month_begin = num_doc, date_reg_unp = date_doc, vedomstvo = addr_record, unp = "",
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc, reason_order = dept_iss,
            perio = reason, perio_stop = reason, technical = departament, date_end = date_doc, date_begin = date_doc, other_info = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament,
            users = departament, user_1 = departament, user_staff = departament, user_staff_doc = "", user_doc = "",
            region = num_doc, dolj = num_doc, boss = num_doc, region1 = num_doc,
            num = num_doc, tel_dover = dept_iss, tel_reception = dept_iss,
            defection = num_doc, short_tnpa = num_doc, form = num_doc, checkk = dept_iss,
            obst_sposob = departament, date_cath = date_doc, type_case = "",
            ss = '(указываются место и время совершения (обнаружения) нарушений, существо нарушений с указанием нормативного правового акта,требования которого нарушены)';
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/43 - Предложение по приостановлению.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }
        //Внимание!!!! особый. это НЕ !!!для протокола(20)принужд. а для предложения/требования(по приостановлению в 43,44)пресеч!!!!!!!!!!!!!!!!!!!
        const result = await AppDataSource.manager.query(`
        
        SELECT 
        @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        s.addr_record ,s.num_doc,IFNULL(sv.name,"") vedomstvo,
        IFNULL(DATE_FORMAT(DATE(ss.date_reg_unp), "%d.%m.%Y"),"_____  ________  20__г." ) date_reg_unp,
        ss.unp,
        CASE e.id_unit_4
         WHEN 91 THEN (CASE e.id_unit_3 WHEN 80 THEN " в ходе проверки " WHEN 81 THEN " выборочной проверки " WHEN 82 THEN " внеплановой проверки " ELSE "" END)
         WHEN 92 THEN " мониторинга "
         WHEN 93 THEN " обследования "
         WHEN 94 THEN " МТХ "
        
        ELSE ""
        END   checkk,
        @fe:=CASE
        WHEN a.id_force=0 THEN "административная ответственность"
        WHEN a.id_force=1 THEN "уголовная ответственность"
        WHEN a.id_force=2 THEN "предупреждение"
        else ""
        END forcee,
        IFNULL(DATE_FORMAT(DATE(a.date_cath), "%d.%m.%Y") ,"")date_cath,
        IFNULL(a.obst_sposob,"") obst_sposob,
        CONCAT_WS(": ",IFNULL(@fe,""),IFNULL(af.name_im,"")) type_case,
        
        @fl_rec:=s.fl_rec,
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(s.receiver,"____________________" ) 
        ELSE "______________________"
        END         rec,
        
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ) 
        ELSE "_____  ________  20__г."
        END         rec_data,
        
        CASE 
        WHEN @fl_rec=1 THEN  CONCAT_WS(' ',
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ), " почтой")
        ELSE ""
        END rec_mail ,
        IFNULL(e.reason_order,"") reason_order,
        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")date_doc,
        CONCAT_WS(' ',IFNULL(ss.unp,""),IFNULL(ss.subj,""), IFNULL(ss.addr_yur,ss.addr_fact),IFNULL(sv.name,""))subj,
        @perio:= CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.period_check_from), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.period_check_to), "%d.%m.%Y")
            ),
        @perio_stop:=CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.date_stop), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.date_continue), "%d.%m.%Y")),
        CONCAT_WS(' ',(CASE 
        WHEN @perio IS NOT NULL   THEN  @perio
        ELSE "c _______________ по _______________"
        END) ,
        
        (CASE 
        WHEN @perio_stop IS NOT NULL  THEN ( CONCAT("(",@perio_stop,")") )
        ELSE "" 
        END ))                                                 perio,
        IFNULL(DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y"),"") date_begin,
        @month_begin:=IFNULL(DATE_FORMAT(DATE(e.date_begin), "%m"),"")       ,
        case
            when  @month_begin="01"   then "январь"
            when  @month_begin="02"   then "февраль"
            when  @month_begin="03"   then "март"
            when  @month_begin="04"   then "апрель"
            when  @month_begin="05"   then "май"
            when  @month_begin="06"   then "июнь"
            when  @month_begin="07"   then "июль"
            when  @month_begin="08"   then "август"
            when  @month_begin="09"   then "сентябрь"
            when  @month_begin="10"   then "октябрь"
            when  @month_begin="11"   then "ноябрь"
            when  @month_begin="12"   then "декабрь"

            else ""
        end month_begin,
        IFNULL(DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),"")    date_end,
        IFNULL(CONCAT_WS(' ',a.staff,a.fio),"")                 agent,
        IFNULL(a.fio,"")                                        name_agent ,
        IFNULL(e.technical,"")                                  technical ,
        IFNULL(s.other_info,"")                                 other_info
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_vedomstva sv ON sv.id_ved=ss.id_ved
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        LEFT JOIN mchs.s_events_order_adm_force a ON s.id_list=a.id_report AND a.id_event_order=e.id_event_order
        LEFT JOIN s_adm_force af ON a.id_force=af.id_force 
        #LEFT JOIN mchs.s_events_order_adm_ban ab ON s.id_list=ab.id_report AND ab.id_event_order=e.id_event_order
        WHERE ss.active=1 AND s.active=1 AND e.active=1 AND e.org=1   
        AND  s.id_list=${dto.id_list} #3
        AND e.num_order="${dto.num_order}" `);//'1   /П'   100008077  100297103


        if (result.length > 0) {
            id_event_order = result[0].id_event_order;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;//
            addr_record = result[0].addr_record;
            date_doc = result[0].date_doc;
            date_begin = result[0].date_begin;
            date_end = result[0].date_end;
            subj = result[0].subj,
                perio = result[0].perio,
                curdate = result[0].curdate,
                agent = result[0].agent,
                name_agent = result[0].name_agent,
                technical = result[0].technical,
                other_info = result[0].other_info,
                id_event = result[0].id_event,
                reason_order = result[0].reason_order,
                rec = result[0].rec,
                rec_data = result[0].rec_data,
                rec_mail = result[0].rec_mail,
                month_begin = result[0].month_begin,
                vedomstvo = result[0].vedomstvo,
                date_reg_unp = result[0].date_reg_unp,
                unp = result[0].unp,
                date_cath = result[0].date_cath,
                obst_sposob = result[0].obst_sposob,
                type_case = result[0].type_case,
                checkk = result[0].checkk
                ;

        }
        //Перечень вопросов, подлежащих проверке 
        /*const result2 = await AppDataSource.manager.query(` 
        SELECT GROUP_CONCAT(sq.name_que  SEPARATOR ";  ")questions 
        FROM mchs.s_events_order_que e
        LEFT JOIN mchs.s_events_que q ON q.id_list=e.id_que
        LEFT JOIN s_question sq ON sq.id_que=q.id_que
        WHERE e.id_event_order=${id_event_order} AND  e.active=1  AND sq.active=1 AND q.active=1;
         `);
        if (result2.length > 0) {
            questions = result2[0].questions,
            num = result2[0].num
   
        }
        */
        //Перечень нарушений в табличном виде 

        /* SELECT 
             ROW_NUMBER() OVER ( ORDER BY e.id_def ) num ,q.name_def     defection, 
                                                            q.short_tnpa short_tnpa
             
             FROM mchs.s_events_order v
             LEFT JOIN mchs.s_events_order_que_def e ON e.id_event_order=v.id_event_order
             
             LEFT JOIN s_defection q ON q.id_def=e.id_def
             WHERE v.id_event_order=${id_event_order}  AND v.active=1  AND e.active=1 AND q.org= 1 AND v.org= 1 AND q.active=1 ;
             */
        //Перечень нарушений в табличном виде с группировкой по видам нарушений и с названиями видов
        const result20 = await AppDataSource.manager.query(` 
         SELECT @rn:=num,num,dd.defection,id_form,short_tnpa,id_list,@rn,IF(@rn=1, dd.name_doc,"")form FROM(
            SELECT 
            ROW_NUMBER() OVER ( PARTITION BY q.id_form ORDER BY e.id_list ) num,q.name_def , f.name_doc,   
            #PARTITION BY productLine  ORDER BY quantityInStock DESC
            q.name_def defection, q.id_form,e.id_list,q.short_tnpa short_tnpa
            FROM mchs.s_events_order v
            LEFT JOIN mchs.s_events_order_que_def e ON e.id_event_order=v.id_event_order
            LEFT JOIN s_defection q ON q.id_def=e.id_def
            LEFT JOIN s_form f ON f.id_form=q.id_form
            WHERE v.id_event_order=${id_event_order} AND v.active=1  AND e.active=1 AND q.org= 1 AND v.org= 1 AND q.active=1)dd 
            `);

        if (result20.length > 0) {
            defection = result20[0].defection,
                num = result20[0].num,
                short_tnpa = result20[0].short_tnpa,
                form = result20[0].form
        }
        //Перечень обособленных подразделений  
        //(его обособленного подразделения) и непосредственных объектов мониторинга, адрес места нахождения)
        const result_obj = await AppDataSource.manager.query(` 
     SELECT  GROUP_CONCAT(obj SEPARATOR ';   ') obj_obj from
     (SELECT CONCAT_WS(": ",so.name_obj , GROUP_CONCAT( CONCAT_WS("   ",o.addr_exect,o.name) SEPARATOR '; ')) obj 
     FROM mchs.s_events_order_obj o
     LEFT JOIN mchs.s_subj_obj so ON so.id_obj=o.id_obj
     LEFT JOIN mchs.s_events_order e ON e.id_event_order=o.id_event_order
     LEFT JOIN mchs.s_subj s ON  e.id_subj=s.id_subj
     WHERE e.id_event_order=${id_event_order} AND o.active=1 AND so.active=1 AND so.org=1 GROUP BY o.id_obj,s.id_subj)dd;
         `);
        if (result_obj.length > 0) {
            obj_obj = result_obj[0].obj_obj
        }

        //Руководитель user_1 
        const result3 = await AppDataSource.manager.query(` 
     
     SELECT CONCAT_WS(" ",j.job,"(",d.departament,")",uu.l_name,uu.f_name,uu.s_name) user_staff, uu .fio user_1
     FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
        LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
        LEFT JOIN mchs.s_dept d ON d.id_dept=uu.id_dept
     WHERE   uu.active=1 AND uu.org=1 AND g.active=1 AND g.org=1  
        AND ug.active=1 AND ug.org=1 #j.active=1 and 
        AND ug.type_user in(1) AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order}   ;`);
        if (result3.length > 0) {
            user_1 = result3[0].user_1,
                user_staff = result3[0].user_staff

        }
        //Пользователь, составивший и подписавшй документ  
        const result_doc = await AppDataSource.manager.query(` 
     
     SELECT CONCAT_WS(" ",j.job,"(",d.depart_rod,")",uu.l_name,uu.f_name,uu.s_name) 
     user_staff_doc, 
     uu .fio user_doc
     FROM 
     s_form_report f
      LEFT JOIN   mchs.s_events_order e ON f.id_event_order=e.id_event_order
       LEFT JOIN mchs.users uu ON f.uid=uu.uid
        LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
        LEFT JOIN mchs.s_dept d ON d.id_dept=uu.id_dept
     WHERE   uu.active=1 AND uu.org=1# AND g.active=1 AND g.org=1  
        AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order} AND f.id_form=1011 ;`);
        if (result_doc.length > 0) {
            user_doc = result_doc[0].user_doc,
                user_staff_doc = result_doc[0].user_staff_doc

        }

        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
     SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
         SELECT 
                    j.job j,uu .fio f,
                    CASE ug.type_user
                    WHEN 1 THEN "руководитель"
                    WHEN 2 THEN "исполнитель"
                    ELSE "" 
                    END t
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE  j.active=1   AND j.org=1 and  uu.active=1   AND uu.org=1 
                    AND g.active=1   AND g.org=1 AND  g.org=1 AND ug.active=1  AND  ug.org=1
                    AND ug.type_user not in(0,3) AND  e.org=1 AND e.active=1 AND e.id_event=${id_event} LIMIT 2)dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }

        //Главный государственный инспектор 
        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT  uu .fio boss,LOWER(d.depart_rod) region1 ,
        CASE ug.type_user
         WHEN 0 THEN "Должн.лицо, направившее чек-лист"
           WHEN  1 THEN "руководитель группы"
           WHEN 2 THEN "инспектор"
           WHEN 3 THEN "Главный государcтвенный инспектор"
           WHEN 4 THEN "Государcтвенный инспектор "
           ELSE "" 
           END dolj,
        
           @dpt:=e.id_dept_iss ,@dpt_:=e.id_dept,@dpt_p:=d.id_parent,
           IF(@dpt_p IS  NOT NULL,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt_p AND d.active=1  LIMIT 1),d.departament)departament,
           IF(@dpt IS NOT NULL,di.departament,"") departament_boss,

           IFNULL(d.tel_dover,"")tel_dover,
           IFNULL(d.tel_reception,"")tel_reception,



           CASE d.id_obl
           WHEN 1 THEN "брестской обл."
           WHEN  2 THEN "витебской обл."
           WHEN 3 THEN "гомельской обл."
           WHEN 4 THEN "гродненской обл."
           WHEN 5 THEN "г.Минска"
           WHEN 6 THEN "минской обл."
           WHEN 7 THEN "могилеской обл."
           ELSE "" 
           END region
       
           FROM 
           mchs.s_events_order e 
           LEFT JOIN mchs.group g ON g.id_group=e.id_group
           LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
           LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
           LEFT JOIN mchs.s_dept d ON e.id_dept=d.id_dept
           LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
           WHERE uu.active=1 AND uu.org=1 AND d.active=1 AND d.org=1   AND g.active=1 AND g.org=1   AND ug.active=1  
           AND ug.type_user IN (3,4) 
           AND ug.org=1
           and  e.id_event_order=${id_event_order}  ;`);
        if (result5.length > 0) {
            boss = result5[0].boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                departament = result5[0].departament,
                tel_dover = result5[0].tel_dover,
                tel_reception = result5[0].tel_reception,
                dolj = result5[0].dolj

        }

        const data = {
            result: result,
            result20: result20,
            month_begin, date_reg_unp, vedomstvo, unp,
            id_subj, subj, tel_dover, tel_reception, departament, reason_order,
            rec_mail, rec_data, rec, sopb_subj, obj_obj, id_event_order,
            num_doc, dept_iss, date_doc, addr_record, dept, sphera, reason, builds, curdate,
            agent, name_agent, perio, perio_stop, form,
            technical, date_begin, date_end, other_info, tnpa, questions,
            users, user_1, user_staff, user_staff_doc, user_doc, checkk,
            region, region1, ss, dolj, boss, obst_sposob, date_cath, type_case//num,,defection, short_tnpa


        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }



    }
    //44 - Требование по приостановлению
    generate44 = async (dto: genDocDTO3) => {

        let id_subj = 0, id_event = 0, id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = "_____________________", rec_mail = addr_record, rec_data = date_doc, rec = dept_iss, sopb_subj = departament,
            obj_obj = departament, month_begin = num_doc, date_reg_unp = date_doc, vedomstvo = addr_record, unp = "",
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc, reason_order = dept_iss,
            perio = reason, perio_stop = reason, technical = departament, date_end = date_doc, date_begin = date_doc, other_info = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament,
            users = departament, user_1 = departament, user_staff = departament, user_staff_doc = "", user_doc = "",
            region = num_doc, dolj = num_doc, boss = num_doc, region1 = num_doc,
            num = num_doc, tel_dover = dept_iss, tel_reception = dept_iss,
            defection = num_doc, short_tnpa = num_doc, form = num_doc, checkk = dept_iss,
            obst_sposob = departament, date_cath = date_doc, type_case = "", date_ban_to = date_doc,
            ss = '(указываются место и время совершения (обнаружения) нарушений, существо нарушений с указанием нормативного правового акта,требования которого нарушены)';
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/44 - Требование по приостановлению.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }
        //Внимание!!!! особый. это НЕ !!!для протокола(20)принужд. а для предложения/требования(по приостановлению в 43,44)пресеч!!!!!!!!!!!!!!!!!!!
        const result = await AppDataSource.manager.query(`
        
        SELECT 
        @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        s.addr_record ,s.num_doc,IFNULL(sv.name,"") vedomstvo,
        IFNULL(DATE_FORMAT(DATE(ss.date_reg_unp), "%d.%m.%Y"),"_____  ________  20__г." ) date_reg_unp,
        ss.unp,
        CASE e.id_unit_4
         WHEN 91 THEN (CASE e.id_unit_3 WHEN 80 THEN " в ходе проверки " WHEN 81 THEN " выборочной проверки " WHEN 82 THEN " внеплановой проверки " ELSE "" END)
         WHEN 92 THEN " мониторинга "
         WHEN 93 THEN " обследования "
         WHEN 94 THEN " МТХ "
        
        ELSE ""
        END   checkk,
        
        
        IFNULL(DATE_FORMAT(DATE(a.date_catch), "%d.%m.%Y") ,"")date_cath,
        IFNULL(a.obst_sposob,"") obst_sposob,
        IFNULL(af.name_im,"") type_case,
        IFNULL(DATE_FORMAT(DATE(a.date_begin), "%d.%m.%Y") ,"") date_ban_to,
        
        @fl_rec:=s.fl_rec,
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(s.receiver,"____________________" ) 
        ELSE "______________________"
        END         rec,
        
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ) 
        ELSE "_____  ________  20__г."
        END         rec_data,
        
        CASE 
        WHEN @fl_rec=1 THEN  CONCAT_WS(' ',
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ), " почтой")
        ELSE ""
        END rec_mail ,
        IFNULL(e.reason_order,"") reason_order,
        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")date_doc,
        CONCAT_WS(' ',IFNULL(ss.unp,""),IFNULL(ss.subj,""), IFNULL(ss.addr_yur,ss.addr_fact),IFNULL(sv.name,""))subj,
        @perio:= CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.period_check_from), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.period_check_to), "%d.%m.%Y")
            ),
        @perio_stop:=CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.date_stop), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.date_continue), "%d.%m.%Y")),
        CONCAT_WS(' ',(CASE 
        WHEN @perio IS NOT NULL   THEN  @perio
        ELSE "c _______________ по _______________"
        END) ,
        
        (CASE 
        WHEN @perio_stop IS NOT NULL  THEN ( CONCAT("(",@perio_stop,")") )
        ELSE "" 
        END ))                                                 perio,
        IFNULL(DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y"),"") date_begin,
        @month_begin:=IFNULL(DATE_FORMAT(DATE(e.date_begin), "%m"),"")       ,
        case
            when  @month_begin="01"   then "январь"
            when  @month_begin="02"   then "февраль"
            when  @month_begin="03"   then "март"
            when  @month_begin="04"   then "апрель"
            when  @month_begin="05"   then "май"
            when  @month_begin="06"   then "июнь"
            when  @month_begin="07"   then "июль"
            when  @month_begin="08"   then "август"
            when  @month_begin="09"   then "сентябрь"
            when  @month_begin="10"   then "октябрь"
            when  @month_begin="11"   then "ноябрь"
            when  @month_begin="12"   then "декабрь"

            else ""
        end month_begin,
        IFNULL(DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),"")    date_end,
        #IFNULL(CONCAT_WS(' ',a.staff,a.fio),"")                 agent,
        #IFNULL(a.fio,"")                                        name_agent ,
        IFNULL(e.technical,"")                                  technical ,
        IFNULL(s.other_info,"")                                 other_info
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_vedomstva sv ON sv.id_ved=ss.id_ved
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        LEFT JOIN mchs.s_events_order_adm_ban a ON s.id_list=a.id_report AND a.id_event_order=e.id_event_order
        LEFT JOIN s_adm_ban af ON a.id_ban=af.id_ban 
        #LEFT JOIN mchs.s_events_order_adm_ban ab ON s.id_list=ab.id_report AND ab.id_event_order=e.id_event_order
        WHERE ss.active=1 AND s.active=1 AND e.active=1 AND e.org=1   
        AND  s.id_list=${dto.id_list} #20
        AND e.num_order="${dto.num_order}" `);//'1   /П'   100008077  100297103


        if (result.length > 0) {
            id_event_order = result[0].id_event_order;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;//
            addr_record = result[0].addr_record;
            date_doc = result[0].date_doc;
            date_begin = result[0].date_begin;
            date_end = result[0].date_end;
            subj = result[0].subj,
                perio = result[0].perio,
                curdate = result[0].curdate,
                agent = result[0].agent,
                name_agent = result[0].name_agent,
                technical = result[0].technical,
                other_info = result[0].other_info,
                id_event = result[0].id_event,
                reason_order = result[0].reason_order,
                rec = result[0].rec,
                rec_data = result[0].rec_data,
                rec_mail = result[0].rec_mail,
                month_begin = result[0].month_begin,
                vedomstvo = result[0].vedomstvo,
                date_reg_unp = result[0].date_reg_unp,
                unp = result[0].unp,
                date_cath = result[0].date_cath,
                obst_sposob = result[0].obst_sposob,
                type_case = result[0].type_case,
                checkk = result[0].checkk,
                date_ban_to = result[0].date_ban_to
                ;

        }
        //Перечень вопросов, подлежащих проверке 
        /*const result2 = await AppDataSource.manager.query(` 
        SELECT GROUP_CONCAT(sq.name_que  SEPARATOR ";  ")questions 
        FROM mchs.s_events_order_que e
        LEFT JOIN mchs.s_events_que q ON q.id_list=e.id_que
        LEFT JOIN s_question sq ON sq.id_que=q.id_que
        WHERE e.id_event_order=${id_event_order} AND  e.active=1  AND sq.active=1 AND q.active=1;
         `);
        if (result2.length > 0) {
            questions = result2[0].questions,
            num = result2[0].num
   
        }
        */
        //Перечень нарушений в табличном виде 

        /* SELECT 
             ROW_NUMBER() OVER ( ORDER BY e.id_def ) num ,q.name_def     defection, 
                                                            q.short_tnpa short_tnpa
             
             FROM mchs.s_events_order v
             LEFT JOIN mchs.s_events_order_que_def e ON e.id_event_order=v.id_event_order
             
             LEFT JOIN s_defection q ON q.id_def=e.id_def
             WHERE v.id_event_order=${id_event_order}  AND v.active=1  AND e.active=1 AND q.org= 1 AND v.org= 1 AND q.active=1 ;
             */
        //Перечень нарушений в табличном виде с группировкой по видам нарушений и с названиями видов
        const result20 = await AppDataSource.manager.query(` 
         SELECT @rn:=num,num,dd.defection,id_form,short_tnpa,id_list,@rn,IF(@rn=1, dd.name_doc,"")form FROM(
            SELECT 
            ROW_NUMBER() OVER ( PARTITION BY q.id_form ORDER BY e.id_list ) num,q.name_def , f.name_doc,   
            #PARTITION BY productLine  ORDER BY quantityInStock DESC
            q.name_def defection, q.id_form,e.id_list,q.short_tnpa short_tnpa
            FROM mchs.s_events_order v
            LEFT JOIN mchs.s_events_order_que_def e ON e.id_event_order=v.id_event_order
            LEFT JOIN s_defection q ON q.id_def=e.id_def
            LEFT JOIN s_form f ON f.id_form=q.id_form
            WHERE v.id_event_order=${id_event_order} AND v.active=1  AND e.active=1 AND q.org= 1 AND v.org= 1 AND q.active=1)dd 
            `);

        if (result20.length > 0) {
            defection = result20[0].defection,
                num = result20[0].num,
                short_tnpa = result20[0].short_tnpa,
                form = result20[0].form
        }
        //Перечень обособленных подразделений  
        //(его обособленного подразделения) и непосредственных объектов мониторинга, адрес места нахождения)
        const result_obj = await AppDataSource.manager.query(` 
     SELECT  GROUP_CONCAT(obj SEPARATOR ';   ') obj_obj from
     (SELECT CONCAT_WS(": ",so.name_obj , GROUP_CONCAT( CONCAT_WS("   ",o.addr_exect,o.name) SEPARATOR '; ')) obj 
     FROM mchs.s_events_order_obj o
     LEFT JOIN mchs.s_subj_obj so ON so.id_obj=o.id_obj
     LEFT JOIN mchs.s_events_order e ON e.id_event_order=o.id_event_order
     LEFT JOIN mchs.s_subj s ON  e.id_subj=s.id_subj
     WHERE e.id_event_order=${id_event_order} AND o.active=1 AND so.active=1 AND so.org=1 GROUP BY o.id_obj,s.id_subj)dd;
         `);
        if (result_obj.length > 0) {
            obj_obj = result_obj[0].obj_obj
        }

        //Руководитель user_1 
        const result3 = await AppDataSource.manager.query(` 
     
     SELECT CONCAT_WS(" ",j.job,"(",d.departament,")",uu.l_name,uu.f_name,uu.s_name) user_staff, uu .fio user_1
     FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
        LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
        LEFT JOIN mchs.s_dept d ON d.id_dept=uu.id_dept
     WHERE   uu.active=1 AND uu.org=1 AND g.active=1 AND g.org=1  
        AND ug.active=1 AND ug.org=1 #j.active=1 and 
        AND ug.type_user in(1) AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order}   ;`);
        if (result3.length > 0) {
            user_1 = result3[0].user_1,
                user_staff = result3[0].user_staff

        }
        //Пользователь, составивший и подписавшй документ  
        const result_doc = await AppDataSource.manager.query(` 
     
     SELECT CONCAT_WS(" ",j.job,"(",d.depart_rod,")",uu.l_name,uu.f_name,uu.s_name) 
     user_staff_doc, 
     uu .fio user_doc
     FROM 
     s_form_report f
      LEFT JOIN   mchs.s_events_order e ON f.id_event_order=e.id_event_order
       LEFT JOIN mchs.users uu ON f.uid=uu.uid
        LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
        LEFT JOIN mchs.s_dept d ON d.id_dept=uu.id_dept
     WHERE   uu.active=1 AND uu.org=1# AND g.active=1 AND g.org=1  
        AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order} AND f.id_form=1011 ;`);
        if (result_doc.length > 0) {
            user_doc = result_doc[0].user_doc,
                user_staff_doc = result_doc[0].user_staff_doc

        }

        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
     SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
         SELECT 
                    j.job j,uu .fio f,
                    CASE ug.type_user
                    WHEN 1 THEN "руководитель"
                    WHEN 2 THEN "исполнитель"
                    ELSE "" 
                    END t
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE  j.active=1   AND j.org=1 and  uu.active=1   AND uu.org=1 
                    AND g.active=1   AND g.org=1 AND  g.org=1 AND ug.active=1  AND  ug.org=1
                    AND ug.type_user not in(0,3) AND  e.org=1 AND e.active=1 AND e.id_event=${id_event} LIMIT 2)dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }

        //Главный государственный инспектор 
        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT  uu .fio boss,LOWER(d.depart_rod) region1 ,
        CASE ug.type_user
         WHEN 0 THEN "Должн.лицо, направившее чек-лист"
           WHEN  1 THEN "руководитель группы"
           WHEN 2 THEN "инспектор"
           WHEN 3 THEN "Главный государcтвенный инспектор"
           WHEN 4 THEN "Государcтвенный инспектор "
           ELSE "" 
           END dolj,
        
           @dpt:=e.id_dept_iss ,@dpt_:=e.id_dept,@dpt_p:=d.id_parent,
           IF(@dpt_p IS  NOT NULL,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt_p AND d.active=1  LIMIT 1),d.departament)departament,
           IF(@dpt IS NOT NULL,di.departament,"") departament_boss,

           IFNULL(d.tel_dover,"")tel_dover,
           IFNULL(d.tel_reception,"")tel_reception,



           CASE d.id_obl
           WHEN 1 THEN "брестской обл."
           WHEN  2 THEN "витебской обл."
           WHEN 3 THEN "гомельской обл."
           WHEN 4 THEN "гродненской обл."
           WHEN 5 THEN "г.Минска"
           WHEN 6 THEN "минской обл."
           WHEN 7 THEN "могилеской обл."
           ELSE "" 
           END region
       
           FROM 
           mchs.s_events_order e 
           LEFT JOIN mchs.group g ON g.id_group=e.id_group
           LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
           LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
           LEFT JOIN mchs.s_dept d ON e.id_dept=d.id_dept
           LEFT JOIN mchs.s_dept di ON di.id_dept=e.id_dept_iss
           WHERE uu.active=1 AND uu.org=1 AND d.active=1 AND d.org=1   AND g.active=1 AND g.org=1   AND ug.active=1  
           AND ug.type_user IN (3,4) 
           AND ug.org=1
           and  e.id_event_order=${id_event_order}  ;`);
        if (result5.length > 0) {
            boss = result5[0].boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                departament = result5[0].departament,
                tel_dover = result5[0].tel_dover,
                tel_reception = result5[0].tel_reception,
                dolj = result5[0].dolj

        }

        const data = {
            result: result,
            result20: result20,
            month_begin, date_reg_unp, vedomstvo, unp,
            id_subj, subj, tel_dover, tel_reception, departament, reason_order,
            rec_mail, rec_data, rec, sopb_subj, obj_obj, id_event_order,
            num_doc, dept_iss, date_doc, addr_record, dept, sphera, reason, builds, curdate,
            agent, name_agent, perio, perio_stop, form,
            technical, date_begin, date_end, other_info, tnpa, questions,
            users, user_1, user_staff, user_staff_doc, user_doc, checkk, date_ban_to,
            region, region1, ss, dolj, boss, obst_sposob, date_cath, type_case//num,,defection, short_tnpa


        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }



    }
    //49 - Постановление АП по ч. 3 ст. 10.3
    generate49 = async (dto: genDocDTO3) => {

        let id_subj = 0, id_event = 0, id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = "_____________________", rec_mail = addr_record, rec_data = date_doc, rec = dept_iss, sopb_subj = departament,
            obj_obj = departament, month_begin = num_doc, date_reg_unp = date_doc, vedomstvo = addr_record, unp = "",
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc, reason_order = dept_iss,
            perio = reason, perio_stop = reason, technical = departament, date_end = date_doc, date_begin = date_doc, other_info = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament,
            users = departament, user_1 = departament, user_staff_doc = departament, user_doc = departament,
            region = num_doc, boss = num_doc, region1 = num_doc, num = num_doc, tel_dover = dept_iss, tel_reception = dept_iss,
            user_staff = "", acts_data = addr_record,
            ss = '(указываются место и время совершения (обнаружения) нарушений, существо нарушений с указанием нормативного правового акта,требования которого нарушены)';
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/49 - Постановление АП по ч. 3 ст. 10.3.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }

        const result = await AppDataSource.manager.query(`
        SELECT @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        s.addr_record ,s.num_doc,IFNULL(sv.name,"") vedomstvo,
        IFNULL(DATE_FORMAT(DATE(ss.date_reg_unp), "%d.%m.%Y"),"_____  ________  20__г." ) date_reg_unp,
        ss.unp,
        @fl_rec:=s.fl_rec,
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(s.receiver,"____________________" ) 
        ELSE "______________________"
        END         rec,
        
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ) 
        ELSE "_____  ________  20__г."
        END         rec_data,
        
        CASE 
        WHEN @fl_rec=1 THEN  CONCAT_WS(' ',
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ), " почтой")
        ELSE ""
        END rec_mail ,
        IFNULL(e.reason_order,"") reason_order,
        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")date_doc,
        CONCAT_WS(' ',IFNULL(ss.unp,""),IFNULL(ss.subj,""), IFNULL(ss.addr_yur,ss.addr_fact))subj,
        @perio:= CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.period_check_from), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.period_check_to), "%d.%m.%Y")
            ),
        @perio_stop:=CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.date_stop), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.date_continue), "%d.%m.%Y")),
        CONCAT_WS(' ',(CASE 
        WHEN @perio IS NOT NULL   THEN  @perio
        ELSE "c _______________ по _______________"
        END) ,
        
        (CASE 
        WHEN @perio_stop IS NOT NULL  THEN ( CONCAT("(",@perio_stop,")") )
        ELSE "" 
        END ))                                                 perio,
        IFNULL(DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y"),"") date_begin,
        @month_begin:=IFNULL(DATE_FORMAT(DATE(e.date_begin), "%m"),"")       ,
        case
            when  @month_begin="01"   then "январь"
            when  @month_begin="02"   then "февраль"
            when  @month_begin="03"   then "март"
            when  @month_begin="04"   then "апрель"
            when  @month_begin="05"   then "май"
            when  @month_begin="06"   then "июнь"
            when  @month_begin="07"   then "июль"
            when  @month_begin="08"   then "август"
            when  @month_begin="09"   then "сентябрь"
            when  @month_begin="10"   then "октябрь"
            when  @month_begin="11"   then "ноябрь"
            when  @month_begin="12"   then "декабрь"

            else ""
        end month_begin,
        IFNULL(DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),"")   date_end,
        IFNULL(CONCAT_WS(' ',e.post_agent,e.name_agent),"")    agent,
        IFNULL(e.name_agent,"")                                name_agent ,
        IFNULL(s.other_info,"")                                other_info
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_vedomstva sv ON sv.id_ved=ss.id_ved
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        WHERE ss.active=1 AND s.active=1 AND e.active=1 AND e.org=1   
        AND  s.id_list=${dto.id_list} #49
        AND e.num_order="${dto.num_order}" `);//'1   /П'   100008077  100297103


        if (result.length > 0) {
            id_event_order = result[0].id_event_order;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;//
            addr_record = result[0].addr_record;
            date_doc = result[0].date_doc;
            date_begin = result[0].date_begin;
            date_end = result[0].date_end;
            subj = result[0].subj,
                perio = result[0].perio,
                curdate = result[0].curdate,
                agent = result[0].agent,
                name_agent = result[0].name_agent,
                other_info = result[0].other_info,
                id_event = result[0].id_event,
                reason_order = result[0].reason_order,
                rec = result[0].rec,
                rec_data = result[0].rec_data,
                rec_mail = result[0].rec_mail,
                month_begin = result[0].month_begin,
                vedomstvo = result[0].vedomstvo,
                date_reg_unp = result[0].date_reg_unp,
                unp = result[0].unp;

        }
        //Протокол id_form= 1011
        const result2 = await AppDataSource.manager.query(` 
        SELECT GROUP_CONCAT(CONCAT_WS( " ",          
        IFNULL(CONCAT("№ ",r.num_doc), ""),# num_act,
        IFNULL(CONCAT(" от ",DATE_FORMAT(DATE(r.date_doc), "%d.%m.%Y")),"") #date_act 
        ))acts_data
        FROM s_form_report r 
        LEFT JOIN mchs.s_events_order e ON e.id_event_order=r.id_event_order
        WHERE r.id_form=1011 AND r.org=1 AND r.active=1 AND e.org=1 AND e.active=1 
        AND r.id_event_order=${id_event_order}  
        `);

        if (result2.length > 0) {
            acts_data = result2[0].acts_data
        }
        //Перечень нарушений в табличном виде с группировкой по видам нарушений и с названиями видов
        const result20 = await AppDataSource.manager.query(` 
     SELECT @rn:=num,num,dd.defection,id_form,short_tnpa,id_list,@rn,IF(@rn=1, dd.name_doc,"")form FROM(
        SELECT 
        ROW_NUMBER() OVER ( PARTITION BY q.id_form ORDER BY e.id_list ) num,q.name_def , f.name_doc,   
        #PARTITION BY productLine  ORDER BY quantityInStock DESC
        q.name_def defection, q.id_form,e.id_list,q.short_tnpa short_tnpa
        FROM mchs.s_events_order v
        LEFT JOIN mchs.s_events_order_que_def e ON e.id_event_order=v.id_event_order
        LEFT JOIN s_defection q ON q.id_def=e.id_def
        LEFT JOIN s_form f ON f.id_form=q.id_form
        WHERE v.id_event_order=${id_event_order} AND v.active=1  AND e.active=1 AND q.org= 1 AND v.org= 1 AND q.active=1)dd 
        `);

        if (result20.length > 0) {
            result20
        }


        //Руководитель user_1 
        const result3 = await AppDataSource.manager.query(` 
     
     SELECT CONCAT_WS(" ",j.job,"(",d.departament,")",uu.l_name,uu.f_name,uu.s_name) user_staff, uu .fio user_1
     FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
        LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
        LEFT JOIN mchs.s_dept d ON d.id_dept=uu.id_dept
     WHERE   uu.active=1 AND uu.org=1 AND g.active=1 AND g.org=1  
        AND ug.active=1 AND ug.org=1 #j.active=1 and 
        AND ug.type_user in(1) AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order}   ;`);
        if (result3.length > 0) {
            user_1 = result3[0].user_1,
                user_staff = result3[0].user_staff

        }
        //Пользователь, составивший и подписавшй документ  
        const result_doc = await AppDataSource.manager.query(` 
     
     SELECT CONCAT_WS(" ",j.job,"(",d.depart_rod,")",uu.l_name,uu.f_name,uu.s_name) user_staff_doc, uu .fio user_doc
     FROM 
     s_form_report f
      LEFT JOIN   mchs.s_events_order e ON f.id_event_order=e.id_event_order
        LEFT JOIN mchs.users uu ON f.uid=uu.uid
        LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
        LEFT JOIN mchs.s_dept d ON d.id_dept=uu.id_dept
        WHERE   uu.active=1 AND uu.org=1# AND g.active=1 AND g.org=1  
        AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order} AND f.id_form=1011 ;`);
        if (result_doc.length > 0) {
            user_doc = result_doc[0].user_doc,
                user_staff_doc = result_doc[0].user_staff_doc
        }

        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
     SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
         SELECT 
                    j.job j,uu .fio f,
                    CASE ug.type_user
                    WHEN 1 THEN "руководитель"
                    WHEN 2 THEN "исполнитель"
                    ELSE "" 
                    END t
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE  j.active=1   AND j.org=1 and  uu.active=1   AND uu.org=1 
                    AND g.active=1   AND g.org=1 AND  g.org=1 AND ug.active=1  AND  ug.org=1
                    AND ug.type_user not in(0,3) AND  e.org=1 AND e.active=1 AND e.id_event=${id_event} LIMIT 2)dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }

        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT uu .fio boss,LOWER(d.depart_rod) region1 ,
        @dpt:=d.id_parent ,d.departament,IFNULL(d.tel_dover,"")tel_dover,
        #IF(@dpt IS  NULL,d.departament,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt LIMIT 1))departament,
        IFNULL(IF(@dpt IS  NULL,d.tel_reception,(SELECT d.tel_reception FROM mchs.s_dept d WHERE d.id_dept=@dpt LIMIT 1))
        ,"")tel_reception,
        #(SELECT departament,tel_reception FROM mchs.s_dept d WHERE d.id_dept=@dpt LIMIT 1)departament,
        CASE d.id_obl
        WHEN 1 THEN "брестской обл."
        WHEN  2 THEN "витебской обл."
        WHEN 3 THEN "гомельской обл."
        WHEN 4 THEN "гродненской обл."
        WHEN 5 THEN "г.Минска"
        WHEN 6 THEN "минской обл."
        WHEN 7 THEN "могилеской обл."
        ELSE "" 
        END region
    
        FROM 
        mchs.s_events_order e 
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid=uu.uid
        LEFT JOIN mchs.s_dept d ON uu.id_dept=d.id_dept
        WHERE uu.active=1 AND uu.org=1 AND d.active=1 AND d.org=1   AND g.active=1 AND g.org=1   AND ug.active=1  
        AND ug.type_user =3 AND ug.org=1
        and  e.id_event=${id_event}  ;`);
        if (result5.length > 0) {
            boss = result5[0].boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                departament = result5[0].departament,
                tel_dover = result5[0].tel_dover,
                tel_reception = result5[0].tel_reception
        }
        const data = {
            result: result,
            result20: result20,
            result_doc: result_doc,
            month_begin, date_reg_unp, vedomstvo, unp,
            id_subj, subj, tel_dover, tel_reception, departament, reason_order,
            rec_mail, rec_data, rec, sopb_subj, obj_obj, id_event_order,
            num, num_doc, date_doc, acts_data, dept_iss, addr_record, dept, sphera, reason, builds, curdate,
            agent, name_agent, perio, perio_stop, user_staff_doc, user_doc,
            technical, date_begin, date_end, other_info, tnpa, questions, users, user_1, user_staff, region, region1, ss, boss


        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }



    }
    //50 - Постановление об освобождении по адм.проступкам
    generate50 = async (dto: genDocDTO3) => {

        let id_subj = 0, id_event = 0, id_event_order = 0;
        let num_doc = "__________", date_doc = "____  _________  _____", reason = "______________________________________",
            dept_iss = "_________________________", departament = "____________________________________________________________",
            addr_record = "_____________________", rec_mail = addr_record, rec_data = date_doc, rec = dept_iss, sopb_subj = departament,
            obj_obj = departament, month_begin = num_doc, date_reg_unp = date_doc, vedomstvo = addr_record, unp = "",
            sphera = dept_iss, builds = departament, dept = dept_iss, agent = num_doc, name_agent = num_doc, reason_order = dept_iss,
            perio = reason, perio_stop = reason, technical = departament, date_end = date_doc, date_begin = date_doc, other_info = departament,
            curdate = date_doc, tnpa = departament, subj = departament, questions = departament,
            users = departament, user_1 = departament, user_staff_doc = departament, user_doc = departament,
            region = num_doc, boss = num_doc, region1 = num_doc, num = num_doc, tel_dover = dept_iss, tel_reception = dept_iss,
            user_staff = "", acts_data = addr_record,
            ss = '(указываются место и время совершения (обнаружения) нарушений, существо нарушений с указанием нормативного правового акта,требования которого нарушены)';
        let zip: any;
        console.log(dto);
        try {
            const temp = fs.readFileSync("./templates/50 - Постановление об освобождении по адм.проступкам.docx", "binary");
            zip = new PizZip(temp);
        }
        catch (e) {
            console.log(e);
        }

        const result = await AppDataSource.manager.query(`
        SELECT @eve:=e.id_event id_event,@eo:=e.id_event_order id_event_order,@ee:=e.id_subj id_subj,
        s.addr_record ,s.num_doc,IFNULL(sv.name,"") vedomstvo,
        IFNULL(DATE_FORMAT(DATE(ss.date_reg_unp), "%d.%m.%Y"),"_____  ________  20__г." ) date_reg_unp,
        ss.unp,
        @fl_rec:=s.fl_rec,
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(s.receiver,"____________________" ) 
        ELSE "______________________"
        END         rec,
        
        CASE 
        WHEN @fl_rec=0 THEN
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ) 
        ELSE "_____  ________  20__г."
        END         rec_data,
        
        CASE 
        WHEN @fl_rec=1 THEN  CONCAT_WS(' ',
        IFNULL(DATE_FORMAT(DATE(s.date_rec), "%d.%m.%Y"),"_____  ________  20__г." ), " почтой")
        ELSE ""
        END rec_mail ,
        IFNULL(e.reason_order,"") reason_order,
        DATE_FORMAT(DATE(s.date_doc), "%d.%m.%Y")date_doc,
        CONCAT_WS(' ',IFNULL(ss.unp,""),IFNULL(ss.subj,""), IFNULL(ss.addr_yur,ss.addr_fact))subj,
        @perio:= CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.period_check_from), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.period_check_to), "%d.%m.%Y")
            ),
        @perio_stop:=CONCAT_WS(" по  ",
            DATE_FORMAT(DATE(e.date_stop), "%d.%m.%Y"),
            DATE_FORMAT(DATE(e.date_continue), "%d.%m.%Y")),
        CONCAT_WS(' ',(CASE 
        WHEN @perio IS NOT NULL   THEN  @perio
        ELSE "c _______________ по _______________"
        END) ,
        
        (CASE 
        WHEN @perio_stop IS NOT NULL  THEN ( CONCAT("(",@perio_stop,")") )
        ELSE "" 
        END ))                                                 perio,
        IFNULL(DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y"),"") date_begin,
        @month_begin:=IFNULL(DATE_FORMAT(DATE(e.date_begin), "%m"),"")       ,
        case
            when  @month_begin="01"   then "январь"
            when  @month_begin="02"   then "февраль"
            when  @month_begin="03"   then "март"
            when  @month_begin="04"   then "апрель"
            when  @month_begin="05"   then "май"
            when  @month_begin="06"   then "июнь"
            when  @month_begin="07"   then "июль"
            when  @month_begin="08"   then "август"
            when  @month_begin="09"   then "сентябрь"
            when  @month_begin="10"   then "октябрь"
            when  @month_begin="11"   then "ноябрь"
            when  @month_begin="12"   then "декабрь"

            else ""
        end month_begin,
        IFNULL(DATE_FORMAT(DATE(e.date_end), "%d.%m.%Y"),"")   date_end,
        IFNULL(CONCAT_WS(' ',e.post_agent,e.name_agent),"")    agent,
        IFNULL(e.name_agent,"")                                name_agent ,
        IFNULL(s.other_info,"")                                other_info
        FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.s_subj ss  ON e.id_subj=ss.id_subj
        LEFT JOIN mchs.s_vedomstva sv ON sv.id_ved=ss.id_ved
        LEFT JOIN s_form_report s ON s.id_event_order=e.id_event_order
        WHERE ss.active=1 AND s.active=1 AND e.active=1 AND e.org=1   
        AND  s.id_list=${dto.id_list} #50
        AND e.num_order="${dto.num_order}" `);//'1   /П'   100008077  100297103


        if (result.length > 0) {
            id_event_order = result[0].id_event_order;
            id_subj = result[0].id_subj;
            num_doc = result[0].num_doc;//
            addr_record = result[0].addr_record;
            date_doc = result[0].date_doc;
            date_begin = result[0].date_begin;
            date_end = result[0].date_end;
            subj = result[0].subj,
                perio = result[0].perio,
                curdate = result[0].curdate,
                agent = result[0].agent,
                name_agent = result[0].name_agent,
                other_info = result[0].other_info,
                id_event = result[0].id_event,
                reason_order = result[0].reason_order,
                rec = result[0].rec,
                rec_data = result[0].rec_data,
                rec_mail = result[0].rec_mail,
                month_begin = result[0].month_begin,
                vedomstvo = result[0].vedomstvo,
                date_reg_unp = result[0].date_reg_unp,
                unp = result[0].unp;

        }
        //Протокол id_form= 1011
        const result2 = await AppDataSource.manager.query(` 
        SELECT GROUP_CONCAT(CONCAT_WS( " ",          
        IFNULL(CONCAT("№ ",r.num_doc), ""),# num_act,
        IFNULL(CONCAT(" от ",DATE_FORMAT(DATE(r.date_doc), "%d.%m.%Y")),"") #date_act 
        ))acts_data
        FROM s_form_report r 
        LEFT JOIN mchs.s_events_order e ON e.id_event_order=r.id_event_order
        WHERE r.id_form=1011 AND r.org=1 AND r.active=1 AND e.org=1 AND e.active=1 
        AND r.id_event_order=${id_event_order}  
        `);

        if (result2.length > 0) {
            acts_data = result2[0].acts_data
        }
        //Перечень нарушений в табличном виде с группировкой по видам нарушений и с названиями видов
        const result20 = await AppDataSource.manager.query(` 
     SELECT @rn:=num,num,dd.defection,id_form,short_tnpa,id_list,@rn,IF(@rn=1, dd.name_doc,"")form FROM(
        SELECT 
        ROW_NUMBER() OVER ( PARTITION BY q.id_form ORDER BY e.id_list ) num,q.name_def , f.name_doc,   
        #PARTITION BY productLine  ORDER BY quantityInStock DESC
        q.name_def defection, q.id_form,e.id_list,q.short_tnpa short_tnpa
        FROM mchs.s_events_order v
        LEFT JOIN mchs.s_events_order_que_def e ON e.id_event_order=v.id_event_order
        LEFT JOIN s_defection q ON q.id_def=e.id_def
        LEFT JOIN s_form f ON f.id_form=q.id_form
        WHERE v.id_event_order=${id_event_order} AND v.active=1  AND e.active=1 AND q.org= 1 AND v.org= 1 AND q.active=1)dd 
        `);

        if (result20.length > 0) {
            result20
        }


        //Руководитель user_1 
        const result3 = await AppDataSource.manager.query(` 
     
     SELECT CONCAT_WS(" ",j.job,"(",d.departament,")",uu.l_name,uu.f_name,uu.s_name) user_staff, uu .fio user_1
     FROM 
        mchs.s_events_order e
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
        LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
        LEFT JOIN mchs.s_dept d ON d.id_dept=uu.id_dept
     WHERE   uu.active=1 AND uu.org=1 AND g.active=1 AND g.org=1  
        AND ug.active=1 AND ug.org=1 #j.active=1 and 
        AND ug.type_user in(1) AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order}   ;`);
        if (result3.length > 0) {
            user_1 = result3[0].user_1,
                user_staff = result3[0].user_staff

        }
        //Пользователь, составивший и подписавшй документ  
        const result_doc = await AppDataSource.manager.query(` 
     
     SELECT CONCAT_WS(" ",j.job,"(",d.depart_rod,")",uu.l_name,uu.f_name,uu.s_name) user_staff_doc, uu .fio user_doc
     FROM 
     s_form_report f
      LEFT JOIN   mchs.s_events_order e ON f.id_event_order=e.id_event_order
        LEFT JOIN mchs.users uu ON f.uid=uu.uid
        LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
        LEFT JOIN mchs.s_dept d ON d.id_dept=uu.id_dept
        WHERE   uu.active=1 AND uu.org=1# AND g.active=1 AND g.org=1  
        AND e.active=1 AND e.org=1 AND e.id_event_order=${id_event_order} AND f.id_form=1011 ;`);
        if (result_doc.length > 0) {
            user_doc = result_doc[0].user_doc,
                user_staff_doc = result_doc[0].user_staff_doc
        }

        //Перечень users 
        const result4 = await AppDataSource.manager.query(` 
     SELECT GROUP_CONCAT(CONCAT(t,': ',j,' ',f) SEPARATOR '; ')users FROM(
         SELECT 
                    j.job j,uu .fio f,
                    CASE ug.type_user
                    WHEN 1 THEN "руководитель"
                    WHEN 2 THEN "исполнитель"
                    ELSE "" 
                    END t
                 FROM 
                    mchs.s_events_order e
                    LEFT JOIN mchs.group g ON g.id_group=e.id_group
                    LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
                    LEFT JOIN mchs.users uu ON ug.uid_gr=uu.uid
                    LEFT JOIN mchs.s_dept_job j  ON uu.id_dept_job=j.id_dept_job
                    WHERE  j.active=1   AND j.org=1 and  uu.active=1   AND uu.org=1 
                    AND g.active=1   AND g.org=1 AND  g.org=1 AND ug.active=1  AND  ug.org=1
                    AND ug.type_user not in(0,3) AND  e.org=1 AND e.active=1 AND e.id_event=${id_event} LIMIT 2)dd  ;`);
        if (result4.length > 0) {
            users = result4[0].users

        }

        //Главный государственный инспектор 
        const result5 = await AppDataSource.manager.query(` 
        SELECT uu .fio boss,LOWER(d.depart_rod) region1 ,
        @dpt:=d.id_parent ,d.departament,IFNULL(d.tel_dover,"")tel_dover,
        #IF(@dpt IS  NULL,d.departament,(SELECT departament FROM mchs.s_dept d WHERE d.id_dept=@dpt LIMIT 1))departament,
        IFNULL(IF(@dpt IS  NULL,d.tel_reception,(SELECT d.tel_reception FROM mchs.s_dept d WHERE d.id_dept=@dpt LIMIT 1))
        ,"")tel_reception,
        #(SELECT departament,tel_reception FROM mchs.s_dept d WHERE d.id_dept=@dpt LIMIT 1)departament,
        CASE d.id_obl
        WHEN 1 THEN "брестской обл."
        WHEN  2 THEN "витебской обл."
        WHEN 3 THEN "гомельской обл."
        WHEN 4 THEN "гродненской обл."
        WHEN 5 THEN "г.Минска"
        WHEN 6 THEN "минской обл."
        WHEN 7 THEN "могилеской обл."
        ELSE "" 
        END region
    
        FROM 
        mchs.s_events_order e 
        LEFT JOIN mchs.group g ON g.id_group=e.id_group
        LEFT JOIN mchs.user_group ug ON ug.id_group=g.id_group
        LEFT JOIN mchs.users uu ON ug.uid=uu.uid
        LEFT JOIN mchs.s_dept d ON uu.id_dept=d.id_dept
        WHERE uu.active=1 AND uu.org=1 AND d.active=1 AND d.org=1   AND g.active=1 AND g.org=1   AND ug.active=1  
        AND ug.type_user =3 AND ug.org=1
        and  e.id_event=${id_event}  ;`);
        if (result5.length > 0) {
            boss = result5[0].boss,
                region = result5[0].region,
                region1 = result5[0].region1,
                departament = result5[0].departament,
                tel_dover = result5[0].tel_dover,
                tel_reception = result5[0].tel_reception
        }
        const data = {
            result: result,
            result20: result20,
            result_doc: result_doc,
            month_begin, date_reg_unp, vedomstvo, unp,
            id_subj, subj, tel_dover, tel_reception, departament, reason_order,
            rec_mail, rec_data, rec, sopb_subj, obj_obj, id_event_order,
            num, num_doc, date_doc, acts_data, dept_iss, addr_record, dept, sphera, reason, builds, curdate,
            agent, name_agent, perio, perio_stop, user_staff_doc, user_doc,
            technical, date_begin, date_end, other_info, tnpa, questions, users, user_1, user_staff, region, region1, ss, boss


        }

        try {
            let output = new Docxtemplater(zip);

            output.setData(data);
            console.log(output.data);

            try {
                output.render();
                let outputBuffer = output.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });
                fs.writeFileSync("./results/gen.docx", outputBuffer);

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }



    }
}




