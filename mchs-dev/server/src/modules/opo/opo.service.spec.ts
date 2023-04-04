import { Test, TestingModule } from '@nestjs/testing';
import { OpoService } from './opo.service';

describe('OpoService', () => {
  let service: OpoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpoService],
    }).compile();

    service = module.get<OpoService>(OpoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
