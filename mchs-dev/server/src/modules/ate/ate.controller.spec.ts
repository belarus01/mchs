import { Test, TestingModule } from '@nestjs/testing';
import { AteController } from './ate.controller';

describe('AteController', () => {
  let controller: AteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AteController],
    }).compile();

    controller = module.get<AteController>(AteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
