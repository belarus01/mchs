import { Module } from '@nestjs/common';
import { DocGenerationService } from './doc-generation.service';
import { DocGenerationController } from './doc-generation.controller';
import { DataSource } from 'typeorm';

@Module({
  providers: [DocGenerationService],
  controllers: [DocGenerationController]
})
export class DocGenerationModule {}

