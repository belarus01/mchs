import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import * as fs from 'fs'
import * as morgan from 'morgan'
import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from './modules/validator/validation-exception';
import { AllExceptionsFilter } from './modules/filter/all-exceptions.filter';

const logStream = fs.createWriteStream('api.log',{/* to continuously write to api.log file as we recieve, logging req-s*/
  flags: 'a'//append
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(morgan('short', {stream: logStream}));
  app.useGlobalFilters(new AllExceptionsFilter);// randomly added never tested in the prosess
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: errors => new ValidationException(errors) 
    })
  );
  await app.listen(4000);
  
}
bootstrap();
