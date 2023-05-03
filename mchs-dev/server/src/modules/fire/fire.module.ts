import { Module } from '@nestjs/common';
import { FireService } from './fire.service';
import { FireController } from './fire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SFireCardBuild } from './entity/fireCardBuild.entity';
import { SFireCardAuto } from './entity/fireCardAuto.entity';
import { SFireCardCut } from './entity/fireCardCut.entity';
import { SFireCardStaff } from './entity/fireCardStaff.entity';
import { SFireCardSubj } from './entity/fireCardSubj.entity';
import { SFireCardExternal } from './entity/fireCardExternal.entity';
import { SFireCardSignal } from './entity/fireCardSignal.entity';
import { SFireCardForce } from './entity/fireCardForce.entity';
import { SFireCardInfo } from './entity/fireCardInfo.entity';
import { SFireCardInfoTo } from './entity/fireCardInfoTo.entity';
import { SFireCardInternal } from './entity/fieCardInternal.entity';
import { SFireCardRent } from './entity/fireCardRent.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    SFireCardBuild,
    SFireCardAuto,
    SFireCardCut,
    SFireCardStaff,
    SFireCardSubj,
    SFireCardExternal,
    SFireCardSignal,
    SFireCardForce,
    SFireCardInfo,
    SFireCardInfoTo,
    SFireCardInternal,
    SFireCardRent
  ], 'mchs_connection'),],
  providers: [FireService],
  controllers: [FireController]
})
export class FireModule {}
