import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { HospitalDTO } from 'src/models/hospital.mode';
import { RegisterationOTP, RegistrationDTO } from 'src/models/user.model';
import { HospitalsService } from 'src/services/hospitals/hospitals.service';

@Controller('hospitals')
export class HospitalsController {
    constructor(private hospitalService: HospitalsService) { }

    @Get('/private')
    getPrivateHospitals(@Query('langId')  langId: string) {
        return this.hospitalService.getAllPrivateHospitals(langId);
    }

    @Get('/private/filter')
    getFilteredPrivateHospitals(@Query('city') city: string, @Query('langId')  langId: string) {
        return this.hospitalService.getAllFilteredPrivateHospitals(city, langId);
    }

    @Get('/general')
    getAllGeneralHospitals( @Query('langId')  langId: string) {
        return this.hospitalService.getAllGeneralHospitals(langId);
    }

    @Get('/general/filter')
    getFilteredGeneralHospitals(@Query('city') city: string, @Query('langId')  langId: string) {
        return this.hospitalService.getAllFilteredGeneralHospitals(city, langId);
    }

    @Post()
    addNewPrivateHospital(@Body() hospital: HospitalDTO) {
        return this.hospitalService.createNewHospital(hospital);
    }

    @Post('/createdoctor')
    createNewDoctor(@Body() body: {doctorId: string}, @Query('hospitalId') hospitalId: string) {
        return this.hospitalService.addDoctor(body.doctorId, hospitalId);
    }

    @Post('/operations/times')
    async updateHospitalOperationDurations(@Body() newDuratonObject: {duration: string, id: string}) {
        return await this.hospitalService.updateHospitalOperationDurations(newDuratonObject.id, newDuratonObject.duration);
    }

    @Post('/operations/dates')
    async updateHospitalOperationDates(@Body() dates: {beginDate: string, endDate: string, id: string}) {
        return await this.hospitalService.updateHospitalOperationDates(dates.id, dates.beginDate, dates.endDate);
    }

    @Delete()
    deleteNewPrivate(@Body() body: { id: string }) {
        if (body.id === undefined) {
            return {
                "message": "Please provide an id",
                status: 0
            }
        }
        // return this.hospitalService.deleteHospital(body.id);
        return this.hospitalService.deleteAllHospitals();
    }


}
