import { Test, TestingModule } from '@nestjs/testing';
import { SopbController } from './sopb.controller';

describe('SopbController', () => {
  let controller: SopbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SopbController],
    }).compile();

    controller = module.get<SopbController>(SopbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
