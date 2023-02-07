import { Test, TestingModule } from '@nestjs/testing';
import { TnpaService } from './tnpa.service';

describe('TnpaService', () => {
  let service: TnpaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TnpaService],
    }).compile();

    service = module.get<TnpaService>(TnpaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
