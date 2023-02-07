import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
    constructor(private statisticsService: StatisticsService){

        
    }

    @Get('/all')
    getAllStats(){
        return this.statisticsService.getStats();
    }
}
