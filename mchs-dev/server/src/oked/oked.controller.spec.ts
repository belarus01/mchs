import { Test, TestingModule } from '@nestjs/testing';
import { OkedController } from './oked.controller';

describe('OkedController', () => {
  let controller: OkedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OkedController],
    }).compile();

    controller = module.get<OkedController>(OkedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
