import { Test, TestingModule } from '@nestjs/testing';
import { CaissiersService } from './caissiers.service';

describe('CaissiersService', () => {
  let service: CaissiersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaissiersService],
    }).compile();

    service = module.get<CaissiersService>(CaissiersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
