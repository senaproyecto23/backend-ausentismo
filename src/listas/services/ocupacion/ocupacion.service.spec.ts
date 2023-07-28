import { Test, TestingModule } from '@nestjs/testing';
import { OcupacionService } from './ocupacion.service';

describe('OcupacionService', () => {
  let service: OcupacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OcupacionService],
    }).compile();

    service = module.get<OcupacionService>(OcupacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
