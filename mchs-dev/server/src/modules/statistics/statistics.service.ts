import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class StatisticsService {

    constructor(){

    }

    async getStats(){
         exec('wmic cpu get loadpercentage', (err, stdout, stderr) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(stdout);
            return stdout;});
    }
}
