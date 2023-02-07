import { Test, TestingModule } from '@nestjs/testing';
import { SoatoService } from './soato.service';

describe('SoatoService', () => {
  let service: SoatoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoatoService],
    }).compile();

    service = module.get<SoatoService>(SoatoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
