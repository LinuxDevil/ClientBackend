import { Test, TestingModule } from '@nestjs/testing';
import { DoctorplacesService } from './doctorplaces.service';

describe('DoctorplacesService', () => {
  let service: DoctorplacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorplacesService],
    }).compile();

    service = module.get<DoctorplacesService>(DoctorplacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
