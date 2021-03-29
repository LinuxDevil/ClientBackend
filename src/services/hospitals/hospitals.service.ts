import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/entities/city.entity';
import { DoctorEntity } from 'src/entities/doctor.entity';
import { HospitalEntity } from 'src/entities/hospital.entity';
import { Constants } from 'src/helpers/Constants';
import { HospitalDTO } from 'src/models/hospital.mode';
import { RegisterationOTP, RegistrationDTO } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectRepository(HospitalEntity)
    private hospitalRepo: Repository<HospitalEntity>,
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
      let oldValue = +newDuration;
      while (newDuration < 60) {
        quarterHours.push(newDuration);
        newDuration = +newDuration + oldValue;
      }
    }
    let times = [];
    let appointmentStartTime = Number.parseInt(date.split(' ')[1]);
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
    var daylist = this.getDaysArray(
      new Date(startDate),
      new Date(endDate),
      timeToAdd,
    );
    daylist
      .map((v) => {
        let thing: string = v.slice(0, 15);
        return thing;
      })
      .join('');
    return daylist;
  }

  //Create new hospital
  async createNewHospital(hospital: HospitalDTO) {
    try {
      if (hospital === null) {
        return new Error('Invalid input');
      }
      let city = await this.cityRepository.findOne({
        where: { id: hospital.cityId },
      });
      if (city === null) return new Error('City id is not found');
      let hospitalEntity = await this.hospitalRepo.create(hospital);
      hospitalEntity.location = city;
      await hospitalEntity.save();
      return {
        hospitalEntity,
        status: new Constants().PREMADE_STATUS.Success_Created,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //Get all general hospitals
  async getAllGeneralHospitals(langId: string) {
    try {
      let hospitals = await this.hospitalRepo.find({
        where: { type: 'general' },
        loadRelationIds: true,
      });
      let hospitalNames = [];
      hospitals.forEach((hospital) => {
        if (langId === '1') hospitalNames.push(hospital.nameEn);
        else hospitalNames.push(hospital.nameAr);
      });
      return {
        hospitals,
        length: hospitals.length,
        hospitalNames,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //Get all private hospitals
  async getAllPrivateHospitals(langId: string) {
    try {
      let hospitals = await this.hospitalRepo.find({
        where: { type: 'private' },
        loadRelationIds: true,
      });
      let hospitalNames = [];
      hospitals.forEach((hospital) => {
        if (langId === '1') hospitalNames.push(hospital.nameEn);
        else hospitalNames.push(hospital.nameAr);
      });
      return {
        hospitals,
        length: hospitals.length,
        hospitalNames,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //Get all private hospitals
  async getAllFilteredPrivateHospitals(cityId: string, langId: string) {
    try {
      let hospitals = await this.hospitalRepo.find({
        where: { type: 'private', location: { id: +cityId } },
        loadRelationIds: true,
      });
      let hospitalNames = [];
      hospitals.forEach((hospital) => {
        if (langId === '1') hospitalNames.push(hospital.nameEn);
        else hospitalNames.push(hospital.nameAr);
      });
      return {
        hospitals,
        length: hospitals.length,
        hospitalNames,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }
  //Get all private hospitals
  async getAllFilteredGeneralHospitals(cityId: string, langId: string) {
    // try {
      let hospitals = await this.hospitalRepo.find({
        where: { type: 'general', location: { id: +cityId } },
        loadRelationIds: true,
      });
      let hospitalNames = [];
      hospitals.forEach((hospital) => {
        if (langId === '1') hospitalNames.push(hospital.nameEn);
        else hospitalNames.push(hospital.nameAr);
      });
      return {
        hospitals,
        length: hospitals.length,
        hospitalNames,
      };
    // } catch (error) {
      // return {
        // status: new Constants().PREMADE_STATUS.Fail_GET,
        // error,
      // };
    // }
  }

  //Get hospital by id
  async getHospitalById(hospitalId: string) {
    try {
      let hospital = await this.hospitalRepo.findOne({
        where: { id: +hospitalId },
        loadRelationIds: true,
      });
      if (hospital == null) {
        return {
          status: 0,
          message: 'There is no hospital with id ' + hospitalId,
        };
      }
      return hospital;
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async deleteHospital(hospitalId: string) {
    try {
      let hospital = await this.hospitalRepo.findOne({
        where: { id: +hospitalId },
      });
      console.log(hospital);
      if (hospital === null || hospital === undefined)
        return {
          status: 0,
          message: 'Hospital not found',
        };
      return await hospital.remove();
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async deleteAllHospitals() {
    try {
      let deleted = await this.hospitalRepo.delete({ type: 'private' });
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

  //TODO: Add doctor to hospital
  async addDoctor(doctorId: string, hospitalId: string) {
    try {
      let hospital = await this.hospitalRepo.findOne({
        where: { id: +hospitalId },
        loadRelationIds: true,
      });
      if (hospital === null || hospital === undefined) {
        return {
          message: "There's no hospital with that id",
          status: 0,
        };
      }
      let doctor = await this.doctorRepo.findOne({ where: { id: +doctorId },
        loadRelationIds: true, });
      if (doctor === null || doctor === undefined) {
        return {
          message: "There's no doctor with that id",
          status: 0,
        };
      }
      if (hospital.doctors === undefined || hospital.doctors === null) {
        hospital.doctors = [];
      }
      await hospital.doctors.push(doctor);
      await hospital.save();
      return {
        hospital,
        status: new Constants().PREMADE_STATUS.Success_Created,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  //TODO: Generate appointment times for hospitals/ operations and everything else
  async updateHospitalOperationDurations(
    hospitalId: string,
    newDuration: string,
  ) {
    try {
      let hospital = await this.hospitalRepo.findOne({
        where: { id: +hospitalId },
        loadRelationIds: true,
      });
      if (hospital === null) {
        return new InternalServerErrorException('Hospital is null');
      }
      if (hospital.shiftDuration === null) {
        hospital.shiftDuration = 8;
      }
      if (hospital.appointmentTimes === null) {
        hospital.appointmentTimes = [];
      }
      if (
        hospital.appointmentDates === null ||
        hospital.appointmentDates.length < 1
      ) {
        hospital.appointmentDates = [];
        let date = new Date();
        hospital.appointmentDates.push(
          date.getDate() +
            '/' +
            date.getMonth() +
            '/' +
            date.getFullYear() +
            ' 08:00:00',
        );
        hospital.appointmentDates.push(
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
        hospital.appointmentDurations === null ||
        hospital.appointmentDurations.length < 1
      ) {
        hospital.appointmentDurations = [];
        hospital.appointmentDurations.push('02:00');
      }
      hospital.duration = newDuration;
      let appointmens = [];
      hospital.appointmentDates.forEach((appointment) => {
        appointmens.push(
          ...this.getTimes(appointment, newDuration, hospital.shiftDuration),
        );
      });
      hospital.appointmentTimes = appointmens;
      await hospital.save();
      return {
        hospital,
        status: new Constants().PREMADE_STATUS.SUCCESS_UPDATED,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async updateHospitalOperationDates(
    hospitalId: string,
    startDate: string,
    endDate: string,
  ) {
    try {
      let hospital = await this.hospitalRepo.findOne({
        where: { id: +hospitalId },
        loadRelationIds: true,
      });
      if (hospital === null) {
        return new InternalServerErrorException('Hospital Entity is null');
      }
      hospital.appointmentDates = this.getDaysList(
        startDate,
        endDate,
        hospital.appointmentDurations,
      );
      await hospital.save();
      return await this.updateHospitalOperationDurations(
        hospitalId,
        hospital.duration,
      );
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }
}
