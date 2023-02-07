import { Test, TestingModule } from '@nestjs/testing';
import { TnpaController } from './tnpa.controller';

describe('TnpaController', () => {
  let controller: TnpaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TnpaController],
    }).compile();

    controller = module.get<TnpaController>(TnpaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
