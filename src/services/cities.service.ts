import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/entities/city.entity';
import { Constants } from 'src/helpers/Constants';
import { CityDTO } from 'src/models/city.model';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CityEntity) private citiesRepo: Repository<CityEntity>,
  ) {}

  async createNewCity(cityDTO: CityDTO) {
    try {
      let foundCity = await this.citiesRepo.findOne({
        where: { nameAr: cityDTO.nameAr }
      });
      if (foundCity !== null || foundCity !== undefined) {
        return {
          message: 'This city is found!',
          foundCity,
        };
      }
      let city = await this.citiesRepo.create(cityDTO);
      if (city === null)
        return {
          message: 'City is null',
          status: 0,
        };
      await city.save();
      return { city, status: new Constants().PREMADE_STATUS.Success_Created };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async getCities(lang: string) {
    try {
      let cities = await this.citiesRepo.find();
      let uniqeCities = [];
      if (lang === '1') {
        uniqeCities = [...new Set(cities.map((item) => item.nameEn))];
      } else {
        uniqeCities = [...new Set(cities.map((item) => item.nameAr))];
      }
      return {
        cities: uniqeCities,
        length: uniqeCities.length,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }
}
