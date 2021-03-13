import { Test, TestingModule } from '@nestjs/testing';
import { ArmyplacesService } from './armyplaces.service';

describe('ArmyplacesService', () => {
  let service: ArmyplacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArmyplacesService],
    }).compile();

    service = module.get<ArmyplacesService>(ArmyplacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
