import { Controller, Post, Body, Get, Put, Delete, Param, NotFoundException, Sse } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private taskDataService: TaskService){

    }

    @Get('/get/:idTaskData/beginDate')
    async getTaskDataBeginDateById(@Param('idTaskData') idTaskData: number){
        const eventBeginDate = await this.taskDataService.getTaskDataBeginDateById(idTaskData);
        return eventBeginDate;
    }

    @Get('/get/:idTaskData/endDate')
    async getTaskDataEndDateById(@Param('idTaskData') idTaskData: number){
        const eventEndDate = await this.taskDataService.getTaskDataEndDateById(idTaskData);
        return eventEndDate;
    }

    @Get('/get/:idTaskData/lastRunDate')
    async getTaskDataLastRunDateById(@Param('idTaskData') idTaskData: number){
        const eventLastRunDate = await this.taskDataService.getTaskDataLastRunDateById(idTaskData);
        return eventLastRunDate;
    }



    @Get('/get/:idTaskData/status')
    async getTaskDataStatusById(idTaskData: number){
        const eventStatus = await this.taskDataService.getTaskDataStatusById(idTaskData);
        return eventStatus;
    }

    @Get('/get/all')
    getAllTaskData(){
        return this.taskDataService.getAllTaskData();
    }
    

    @Put('/delete/:idTaskData')
    deleteTaskDataById(@Param('idTaskData') idTaskData: number){
        return this.taskDataService.deleteTaskDataById(idTaskData);
    }

    @Get('/get/days_to_task_end/:idTaskData')
    async getDaysToTaskEnd(@Param('idTaskData') idTaskData: number){
        return this.taskDataService.getDaysToTaskEnd(idTaskData);
    }



    //@Sse('')
    /*sendEvent(): Observable<MessageEvent>{
        return interval(1000).pipe(
            map((num: number) => ({
                data:
            })),
        );
    } */
    //таймер - отправлять сообщение на период который задан админом, берем разницу между date_last_run и date_end, getDaysToTaskEnd(idTaskData: number) 
    //( => доолжна быть установлена связь user - task_data(date_end))
    //?? сделать на auth(если установим связь) или в task
    //?для чего таблица task_result
}
