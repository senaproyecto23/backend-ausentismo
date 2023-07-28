import { Test, TestingModule } from '@nestjs/testing';
import { ContingenciaService } from './contingencia.service';

describe('ContingenciaService', () => {
  let service: ContingenciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContingenciaService],
    }).compile();

    service = module.get<ContingenciaService>(ContingenciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
