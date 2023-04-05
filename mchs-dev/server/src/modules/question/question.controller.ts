import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateQuestionDTO } from './dto/create-question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService){}

    @Post('/create')
    async createQuestion(@Body() dto: CreateQuestionDTO){
        return this.questionService.createQuestion(dto);
    }

    @Get('/get/id/:idQue')
    async getQuestionById(@Param('idQue') idQue: number){
        return this.questionService.getQuestionById(idQue);
    }

    @Get('/get/all')
    async getAllQuestions(){
        return this.questionService.getAllQuestions();
    }

    @Put('/update')
    async updateQuestion(@Param('idQue') idQue: number, @Body() dto: CreateQuestionDTO){
        return this.questionService.updateQuestion(idQue, dto);
    }

    @Put('/delete/:idQue')
    async deleteQuestionById(@Param('idQue') idQue: number){
        return this.questionService.deleteQuestionById(idQue);
    }
}
