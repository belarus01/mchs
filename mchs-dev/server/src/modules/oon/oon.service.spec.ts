import { Test, TestingModule } from '@nestjs/testing';
import { OonService } from './oon.service';

describe('OonService', () => {
  let service: OonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OonService],
    }).compile();

    service = module.get<OonService>(OonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
