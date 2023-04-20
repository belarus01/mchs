import { Injectable } from '@nestjs/common';
import { SQuestion } from './entity/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDTO } from './dto/create-question.dto';
import { QuestionNotFoundException } from './exception/question.not-found.exception';

@Injectable()
export class QuestionService {
    constructor(@InjectRepository(SQuestion, 'mchs_connection') private questionRepository: Repository<SQuestion>){}

    async createQuestion(dto: CreateQuestionDTO){
        const que = this.questionRepository.create(dto);
        return this.questionRepository.save(que);
    }

    async getQuestionById(idQue: number){
        const que = await this.questionRepository.findOneBy({idQue});
        if(!que){
            throw new QuestionNotFoundException(idQue);
        }
        return que;
    }

    async getAllQuestions(){
        return await this.questionRepository.find();
    }

    async updateQuestion(idQue: number, dto: CreateQuestionDTO){
        return await this.questionRepository.update(idQue, dto);
    }

    async deleteQuestionById(idQue: number){
        return await this.questionRepository.update(idQue, {active:0});
    }
}
