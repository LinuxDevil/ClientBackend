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
        let city = await this.citiesRepo.create(cityDTO);
        if (city === null) return {
            message: "City is null",
            status: 0
        }
        await city.save();
        return city;
    }

    async getCities() {
        return await this.citiesRepo.find();
    }

}
