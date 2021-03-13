import { Test, TestingModule } from '@nestjs/testing';
import { ArmyplacesController } from './armyplaces.controller';

describe('ArmyplacesController', () => {
  let controller: ArmyplacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmyplacesController],
    }).compile();

    controller = module.get<ArmyplacesController>(ArmyplacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
