import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { MediafileController } from './mediafile.controller';

@Module({
  controllers: [FileController, MediafileController]
})
export class FileModule {}
