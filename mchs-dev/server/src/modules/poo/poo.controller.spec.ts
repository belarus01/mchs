import { Test, TestingModule } from '@nestjs/testing';
import { PooController } from './poo.controller';

describe('PooController', () => {
  let controller: PooController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PooController],
    }).compile();

    controller = module.get<PooController>(PooController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
