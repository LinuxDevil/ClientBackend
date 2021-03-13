import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { DoctorPlaceDTO } from 'src/models/doctorplace.model';
import { DoctorplacesService } from 'src/services/doctorplaces/doctorplaces.service';

@Controller('doctorplaces')
export class DoctorplacesController {

    constructor(private doctorPlaceService: DoctorplacesService) {}
    
    @Get('/private')
    getPrivateDoctorPlace() {
        return this.doctorPlaceService.getAllPrivateDoctorPlaces();
    }

    @Get('/private/filter')
    getFilteredPrivateDoctorPlace(@Query('city') city: string) {
        return this.doctorPlaceService.getAllFilteredPrivateDoctorPlaces(city);
    }

    @Get('/general')
    getAllGeneralDoctorPlace() {
        return this.doctorPlaceService.getAllGeneralDoctorPlaces();
    }

    @Get('/general/filter')
    getFilteredGeneralDoctorPlace(@Query('city') city: string) {
        return this.doctorPlaceService.getAllFilteredGeneralDoctorPlaces(city);
    }


    @Post()
    addNewPrivateDoctorPlace(@Body() doctorplace: DoctorPlaceDTO) {
        return this.doctorPlaceService.createNewDoctorPlace(doctorplace);
    }

    @Post('/createdoctor')
    createNewDoctor(@Body() body: {doctorId: string}, @Query('doctorplaceId') doctorplaceId: string) {
        return this.doctorPlaceService.addDoctor(body.doctorId, doctorplaceId);
    }

    @Post('/operations/times')
    async updateDoctorPlaceOperationDurations(@Body() newDuratonObject: {duration: string, id: string}) {
        return await this.doctorPlaceService.updateDoctorPlaceOperationDurations(newDuratonObject.id, newDuratonObject.duration);
    }

    @Post('/operations/dates')
    async updateDoctorPlaceOperationDates(@Body() dates: {beginDate: string, endDate: string, id: string}) {
        return await this.doctorPlaceService.updateDoctorPlaceOperationDates(dates.id, dates.beginDate, dates.endDate);
    }

    @Delete()
    deleteNewPrivate(@Body() body: { id: string }) {
        if (body.id === undefined) {
            return {
                "message": "Please provide an id",
                status: 0
            }
        }
        // return this.doctorPlaceService.deleteDoctorPlace(body.id);
        return this.doctorPlaceService.deleteAllDoctorPlaces();
    }

}
