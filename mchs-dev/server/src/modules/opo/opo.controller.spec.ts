import { Test, TestingModule } from '@nestjs/testing';
import { OpoController } from './opo.controller';

describe('OpoController', () => {
  let controller: OpoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpoController],
    }).compile();

    controller = module.get<OpoController>(OpoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
