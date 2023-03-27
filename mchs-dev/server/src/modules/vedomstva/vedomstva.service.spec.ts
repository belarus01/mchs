import { Test, TestingModule } from '@nestjs/testing';
import { VedomstvaService } from './vedomstva.service';

describe('VedomstvaService', () => {
  let service: VedomstvaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VedomstvaService],
    }).compile();

    service = module.get<VedomstvaService>(VedomstvaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
