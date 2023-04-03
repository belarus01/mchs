import { Test, TestingModule } from '@nestjs/testing';
import { DefectionController } from './defection.controller';

describe('DefectionController', () => {
  let controller: DefectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefectionController],
    }).compile();

    controller = module.get<DefectionController>(DefectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
