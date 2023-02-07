import { Test, TestingModule } from '@nestjs/testing';
import { OkedService } from './oked.service';

describe('OkedService', () => {
  let service: OkedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OkedService],
    }).compile();

    service = module.get<OkedService>(OkedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
