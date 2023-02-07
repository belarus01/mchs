import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SChlist } from './entity/chlist.entity';
import { SChlistForm } from './entity/chlistForm.entity';
import { MediafileController } from './mediafile/mediafile.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([SChlist, SChlistForm], 'mchs_connection'),
       /*  BullModule.forRoot({
            redis:{
                host:'localhost',
                port:6379
            },
        }),
        BullModule.registerQueue({
            name: 'upload-queue'
        }) */
    ],

})
export class ChlistModule {
    controllers: [MediafileController]
}
