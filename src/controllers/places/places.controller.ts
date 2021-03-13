import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { PlaceDTO } from 'src/models/place.model';
import { PlacesService } from 'src/services/places/places.service';

@Controller('places')
export class PlacesController {

    constructor(private readonly placeService: PlacesService) {}

    @Get('/private')
    getAllPlaces(@Query('type') type: string) {
        return this.placeService.getAllPlaces(type);
    }

    @Get('/private/filter')
    getFilteredPrivatePlaces(@Query('city') city: string, @Query('type') type: string) {
        return this.placeService.getAllFilteredPlaces(city, type);
    }

    @Post()
    addNewPrivatePlace(@Body() place: PlaceDTO) {
        return this.placeService.createNewPlace(place);
    }

    @Post('/createdoctor')
    createNewDoctor(@Body() body: {doctorId: string}, @Query('placeId') placeId: string) {
        return this.placeService.addDoctor(body.doctorId, placeId);
    }

    @Post('/operations/times')
    async updatePlaceOperationDurations(@Body() newDuratonObject: {duration: string, id: string}) {
        return await this.placeService.updatePlaceOperationDurations(newDuratonObject.id, newDuratonObject.duration);
    }

    @Post('/operations/dates')
    async updatePlaceOperationDates(@Body() dates: {beginDate: string, endDate: string, id: string}) {
        return await this.placeService.updatePlaceOperationDates(dates.id, dates.beginDate, dates.endDate);
    }

    @Delete()
    deleteNewPrivate(@Body() body: { id: string }) {
        if (body.id === undefined) {
            return {
                "message": "Please provide an id",
                status: 0
            }
        }
        // return this.placeService.deletePlace(body.id);
        return this.placeService.deleteAllPlaces();
    }

}
