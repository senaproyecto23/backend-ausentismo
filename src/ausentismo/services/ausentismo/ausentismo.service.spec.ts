import { Test, TestingModule } from '@nestjs/testing';
import { AusentismoService } from './ausentismo.service';

describe('AusentismoService', () => {
  let service: AusentismoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AusentismoService],
    }).compile();

    service = module.get<AusentismoService>(AusentismoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
