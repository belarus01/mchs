import { Test, TestingModule } from '@nestjs/testing';
import { AteService } from './ate.service';

describe('AteService', () => {
  let service: AteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AteService],
    }).compile();

    service = module.get<AteService>(AteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
