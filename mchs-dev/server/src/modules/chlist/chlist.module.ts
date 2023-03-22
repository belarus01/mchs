import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//import { MediafileController } from './mediafile/mediafile.controller';
import { ChlistService } from './chlist.service';
import { ChlistController } from './chlist.controller';
import { SChlist } from 'src/entities/mchs/SChlist';
import { SChlistForm } from 'src/entities/mchs/SChlistForm';

@Module({
    imports:[
        TypeOrmModule.forFeature([SChlist, SChlistForm], 'mchs_connection'),
       
    ],
    providers:[ChlistService],
    controllers:[ChlistController]

})
export class ChlistModule {}
