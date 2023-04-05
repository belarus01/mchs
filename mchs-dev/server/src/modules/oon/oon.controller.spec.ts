import { Test, TestingModule } from '@nestjs/testing';
import { OonController } from './oon.controller';

describe('OonController', () => {
  let controller: OonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OonController],
    }).compile();

    controller = module.get<OonController>(OonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
