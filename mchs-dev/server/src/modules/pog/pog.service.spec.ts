import { Test, TestingModule } from '@nestjs/testing';
import { PogService } from './pog.service';

describe('PogService', () => {
  let service: PogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PogService],
    }).compile();

    service = module.get<PogService>(PogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
