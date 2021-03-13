import { Test, TestingModule } from '@nestjs/testing';
import { DoctorplacesController } from './doctorplaces.controller';

describe('DoctorplacesController', () => {
  let controller: DoctorplacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorplacesController],
    }).compile();

    controller = module.get<DoctorplacesController>(DoctorplacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
