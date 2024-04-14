import { Test, TestingModule } from '@nestjs/testing';
import { RetraitsService } from './retraits.service';

describe('RetraitsService', () => {
  let service: RetraitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetraitsService],
    }).compile();

    service = module.get<RetraitsService>(RetraitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
