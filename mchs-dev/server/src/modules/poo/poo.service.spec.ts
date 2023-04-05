import { Test, TestingModule } from '@nestjs/testing';
import { PooService } from './poo.service';

describe('PooService', () => {
  let service: PooService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PooService],
    }).compile();

    service = module.get<PooService>(PooService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
