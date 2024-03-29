import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SChlist } from './entity/chlist.entity';
import { SChlistForm } from './entity/chlistForm.entity';
//import { MediafileController } from './mediafile/mediafile.controller';
import { ChlistService } from './chlist.service';
import { ChlistController } from './chlist.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([SChlist, SChlistForm], 'mchs_connection'),
       
    ],
    providers:[ChlistService],
    controllers:[ChlistController]

})
export class ChlistModule {}
