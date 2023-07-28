import { Test, TestingModule } from '@nestjs/testing';
import { ContingenciaController } from './contingencia.controller';

describe('ContingenciaController', () => {
  let controller: ContingenciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContingenciaController],
    }).compile();

    controller = module.get<ContingenciaController>(ContingenciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
