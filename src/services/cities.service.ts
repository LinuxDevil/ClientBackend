import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/entities/city.entity';
import { CityDTO } from 'src/models/city.model';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {

    constructor(
        @InjectRepository(CityEntity) private citiesRepo: Repository<CityEntity>
    ) {}

    async createNewCity(cityDTO: CityDTO) {
        let foundCity = await this.citiesRepo.findOne({where: {nameAr: cityDTO.nameAr}});
        if (foundCity !== null || foundCity !== undefined) {
            return {
                message: "This city is found!",
                foundCity
            }
        }
        let city = await this.citiesRepo.create(cityDTO);
        if (city === null) return {
            message: "City is null",
            status: 0
        }
        await city.save();
        return {city};
    }

    async getCities(lang: string) {
        let cities = await this.citiesRepo.find();
        let uniqeCities = [];
        if (lang === "1") {
            uniqeCities = [...new Set(cities.map(item => item.nameEn))]
        } else {
            uniqeCities = [...new Set(cities.map(item => item.nameAr))]
        }
        return  {
            cities: uniqeCities,
            length: uniqeCities.length
        }
    }

}
