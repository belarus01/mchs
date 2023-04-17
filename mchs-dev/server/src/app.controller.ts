import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { MemoryResponse, MemorySizeResponce } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/cpu')
  getCPU(@Res() response: Response){
    this.appService.getCpu(function(data:string){
      response.send(data);
    });
    //response.send();
  }

  @Get('/mem')
  async getMemory(@Res() response: Response){
    const data = await this.appService.getMemory(function(res:MemoryResponse[]){
      response.send(res);
    });
  }

  @Get('/size')
  async getMemorySize(@Res() response: Response){
    this.appService.getMemorySize(function(res:MemorySizeResponce[]){
      console.log(res);
      response.send(res);
    });
  }

  @Get('/gen')
  generate(){
    this.appService.getData();
  }

}
