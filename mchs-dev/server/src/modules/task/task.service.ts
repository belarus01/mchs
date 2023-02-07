import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDataDTO } from './dto/create-taskData.dto';
import { TaskData } from './entity/taskData.entity';
import { TaskResult } from './entity/taskResult.entity';
import { TaskNotFoundException } from './exception/task.not-found.exception';


@Injectable()
export class TaskService {
    constructor(@InjectRepository(TaskData, 'mchs_connection') private taskDataRepository: Repository<TaskData>){

    }

    async createTaskData(taskDataDto:CreateTaskDataDTO): Promise<TaskData>{//!!!create-taskData.dto уточнить
        const taskData = this.taskDataRepository.create(taskDataDto);
        return this.taskDataRepository.save(taskData);
    }


    async getTaskDataBeginDateById( idTaskData: number){
        const taskDataBeginDate = (await (this.taskDataRepository.findOneBy({ idTaskData }))).dateBegin;
        if(!taskDataBeginDate){
            throw new TaskNotFoundException(idTaskData);
        }
        return taskDataBeginDate;
    }

    async getTaskDataEndDateById( idTaskData: number){
        const taskDataEndDate = (await (this.taskDataRepository.findOneBy({ idTaskData }))).dateEnd;
        if(!taskDataEndDate){
            throw new TaskNotFoundException(idTaskData);
        }
        return taskDataEndDate;
    }

    async getTaskDataLastRunDateById( idTaskData: number){
        const taskDataLastRunDate = (await (this.taskDataRepository.findOneBy({ idTaskData }))).dateLastRun;
        if(!taskDataLastRunDate){
            throw new TaskNotFoundException(idTaskData);
        }
        return taskDataLastRunDate;
    }

    async getTaskDataStatusById(idTaskData: number){
        const taskDataStatus = (await this.taskDataRepository.findOneBy({idTaskData})).idTaskStatus; 
        if(!taskDataStatus){
            throw new TaskNotFoundException(idTaskData);
        }
        return taskDataStatus;
    }

    async deleteTaskDataById(idTaskData: number){
        await this.taskDataRepository.delete(idTaskData);
    }

    async getAllTaskData(): Promise<TaskData[]>{
        const taskData = await this.taskDataRepository.find();
        return taskData;
    }

    async updateTaskData(taskData:TaskData){
        return this.taskDataRepository.update(taskData.idTaskData, taskData);
    }

    async getDaysToTaskEnd(idTaskData: number){
       /*  const start = (await this.taskDataRepository.findOneBy({idTaskData})).dateLastRun;
        const end = (await this.taskDataRepository.findOneBy({idTaskData})).dateEnd; */// раскоментить для получения того что надо

        const start = (await this.taskDataRepository.findOneBy({idTaskData})).dateBegin; //эти поля для теста, т к даты нормальные в бд, а не 2116 год
        const end = (await this.taskDataRepository.findOneBy({idTaskData})).dateLastRun;

        if(!start || !end){
            throw new TaskNotFoundException(idTaskData);
        }
        return this.getDaysDiff(start, end);
    }

    async getDaysDiff(start: Date, end: Date){
        return (Math.floor(end.getTime() / (24 * 60 * 60 * 1000)) - Math.floor(start.getTime() / (24 * 60 * 60 * 1000)));
    }






    //для создания периода берется period и если такое то число, то устанавливам соответ. period_type?
    //..НО и period, и period_type :number, ?для чего тогда 2 поля периода

}
