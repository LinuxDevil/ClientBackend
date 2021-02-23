import { Body, Controller, Get, Post } from '@nestjs/common';
import { HospitalDTO } from 'src/models/hospital.mode';
import { HospitalsService } from 'src/services/hospitals/hospitals.service';

@Controller('hospitals')
export class HospitalsController {
    constructor(private hospitalService: HospitalsService) {}

    @Get('/private')
    getPrivateHospitals() {
        return this.hospitalService.getAllPrivateHospitals();
    }

    @Get('/general')
    getAllGeneralHospitals() {
        return this.hospitalService.getAllGeneralHospitals();
    }

    @Post()
    addNewPrivateHospital(@Body() hospital: HospitalDTO) {
        return this.hospitalService.createNewHospital(hospital);
    }

}
