import { Test, TestingModule } from '@nestjs/testing';
import { PogController } from './pog.controller';

describe('PogController', () => {
  let controller: PogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PogController],
    }).compile();

    controller = module.get<PogController>(PogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
