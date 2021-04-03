import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/entities/city.entity';
import { DoctorEntity } from 'src/entities/doctor.entity';
import { DoctorPlaceEntity } from 'src/entities/doctorplace.entity';
import { Constants } from 'src/helpers/Constants';
import { DoctorPlaceDTO } from 'src/models/doctorplace.model';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorplacesService {
  constructor(
    @InjectRepository(DoctorPlaceEntity)
    private doctorPlaceRepo: Repository<DoctorPlaceEntity>,
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

  //Create new doctorPlace
  async createNewDoctorPlace(doctorPlace: DoctorPlaceDTO) {
    try {
      if (doctorPlace === null) {
        return new Error('Invalid input');
      }
      const city = await this.cityRepository.findOne({
        where: { id: doctorPlace.cityId },
      });
      if (city === null) return new Error('City id is not found');
      const doctorPlaceEntity = await this.doctorPlaceRepo.create(doctorPlace);
      doctorPlaceEntity.location = city;
      await doctorPlaceEntity.save();
      return {
        doctorPlaceEntity,
        status: new Constants().PREMADE_STATUS.Success_Created,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //Get all general doctorPlaces
  async getAllGeneralDoctorPlaces() {
    try {
      const doctorPlaces = await this.doctorPlaceRepo.find();
      return {
        doctorPlaces,
        length: doctorPlaces.length,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //Get all private doctorPlaces
  async getAllPrivateDoctorPlaces() {
    try {
      const doctorPlaces = await this.doctorPlaceRepo.find({
        where: { type: 'private' },          relations: ['location', 'doctors'],

      });
      return {
        doctorPlaces,
        length: doctorPlaces.length,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //Get all private doctorPlaces
  async getAllFilteredPrivateDoctorPlaces(cityId: string) {
    try {
      const doctorPlaces = await this.doctorPlaceRepo.find({
        where: { type: 'private', location: { id: +cityId } },         relations: ['location', 'doctors'],

      });
      return {
        doctorPlaces,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }
  //Get all private doctorPlaces
  async getAllFilteredGeneralDoctorPlaces(cityId: string) {
    try {
      const doctorPlaces = await this.doctorPlaceRepo.find({
        where: { type: 'general', location: { id: +cityId } },        relations: ['location', 'doctors'],

      });
      return {
        doctorPlaces,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //Get doctorPlace by id
  async getDoctorPlaceById(doctorPlaceId: string) {
    try {
      const doctorPlace = await this.doctorPlaceRepo.findOne({
        where: { id: +doctorPlaceId },        relations: ['location', 'doctors'],

      });
      if (doctorPlace == null) {
        return {
          status: 0,
          message: 'There is no doctorPlace with id ' + doctorPlaceId,
        };
      }
      return {
        doctorPlace,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async deleteDoctorPlace(doctorPlaceId: string) {
    try {
      const doctorPlace = await this.doctorPlaceRepo.findOne({
        where: { id: +doctorPlaceId },
      });
      console.log(doctorPlace);
      if (doctorPlace === null || doctorPlace === undefined)
        return {
          status: 0,
          message: 'DoctorPlace not found',
        };
      let deleted = await doctorPlace.remove();
      return {
        deleted,
        status: new Constants().PREMADE_STATUS.SUCCESS_DELETED,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async deleteAllDoctorPlaces() {
    try {
      let deleted = await this.doctorPlaceRepo.delete({ type: 'private' });
      return {
        deleted,
        status: new Constants().PREMADE_STATUS.SUCCESS_DELETED,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //TODO: Add doctor to doctorPlace
  async addDoctor(doctorId: string, doctorPlaceId: string) {
    try {
      const doctorPlace = await this.doctorPlaceRepo.findOne({
        where: { id: +doctorPlaceId },
      });
      if (doctorPlace === null || doctorPlace === undefined) {
        return {
          message: "There's no doctorPlace with that id",
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
      if (doctorPlace.doctors === undefined || doctorPlace.doctors === null) {
        doctorPlace.doctors = [];
      }
      await doctorPlace.doctors.push(doctor);
      await doctorPlace.save();
      return { doctorPlace };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //TODO: Generate appointment times for doctorPlaces/ operations and everything else
  async updateDoctorPlaceOperationDurations(
    doctorPlaceId: string,
    newDuration: string,
  ) {
    try {
      const doctorPlace = await this.doctorPlaceRepo.findOne({
        where: { id: +doctorPlaceId },
      });
      if (doctorPlace === null) {
        return new InternalServerErrorException('DoctorPlace is null');
      }
      if (doctorPlace.shiftDuration === null) {
        doctorPlace.shiftDuration = 8;
      }
      if (doctorPlace.appointmentTimes === null) {
        doctorPlace.appointmentTimes = [];
      }
      if (
        doctorPlace.appointmentDates === null ||
        doctorPlace.appointmentDates.length < 1
      ) {
        doctorPlace.appointmentDates = [];
        const date = new Date();
        doctorPlace.appointmentDates.push(
          date.getDate() +
            '/' +
            date.getMonth() +
            '/' +
            date.getFullYear() +
            ' 08:00:00',
        );
        doctorPlace.appointmentDates.push(
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
        doctorPlace.appointmentDurations === null ||
        doctorPlace.appointmentDurations.length < 1
      ) {
        doctorPlace.appointmentDurations = [];
        doctorPlace.appointmentDurations.push('02:00');
      }
      doctorPlace.duration = newDuration;
      const appointmens = [];
      doctorPlace.appointmentDates.forEach((appointment) => {
        appointmens.push(
          ...this.getTimes(appointment, newDuration, doctorPlace.shiftDuration),
        );
      });
      doctorPlace.appointmentTimes = appointmens;
      await doctorPlace.save();
      return { doctorPlace };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async updateDoctorPlaceOperationDates(
    doctorPlaceId: string,
    startDate: string,
    endDate: string,
  ) {
    try {
      const doctorPlace = await this.doctorPlaceRepo.findOne({
        where: { id: +doctorPlaceId },
      });
      if (doctorPlace === null) {
        return new InternalServerErrorException('DoctorPlace Entity is null');
      }
      doctorPlace.appointmentDates = this.getDaysList(
        startDate,
        endDate,
        doctorPlace.appointmentDurations,
      );
      await doctorPlace.save();
      return await this.updateDoctorPlaceOperationDurations(
        doctorPlaceId,
        doctorPlace.duration,
      );
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }
}
