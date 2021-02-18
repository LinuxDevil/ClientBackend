import { Controller } from '@nestjs/common';
import { HospitalsService } from 'src/services/hospitals/hospitals.service';

@Controller('hospitals')
export class HospitalsController {
    constructor(private hospitalService: HospitalsService) {}
}
