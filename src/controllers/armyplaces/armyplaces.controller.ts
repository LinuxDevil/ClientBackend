import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ArmyPlaceDTO } from 'src/models/armyplace.model';
import { ArmyplacesService } from 'src/services/armyplaces/armyplaces.service';

@Controller('armyplaces')
export class ArmyplacesController {

    constructor(private armyPlaceService: ArmyplacesService) { }


    @Get('/private')
    getPrivateArmyPlace() {
        return this.armyPlaceService.getAllPrivateArmyPlaces();
    }

    @Get('/private/filter')
    getFilteredPrivateArmyPlace(@Query('city') city: string) {
        return this.armyPlaceService.getAllFilteredPrivateArmyPlaces(city);
    }

    @Get('/general')
    getAllGeneralArmyPlace() {
        return this.armyPlaceService.getAllGeneralArmyPlaces();
    }

    @Get('/general/filter')
    getFilteredGeneralArmyPlace(@Query('city') city: string) {
        return this.armyPlaceService.getAllFilteredGeneralArmyPlaces(city);
    }


    @Post()
    addNewPrivateArmyPlace(@Body() armyPlace: ArmyPlaceDTO) {
        return this.armyPlaceService.createNewArmyPlace(armyPlace);
    }

    @Post('/createdoctor')
    createNewDoctor(@Body() body: { doctorId: string }, @Query('armyPlaceId') armyPlaceId: string) {
        return this.armyPlaceService.addDoctor(body.doctorId, armyPlaceId);
    }

    @Post('/operations/times')
    async updateArmyPlaceOperationDurations(@Body() newDuratonObject: { duration: string, id: string }) {
        return await this.armyPlaceService.updateArmyPlaceOperationDurations(newDuratonObject.id, newDuratonObject.duration);
    }

    @Post('/operations/dates')
    async updateArmyPlaceOperationDates(@Body() dates: { beginDate: string, endDate: string, id: string }) {
        return await this.armyPlaceService.updateArmyPlaceOperationDates(dates.id, dates.beginDate, dates.endDate);
    }

    @Delete()
    deleteNewPrivate(@Body() body: { id: string }) {
        if (body.id === undefined) {
            return {
                "message": "Please provide an id",
                status: 0
            }
        }
        // return this.armyPlaceService.deleteArmyPlace(body.id);
        return this.armyPlaceService.deleteAllArmyPlaces();
    }

}
