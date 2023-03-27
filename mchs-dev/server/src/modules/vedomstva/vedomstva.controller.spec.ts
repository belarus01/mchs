import { Test, TestingModule } from '@nestjs/testing';
import { VedomstvaController } from './vedomstva.controller';

describe('VedomstvaController', () => {
  let controller: VedomstvaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VedomstvaController],
    }).compile();

    controller = module.get<VedomstvaController>(VedomstvaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
