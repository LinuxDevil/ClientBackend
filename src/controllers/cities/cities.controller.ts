import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CityDTO } from 'src/models/city.model';
import { CitiesService } from 'src/services/cities.service';

@Controller('cities')
export class CitiesController {

    constructor(private citiesService: CitiesService) {}
    
    @Get()
    getcities(@Query('lang') lang: string) {
        return this.citiesService.getCities(lang);
    } 

    @Post()
    createCity(@Body() cityDTO: CityDTO) {
        return this.citiesService.createNewCity(cityDTO);
    }

}
