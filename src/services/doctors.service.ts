import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/entities/doctor.entity';
import { InsuranceCompanyEntity } from 'src/entities/insurance.entity';
import { Constants } from 'src/helpers/Constants';
import { UpdateDoctorDTO } from 'src/models/user.model';
import { Repository } from 'typeorm';
import '../helpers/DateExt';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepo: Repository<DoctorEntity>,
    @InjectRepository(InsuranceCompanyEntity)
    private insuranceRepo: Repository<InsuranceCompanyEntity>,
  ) {}

  async getAllDoctors() {
    const doctors = await this.doctorRepo.find({
        loadRelationIds: true,
    });
    return { doctors };
  }

  async getDoctorById(doctorId: string) {
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { id: +doctorId },
        loadRelationIds: true,
      });
      return { doctor };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

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
  async updateAppointmentDuration(upDoctor: DoctorEntity, newDuration: string) {
    try {
      const doctor = upDoctor;
      if (doctor === null) {
        return new InternalServerErrorException('Doctor Entity is null');
      }
      if (doctor.shiftDuration === null) {
        doctor.shiftDuration = 8;
      }
      if (doctor.appointmentTimes === null) {
        doctor.appointmentTimes = [];
      }
      if (
        doctor.appointmentDates === null ||
        doctor.appointmentDates.length < 1
      ) {
        doctor.appointmentDates = [];
        const date = new Date();
        doctor.appointmentDates.push(
          date.getDate() +
            '/' +
            date.getMonth() +
            '/' +
            date.getFullYear() +
            ' 08:00:00',
        );
        doctor.appointmentDates.push(
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
        doctor.appointmentDurations === null ||
        doctor.appointmentDurations.length < 1
      ) {
        doctor.appointmentDurations = [];
        doctor.appointmentDurations.push('02:00');
      }
      doctor.duration = newDuration;
      const appointmens = [];
      doctor.appointmentDates.forEach((appointment) => {
        appointmens.push(
          ...this.getTimes(appointment, newDuration, doctor.shiftDuration),
        );
      });
      doctor.appointmentTimes = appointmens;
      await doctor.save();
      upDoctor = doctor;
      await upDoctor.save();
      return {
        doctor: upDoctor,
        status: new Constants().PREMADE_STATUS.SUCCESS_UPDATED,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async updateDoctor(username: string, data: UpdateDoctorDTO) {
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { username: '+'.concat(username) },
        loadRelationIds: true,
      });
      if (doctor === undefined || doctor === null) {
        return {
          status: 0,
          message: 'There is no doctor with username' + username,
        };
      }
      if (data.insuranceCompanyId) {
        const insurance = await this.insuranceRepo.findOne({
          where: { id: data.insuranceCompanyId },
          loadRelationIds: true,
        });
        if (insurance === null || insurance === undefined) {
          return {
            status: 0,
            message: 'There is no insurance with id' + data.insuranceCompanyId,
          };
        }
        doctor.insuranceCompany = insurance;
        await doctor.save();
        delete data.insuranceCompanyId;
      }
      await this.doctorRepo.update({ username: '+'.concat(username) }, data);
      const doctorUp = await this.doctorRepo.findOne({
        where: { username: '+'.concat(username) },
      });
      return {
        doctor: doctorUp,
        status: new Constants().PREMADE_STATUS.SUCCESS_UPDATED,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async updateAppointmentDates(
    upDoctor: DoctorEntity,
    startDate: string,
    endDate: string,
  ) {
    try {
      const doctor = upDoctor;
      if (doctor === null) {
        return new InternalServerErrorException('Doctor Entity is null');
      }
      doctor.appointmentDates = this.getDaysList(
        startDate,
        endDate,
        doctor.appointmentDurations,
      );
      await doctor.save();
      return await this.updateAppointmentDuration(doctor, doctor.duration);
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async deleteDoctorById(doctorId: string) {
    try {
      const deleted = await this.doctorRepo.delete({ id: +doctorId });
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
}
