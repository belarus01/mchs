import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { MemoryResponse, MemorySizeResponce } from 'src/interfaces'; 
import { stdout } from 'process';
import * as fs from 'fs'

@Injectable()
export class StatisticsService {

    constructor(){

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
}
