import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArmyPlaceEntity } from 'src/entities/armyplaces.entity';
import { CityEntity } from 'src/entities/city.entity';
import { DoctorEntity } from 'src/entities/doctor.entity';
import { Constants } from 'src/helpers/Constants';
import { ArmyPlaceDTO } from 'src/models/armyplace.model';
import { Repository } from 'typeorm';

@Injectable()
export class ArmyplacesService {
  constructor(
    @InjectRepository(ArmyPlaceEntity)
    private armyPlaceRepo: Repository<ArmyPlaceEntity>,
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

  //Create new armyPlace
  async createNewArmyPlace(armyPlace: ArmyPlaceDTO) {
    try {
      if (armyPlace === null) {
        return new Error('Invalid input');
      }
      const city = await this.cityRepository.findOne({
        where: { id: armyPlace.cityId },
      });
      if (city === null) return new Error('City id is not found');
      const armyPlaceEntity = await this.armyPlaceRepo.create(armyPlace);
      armyPlaceEntity.location = city;
      await armyPlaceEntity.save();
      return {
        armyPlaceEntity,
        status: new Constants().PREMADE_STATUS.Success_Created,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //Get all general armyPlaces
  async getAllGeneralArmyPlaces() {
    try {
      const armyPlaces = await this.armyPlaceRepo.find({
        relations: ['location', 'doctors'],      });
      return {
        armyPlaces,
        length: armyPlaces.length,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //Get all private armyPlaces
  async getAllPrivateArmyPlaces() {
    try {
      const armyPlaces = await this.armyPlaceRepo.find({
        where: { type: 'private' },
        relations: ['location', 'doctors'],      });
      return {
        armyPlaces,
        length: armyPlaces.length,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //Get all private armyPlaces
  async getAllFilteredPrivateArmyPlaces(cityId: string) {
    try {
      const armyPlaces = await this.armyPlaceRepo.find({
        where: { type: 'private', location: { id: +cityId } },
        relations: ['location', 'doctors'],      });
      return {
        armyPlaces,
        length: armyPlaces.length,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }
  //Get all private armyPlaces
  async getAllFilteredGeneralArmyPlaces(cityId: string) {
    try {
      const armyPlaces = await this.armyPlaceRepo.find({
        where: { type: 'general', location: { id: +cityId } },
        relations: ['location', 'doctors'],      });
      return {
        armyPlaces,
        length: armyPlaces.length,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //Get armyPlace by id
  async getArmyPlaceById(armyPlaceId: string) {
    try {
      const armyPlace = await this.armyPlaceRepo.findOne({
        where: { id: +armyPlaceId },
        relations: ['location', 'doctors'],      });
      if (armyPlace == null) {
        return {
          status: 0,
          message: 'There is no armyPlace with id ' + armyPlaceId,
        };
      }
      return { armyPlace, status: new Constants().PREMADE_STATUS.SUCCESS_GET };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async deleteArmyPlace(armyPlaceId: string) {
    try {
      const armyPlace = await this.armyPlaceRepo.findOne({
        where: { id: +armyPlaceId },
        relations: ['location', 'doctors'],
      });
      console.log(armyPlace);
      if (armyPlace === null || armyPlace === undefined)
        return {
          status: 0,
          message: 'ArmyPlace not found',
        };
      const removed = await armyPlace.remove();
      return {
        deleted: removed,
        status: new Constants().PREMADE_STATUS.SUCCESS_DELETED,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async deleteAllArmyPlaces(type: string) {
    try {
      const removed = await this.armyPlaceRepo.delete({ type });
      return {
        deleted: removed,
        status: new Constants().PREMADE_STATUS.SUCCESS_DELETED,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //TODO: Add doctor to armyPlace
  async addDoctor(doctorId: string, armyPlaceId: string) {
    try {
      const armyPlace = await this.armyPlaceRepo.findOne({
        where: { id: +armyPlaceId },
        relations: ['location', 'doctors'],
      });
      if (armyPlace === null || armyPlace === undefined) {
        return {
          message: "There's no armyPlace with that id",
          status: 0,
        };
      }
      const doctor = await this.doctorRepo.findOne({
        where: { id: +doctorId },
      });
      if (doctor === null || doctor === undefined) {
        return {
          message: "There's no doctor with that id",
          status: 0,
        };
      }
      if (armyPlace.doctors === undefined || armyPlace.doctors === null) {
        armyPlace.doctors = [];
      }
      await armyPlace.doctors.push(doctor);
      await armyPlace.save();
      return {
        armyPlace,
        status: new Constants().PREMADE_STATUS.Success_Created,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //TODO: Generate appointment times for armyPlaces/ operations and everything else
  async updateArmyPlaceOperationDurations(
    armyPlaceId: string,
    newDuration: string,
  ) {
    try {
      const armyPlace = await this.armyPlaceRepo.findOne({
        where: { id: +armyPlaceId },
        relations: ['location', 'doctors'],      });
      if (armyPlace === null) {
        return new InternalServerErrorException('ArmyPlace is null');
      }
      if (armyPlace.shiftDuration === null) {
        armyPlace.shiftDuration = 8;
      }
      if (armyPlace.appointmentTimes === null) {
        armyPlace.appointmentTimes = [];
      }
      if (
        armyPlace.appointmentDates === null ||
        armyPlace.appointmentDates.length < 1
      ) {
        armyPlace.appointmentDates = [];
        const date = new Date();
        armyPlace.appointmentDates.push(
          date.getDate() +
            '/' +
            date.getMonth() +
            '/' +
            date.getFullYear() +
            ' 08:00:00',
        );
        armyPlace.appointmentDates.push(
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
        armyPlace.appointmentDurations === null ||
        armyPlace.appointmentDurations.length < 1
      ) {
        armyPlace.appointmentDurations = [];
        armyPlace.appointmentDurations.push('02:00');
      }
      armyPlace.duration = newDuration;
      const appointmens = [];
      armyPlace.appointmentDates.forEach((appointment) => {
        appointmens.push(
          ...this.getTimes(appointment, newDuration, armyPlace.shiftDuration),
        );
      });
      armyPlace.appointmentTimes = appointmens;
      await armyPlace.save();
      return {
        armyPlace,
        status: new Constants().PREMADE_STATUS.SUCCESS_UPDATED,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async updateArmyPlaceOperationDates(
    armyPlaceId: string,
    startDate: string,
    endDate: string,
  ) {
    try {
      const armyPlace = await this.armyPlaceRepo.findOne({
        where: { id: +armyPlaceId },
        relations: ['location', 'doctors'],      });
      if (armyPlace === null) {
        return new InternalServerErrorException('ArmyPlace Entity is null');
      }
      armyPlace.appointmentDates = this.getDaysList(
        startDate,
        endDate,
        armyPlace.appointmentDurations,
      );
      await armyPlace.save();
      return await this.updateArmyPlaceOperationDurations(
        armyPlaceId,
        armyPlace.duration,
      );
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }
}
