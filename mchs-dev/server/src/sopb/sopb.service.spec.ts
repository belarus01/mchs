import { Test, TestingModule } from '@nestjs/testing';
import { SopbService } from './sopb.service';

describe('SopbService', () => {
  let service: SopbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SopbService],
    }).compile();

    service = module.get<SopbService>(SopbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
