import { Test, TestingModule } from '@nestjs/testing';
import { OcupacionController } from './ocupacion.controller';

describe('OcupacionController', () => {
  let controller: OcupacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OcupacionController],
    }).compile();

    controller = module.get<OcupacionController>(OcupacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
