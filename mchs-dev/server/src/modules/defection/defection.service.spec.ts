import { Test, TestingModule } from '@nestjs/testing';
import { DefectionService } from './defection.service';

describe('DefectionService', () => {
  let service: DefectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefectionService],
    }).compile();

    service = module.get<DefectionService>(DefectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
