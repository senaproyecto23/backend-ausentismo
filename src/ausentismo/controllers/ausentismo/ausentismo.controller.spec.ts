import { Test, TestingModule } from '@nestjs/testing';
import { AusentismoController } from './ausentismo.controller';

describe('AusentismoController', () => {
  let controller: AusentismoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AusentismoController],
    }).compile();

    controller = module.get<AusentismoController>(AusentismoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
