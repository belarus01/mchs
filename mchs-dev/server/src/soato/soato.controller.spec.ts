import { Test, TestingModule } from '@nestjs/testing';
import { SoatoController } from './soato.controller';

describe('SoatoController', () => {
  let controller: SoatoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoatoController],
    }).compile();

    controller = module.get<SoatoController>(SoatoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
