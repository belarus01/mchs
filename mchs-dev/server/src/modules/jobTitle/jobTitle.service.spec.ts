import { Test, TestingModule } from '@nestjs/testing';
import { JobTitleService } from './jobTitle.service';

describe('JobTitleService', () => {
  let service: JobTitleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobTitleService],
    }).compile();

    service = module.get<JobTitleService>(JobTitleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
