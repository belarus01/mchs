import { Injectable } from '@nestjs/common';
import { SQuestion } from './entity/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDTO } from './dto/create-question.dto';
import { QuestionNotFoundException } from './exception/question.not-found.exception';
import { SQuestion1 } from './entity/question1.entity';

@Injectable()
export class QuestionService {
    constructor(@InjectRepository(SQuestion, 'mchs_connection') private questionRepository: Repository<SQuestion>,
    @InjectRepository(SQuestion1, 'mchs_connection') private question1Repository: Repository<SQuestion1>,
    ){}

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

    async getAllQuestionsWithRelations(){
        return await this.questionRepository.find({where: {
            active:1
        }, relations: {
            idUnit: true,
            sEventsQues: true,
            sEventsOrderQues: true,
        }
    });
    }

    async getAllQuestion1sWithRelations(){
        return await this.question1Repository.find({where: {
            active:1
        }, relations: {
            idEvent2: true,
            idTnpa2: true
        }
    });
    }

    async updateQuestion(idQue: number, dto: CreateQuestionDTO){
        return await this.questionRepository.update(idQue, dto);
    }

    async deleteQuestionById(idQue: number){
        return await this.questionRepository.update(idQue, {active:0});
    }
}
