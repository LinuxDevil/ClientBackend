import { Body, Controller, Get, Post } from '@nestjs/common';
import { CityDTO } from 'src/models/city.model';
import { CitiesService } from 'src/services/cities.service';

@Controller('cities')
export class CitiesController {

    constructor(private citiesService: CitiesService) {}
    
    @Get()
    getcities() {
        return this.citiesService.getCities();
    } 

    @Post()
    createCity(@Body() cityDTO: CityDTO) {
        return this.citiesService.createNewCity(cityDTO);
    }

}
