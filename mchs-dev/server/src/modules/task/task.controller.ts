import { Controller, Post, Body, Get, Put, Delete, Param, NotFoundException, Sse } from '@nestjs/common';
import { TaskData } from './entity/taskData.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private taskDataService: TaskService){

    }

    //не работает Exception???(выдает исключение только на idTaskDate = 6, если делать запрос с id которого нет в таблице, то выбрасывает из работы сервиса)
    @Get('/get/:idTaskData/beginDate')
    async getTaskDataBeginDateById(@Param('idTaskData') idTaskData: number){
        const eventBeginDate = await this.taskDataService.getTaskDataBeginDateById(idTaskData);
        return eventBeginDate;
    }
    //такая же работа exception как и с beginDate
    @Get('/get/:idTaskData/endDate')
    async getTaskDataEndDateById(@Param('idTaskData') idTaskData: number){
        const eventEndDate = await this.taskDataService.getTaskDataEndDateById(idTaskData);
        return eventEndDate;
    }
    //такая же работа exception как и с beginDate
    @Get('/get/:idTaskData/lastRunDate')
    async getTaskDataLastRunDateById(@Param('idTaskData') idTaskData: number){
        const eventLastRunDate = await this.taskDataService.getTaskDataLastRunDateById(idTaskData);
        return eventLastRunDate;
    }


    //неправильно работало и такой же вопрос с исключением
    @Get('/get/:idTaskData/status')
    async getTaskDataStatusById(@Param('idTaskData') idTaskData: number){
        const eventStatus = await this.taskDataService.getTaskDataStatusById(idTaskData);
        return eventStatus;
    }

    @Get('/get/all')
    getAllTaskData(){
        return this.taskDataService.getAllTaskData();
    }
    //не рабоатает
    @Put('/update')
    updateTaskData(@Body() taskData: TaskData){
        return this.taskDataService.updateTaskData(taskData);
    }

    @Put('/delete/:idTaskData')
    deleteTaskDataById(@Param('idTaskData') idTaskData: number){
        return this.taskDataService.deleteTaskDataById(idTaskData);
    }
    //exception ???
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
