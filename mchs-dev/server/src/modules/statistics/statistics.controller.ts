import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { StatisticsService } from './statistics.service';
import { MemoryResponse, MemorySizeResponce } from 'src/interfaces';

@Controller('statistics')
export class StatisticsController {
    constructor(private statisticsService: StatisticsService){}
    
    @Get('/cpu')
    getCPU(@Res() response: Response){
      this.statisticsService.getCpu(function(data:string){
        response.send(data);
      });
      //response.send();
    }
  
    @Get('/mem')
    async getMemory(@Res() response: Response){
      const data = await this.statisticsService.getMemory(function(res:MemoryResponse[]){
        response.send(res);
      });
    }
  
    @Get('/size')
    async getMemorySize(@Res() response: Response){
      this.statisticsService.getMemorySize(function(res:MemorySizeResponce[]){
        console.log(res);
        response.send(res);
      });
    }
}
