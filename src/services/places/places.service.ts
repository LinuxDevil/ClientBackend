import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/entities/city.entity';
import { DoctorEntity } from 'src/entities/doctor.entity';
import { PlaceEntity } from 'src/entities/place.entity';
import { Constants } from 'src/helpers/Constants';
import { PlaceDTO } from 'src/models/place.model';
import { Repository } from 'typeorm';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(PlaceEntity) private placeRepo: Repository<PlaceEntity>,
    @InjectRepository(CityEntity)
    private cityRepository: Repository<CityEntity>,
    @InjectRepository(DoctorEntity)
    private doctorRepo: Repository<DoctorEntity>,
  ) {}

  getTimes(date, newDuration, shift) {
    let quarterHours = ['00'];
    if (newDuration === '0') {
      quarterHours = ['00', '15', '30', '45'];
    } else {
      const oldValue = +newDuration;
      while (newDuration < 60) {
        quarterHours.push(newDuration);
        newDuration = +newDuration + oldValue;
      }
    }
    const times = [];
    const appointmentStartTime = Number.parseInt(date.split(' ')[1]);
    for (let i = appointmentStartTime; i < appointmentStartTime + shift; i++) {
      for (let j = 0; j < quarterHours.length; j++) {
        let time = i + ':' + quarterHours[j];
        if (i < 10) {
          time = '0' + time;
        }
        times.push(date.split(' ')[0] + ' ' + time);
      }
    }
    return times;
  }
  getDaysArray(start, end, timeToAdd) {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(
        new Date(dt).getDate() +
          '/' +
          (new Date(dt).getMonth() + 1) +
          '/' +
          new Date(dt).getFullYear() +
          ' ' +
          timeToAdd,
      );
    }
    return arr;
  }
  getDaysList(startDate, endDate, timeToAdd) {
    const daylist = this.getDaysArray(
      new Date(startDate),
      new Date(endDate),
      timeToAdd,
    );
    daylist
      .map((v) => {
        const thing: string = v.slice(0, 15);
        return thing;
      })
      .join('');
    return daylist;
  }

  //Create new place
  async createNewPlace(place: PlaceDTO) {
    try {
      if (place === null) {
        return new Error('Invalid input');
      }
      const city = await this.cityRepository.findOne({
        where: { id: place.cityId },
        loadRelationIds: true,
      });
      if (city === null) return new Error('City id is not found');
      const placeEntity = await this.placeRepo.create(place);
      placeEntity.location = city;
      await placeEntity.save();
      return {
        placeEntity,
        status: new Constants().PREMADE_STATUS.Success_Created,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //Get all private places
  async getAllPlaces(type: string) {
    try {
      const places = await this.placeRepo.find({
        where: { type: type },
        loadRelationIds: true,
      });
      return {
        type,
        places,
        length: places.length,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //Get all private placess
  async getAllFilteredPlaces(cityId: string, type: string) {
    try {
      const places = await this.placeRepo.find({
        where: { type: type, location: { id: +cityId } },
        loadRelationIds: true,
      });
      return {
        type,
        cityId,
        places,
        length: places.length,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //Get place by id
  async getPlaceById(placeId: string) {
    try {
      const place = await this.placeRepo.findOne({ where: { id: +placeId },
        loadRelationIds: true, });
      if (place == null) {
        return {
          status: 0,
          message: 'There is no place with id ' + placeId,
        };
      }
      return { place, status: new Constants().PREMADE_STATUS.SUCCESS_GET };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async deletePlace(placeId: string) {
    try {
      const place = await this.placeRepo.findOne({ where: { id: +placeId },
        loadRelationIds: true, });
      console.log(place);
      if (place === null || place === undefined)
        return {
          status: 0,
          message: 'Place not found',
        };
      const deleted = await place.remove();
      return {
        deleted,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async deleteAllPlaces() {
    try {
      const places = await this.placeRepo.delete({ type: 'Labs' });
      return {
        deleted: places,
        status: new Constants().PREMADE_STATUS.SUCCESS_DELETED,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //TODO: Add doctor to place
  async addDoctor(doctorId: string, placeId: string) {
    try {
      const place = await this.placeRepo.findOne({ where: { id: +placeId },
        loadRelationIds: true, });
      if (place === null || place === undefined) {
        return {
          message: "There's no place with that id",
          status: 0,
        };
      }
      const doctor = await this.doctorRepo.findOne({
        where: { id: +doctorId },
        loadRelationIds: true,
      });
      if (doctor === null || doctor === undefined) {
        return {
          message: "There's no doctor with that id",
          status: 0,
        };
      }
      if (place.doctors === undefined || place.doctors === null) {
        place.doctors = [];
      }
      await place.doctors.push(doctor);
      await place.save();
      return { place, status: new Constants().PREMADE_STATUS.Success_Created };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //TODO: Generate appointment times for places/ operations and everything else
  async updatePlaceOperationDurations(placeId: string, newDuration: string) {
    try {
      const place = await this.placeRepo.findOne({ where: { id: +placeId },
        loadRelationIds: true, });
      if (place === null) {
        return new InternalServerErrorException('Place is null');
      }
      if (place.shiftDuration === null) {
        place.shiftDuration = 8;
      }
      if (place.appointmentTimes === null) {
        place.appointmentTimes = [];
      }
      if (
        place.appointmentDates === null ||
        place.appointmentDates.length < 1
      ) {
        place.appointmentDates = [];
        const date = new Date();
        place.appointmentDates.push(
          date.getDate() +
            '/' +
            date.getMonth() +
            '/' +
            date.getFullYear() +
            ' 08:00:00',
        );
        place.appointmentDates.push(
          date.getDate() +
            1 +
            '/' +
            date.getMonth() +
            '/' +
            date.getFullYear() +
            ' 14:00:00',
        );
      }
      if (
        place.appointmentDurations === null ||
        place.appointmentDurations.length < 1
      ) {
        place.appointmentDurations = [];
        place.appointmentDurations.push('02:00');
      }
      place.duration = newDuration;
      const appointmens = [];
      place.appointmentDates.forEach((appointment) => {
        appointmens.push(
          ...this.getTimes(appointment, newDuration, place.shiftDuration),
        );
      });
      place.appointmentTimes = appointmens;
      await place.save();
      return { place, status: new Constants().PREMADE_STATUS.SUCCESS_UPDATED };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async updatePlaceOperationDates(
    placeId: string,
    startDate: string,
    endDate: string,
  ) {
    try {
      const place = await this.placeRepo.findOne({ where: { id: +placeId },
        loadRelationIds: true, });
      if (place === null) {
        return new InternalServerErrorException('Place Entity is null');
      }
      place.appointmentDates = this.getDaysList(
        startDate,
        endDate,
        place.appointmentDurations,
      );
      await place.save();
      return await this.updatePlaceOperationDurations(placeId, place.duration);
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }
}
