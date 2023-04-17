import { Injectable } from '@nestjs/common';
import { exec } from "child_process";
import { stdout } from 'process';
import * as fs from 'fs'
import { MemoryResponse, MemorySizeResponce } from './interfaces';
import { DataSource } from 'typeorm';
import { Sequelize } from 'sequelize';
//import { Sequelize } from 'sequelize-typescript';

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");



@Injectable()
export class AppService {
  constructor(private sequelize: Sequelize){

  }

  private response: MemoryResponse[] = [];
  getHello(): string {
    return 'Hello World!';
  }

  parseCpu(str: string): string {
    let data = str.split(' ');
    return data[data.length - 1];
  }

  getCpu(callback: (data: string) => void) {
    exec("mpstat > mpstat.txt", (error, stdout, stderr) => {
      if (error) {
        console.log('error:' + error.message);
        return;
      }
      if (stderr) {
        console.log('stderr:' + stderr);
        return;
      }

      const allContent = fs.readFileSync("mpstat.txt", 'utf-8');
        let lines: string[] = [];
        allContent.split(/\r?\n/).forEach(line => {
          lines.push(line);
        });
      return callback(this.parseCpu(lines[3]));
    })
  }


  async getMemory(callback: (data: MemoryResponse[]) => void) {
    this.response = [];
    for (let i = 9; i <= 17; i++) {
      await exec("smartctl --all --device=megaraid," + i + " /dev/sda > mem" + i + ".txt", (error, stdout, stderr) => {

        if (stderr) {
          console.log('stderr:' + stderr);
          return;
        }
        const allContent = fs.readFileSync("mem" + i + ".txt", 'utf-8');
        let lines: string[] = [];
        allContent.split(/\r?\n/).forEach(line => {
          lines.push(line);
        });
        const a = lines[21].split(' ');

        const res: MemoryResponse = {
          status: lines[21].split(' ')[5],
          errors: lines[85]
        };
        console.log("disk " + i + ' ' + JSON.stringify(res));
        this.response.push(res);
      })

    }
    setTimeout(()=>{
      callback(this.response);
    }, 1000);
  }


  getMemorySize(callback: (res: MemorySizeResponce[]) => void) {
    exec('df -hT > df.txt', (error, stdout, stderr) => {
      const allContent = fs.readFileSync("df.txt", 'utf-8');

      let lines: string[] = [];

      allContent.split(/\r?\n/).forEach(line => {
        lines.push(line);
      });

      const linesDB = lines[5].split(' ').filter((value) => {
        return value != '';
      });

      const linesAPP = lines[7].split(' ').filter((value) => {
        return value != '';
      });

      const db: MemorySizeResponce = {
        size: linesDB[2],
        used: linesDB[3],
        free: linesDB[4],
        percentage: linesDB[5]
      };

      const app: MemorySizeResponce = {
        size: linesAPP[2],
        used: linesAPP[3],
        free: linesAPP[4],
        percentage: linesAPP[5]
      }
      
      return callback([db, app]);
    })

  }

  getData= async ()=>{
   const [result, metadata] = await this.sequelize.query("SELECT d.id_event,s.id_subj,s.subj ,s.unp,IFNULL(s.date_reg_unp,'-')date_reg_unp,s.id_ved,IFNULL(ved.name,'-')ved,s.addr_yur,IFNULL(s.addr_fact,'-')addr_fact,   s.boss_name,s.staff_boss,s.id_oked,oked.name_oked ,COUNT(eo.name),GROUP_CONCAT(eo.name  SEPARATOR ', ') zd,IFNULL(sd.departament,'-')departament,IFNULL(sd.unp_nadz_organ,'-')unp_nadz_organ,IFNULL(sd.address,'-')address,IFNULL(sd.fio_boss,'-')fio_boss,IFNULL(sd.dolzn_boss_nadz_org,'-')dolzn_boss_nadz_org,   d.type_order,d.type_check,d.sphera,d.reason_order,d.post_title,d.fio_post_title,d.num_order,   d.date_order,   CONCAT(d.period_check_from,' - ',d.period_check_to) period_check,   d.date_begin, d.date_end,d.date_begin_fact,d.date_end_fact,d.date_stop,d.date_continue,IF(d.date_to IS NULL, 'РЅРµС‚','РґР°')fl_longer,d.date_to,   d.post_agent,d.name_agent   FROM mchs.s_events_order  d   LEFT JOIN mchs.group g ON g.id_group=d.id_group   LEFT JOIN mchs.s_dept sd ON g.id_dept=sd.id_dept   LEFT JOIN mchs.s_subj s ON d.id_subj=s.id_subj   LEFT JOIN mchs.s_subj_obj so ON so.id_subj=s.id_subj   LEFT JOIN  mchs.s_oked oked ON s.id_oked=oked.id_oked LEFT JOIN  mchs.s_vedomstva ved ON s.id_ved=ved.id_vedLEFT JOIN mchs.s_events_order_obj eo ON eo.id_obj=so.id_objWHERE d.id_event_order=1 GROUP BY so.id_subj");
   console.log(result);
  }

//   generate=()=>{
//     const temp = fs.readFileSync("text.docx", "binary");
//     const zip = new PizZip(temp);
     

//     const data = {
//       subj: 'РџСЂРѕРёР·РІРѕРґСЃС‚РІРµРЅРЅРѕРµ СЂРµСЃРїСѓР±Р»РёРєР°РЅСЃРєРѕРµ СѓРЅРёС‚Р°СЂРЅРѕРµ РїСЂРµРґРїСЂРёСЏС‚РёРµ РњРРќРЎРљРћР‘Р›Р“РђР—',
//       addr_yur:'Рі. РњРёРЅСЃРє, СѓР». Р“СѓСЂСЃРєРѕРіРѕ, Рґ. 9',
//       punkt:,
//       start_period:,
//       end_period:,
//       mounth:,
//       year:,
//     };
// try{
//   let output = new Docxtemplater(zip);

//   output.setData(data);

//   try{
//     output.render();
//     let outputBuffer = output.getZip().generate({type:'nodebuffer', compression:"DEFLATE"});
//     fs.writeFileSync("gen.docx", outputBuffer);

//   }
//   catch(error){
//     console.log(error);
//   }
// }
// catch(error){
//   console.log(error);
// }
    




//   }

}
