import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from 'src/entities/appointment.entity';
import { ArmyPlaceEntity } from 'src/entities/armyplaces.entity';
import { DoctorEntity } from 'src/entities/doctor.entity';
import { DoctorPlaceEntity } from 'src/entities/doctorplace.entity';
import { HospitalEntity } from 'src/entities/hospital.entity';
import { PlaceEntity } from 'src/entities/place.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Constants } from 'src/helpers/Constants';
import { AppointmentDTO } from 'src/models/appointment.model';
import { HospitalDTO } from 'src/models/hospital.mode';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private appointmentRepo: Repository<AppointmentEntity>,
    @InjectRepository(DoctorEntity)
    private doctorRepo: Repository<DoctorEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(PlaceEntity) private placeRepo: Repository<PlaceEntity>,
    @InjectRepository(HospitalEntity)
    private hospitalRepo: Repository<HospitalEntity>,
    @InjectRepository(DoctorPlaceEntity)
    private doctorPlaceRepo: Repository<DoctorPlaceEntity>,
    @InjectRepository(ArmyPlaceEntity)
    private armyPlaceRepo: Repository<ArmyPlaceEntity>,
  ) {}

  async findUser(username: string, user?: UserEntity): Promise<UserEntity> {
    console.log('findUser');
    return (await this.userRepo.findOne({ where: { username } })).toProfile(
      user,
    );
  }

  async findDoctor(username: string, doctor?: DoctorEntity) {
    try {
      return (await this.doctorRepo.findOne({ where: { username },
        loadRelationIds: true, })).toProfile(
        doctor,
      );
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async addAppointment(appointment: AppointmentDTO) {
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { username: appointment.doctor },
        loadRelationIds: true,
      });
      const user = await this.userRepo.findOne({
        where: { username: appointment.user },
        loadRelationIds: true,
      });
      const place = await this.placeRepo.findOne({
        where: { placeName: appointment.place },
        loadRelationIds: true,
      });
      const appointmentEntity: AppointmentEntity = new AppointmentEntity();
      appointmentEntity.user = user;
      const index = doctor.appointmentTimes.indexOf(appointment.time);
      if (index === -1) {
        return {
          status: 0,
          message: 'there was no time',
        };
      }
      doctor.appointmentTimes.splice(index, 1);
      await doctor.save();
      appointmentEntity.doctor = doctor;
      appointmentEntity.place = place;
      const date = appointment.date.split('/');
      const convertedDate = date[1] + '/' + date[0] + '/' + date[2];
      appointmentEntity.date = new Date(convertedDate);
      appointmentEntity.time = appointment.time;
      appointmentEntity.rate = 0;
      appointmentEntity.location = appointment.location;
      appointmentEntity.inProgress = true;
      appointmentEntity.shift = appointment.shift;
      await this.appointmentRepo.create(appointmentEntity);
      await appointmentEntity.save();
      return {
        appointmentEntity,
        status: new Constants().PREMADE_STATUS.Success_Created,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  /**
   * when the user clicks on add appointment.
   * External for example, he get's an appointment inside the hospital.
   * So here, update the hospital appointemnts to that, with the corresponding type.
   */
  async addHospitalAppointment(appointment: AppointmentDTO) {
    try {
      const hospital = await this.hospitalRepo.findOne({
        where: { id: +appointment.hospitalId },
        loadRelationIds: true,
      });
      const user = await this.userRepo.findOne({
        where: { username: appointment.user },
        loadRelationIds: true,
      });
      const place = await this.placeRepo.findOne({
        where: { placeName: appointment.place },
        loadRelationIds: true,
      });
      const appointmentEntity: AppointmentEntity = new AppointmentEntity();
      appointmentEntity.user = user;
      const index = hospital.appointmentTimes.indexOf(appointment.time);
      if (index === -1) {
        return {
          status: new Constants().PREMADE_STATUS.Fail_Created,
          message: 'there was no time',
        };
      }
      hospital.appointmentTimes.splice(index, 1);
      await hospital.save();
      appointmentEntity.hospital = hospital;
      appointmentEntity.place = place;
      const date = appointment.date.split('/');
      const convertedDate = date[1] + '/' + date[0] + '/' + date[2];
      appointmentEntity.date = new Date(convertedDate);
      appointmentEntity.time = appointment.time;
      appointmentEntity.rate = 0;
      appointmentEntity.location = appointment.location;
      appointmentEntity.inProgress = true;
      appointmentEntity.shift = appointment.shift;
      await this.appointmentRepo.create(appointmentEntity);
      await appointmentEntity.save();
      return {
        appointmentEntity,
        status: new Constants().PREMADE_STATUS.SUCCESS_UPDATED,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async addPlacesAppointment(appointment: AppointmentDTO) {
    try {
      const user = await this.userRepo.findOne({
        where: { username: appointment.user },
        loadRelationIds: true,
      });
      const place = await this.placeRepo.findOne({
        where: { id: +appointment.place },
        loadRelationIds: true,
      });
      const appointmentEntity: AppointmentEntity = new AppointmentEntity();
      appointmentEntity.user = user;
      const index = place.appointmentTimes.indexOf(appointment.time);
      if (index === -1) {
        return {
          status: new Constants().PREMADE_STATUS.Fail_Created,
          message: 'there was no time',
        };
      }
      place.appointmentTimes.splice(index, 1);
      await place.save();
      appointmentEntity.place = place;
      const date = appointment.date.split('/');
      const convertedDate = date[1] + '/' + date[0] + '/' + date[2];
      appointmentEntity.date = new Date(convertedDate);
      appointmentEntity.time = appointment.time;
      appointmentEntity.rate = 0;
      appointmentEntity.location = appointment.location;
      appointmentEntity.inProgress = true;
      appointmentEntity.shift = appointment.shift;
      await this.appointmentRepo.create(appointmentEntity);
      await appointmentEntity.save();
      return {
        appointmentEntity,
        status: new Constants().PREMADE_STATUS.Success_Created,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async addDoctorPlaceAppointment(appointment: AppointmentDTO) {
    try {
      const doctorPlacce = await this.doctorPlaceRepo.findOne({
        where: { id: +appointment.place },
        loadRelationIds: true,
      });
      const user = await this.userRepo.findOne({
        where: { username: appointment.user },
        loadRelationIds: true,
      });
      const appointmentEntity: AppointmentEntity = new AppointmentEntity();
      appointmentEntity.user = user;
      const index = doctorPlacce.appointmentTimes.indexOf(appointment.time);
      if (index === -1) {
        return {
          status: 0,
          message: new Constants().PREMADE_STATUS.Fail_Created,
        };
      }
      doctorPlacce.appointmentTimes.splice(index, 1);
      await doctorPlacce.save();
      appointmentEntity.doctorPlaces = doctorPlacce;
      const date = appointment.date.split('/');
      const convertedDate = date[1] + '/' + date[0] + '/' + date[2];
      appointmentEntity.date = new Date(convertedDate);
      appointmentEntity.time = appointment.time;
      appointmentEntity.rate = 0;
      appointmentEntity.location = appointment.location;
      appointmentEntity.inProgress = true;
      appointmentEntity.shift = appointment.shift;
      await this.appointmentRepo.create(appointmentEntity);
      await appointmentEntity.save();
      return {
        appointmentEntity,
        status: new Constants().PREMADE_STATUS.Success_Created,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async addArmyPlaceAppointment(appointment: AppointmentDTO) {
    try {
      const armyPlace = await this.armyPlaceRepo.findOne({
        where: { id: +appointment.place },
        loadRelationIds: true,
      });
      const user = await this.userRepo.findOne({
        where: { username: appointment.user },
        loadRelationIds: true,
      });
      const appointmentEntity: AppointmentEntity = new AppointmentEntity();
      appointmentEntity.user = user;
      const index = armyPlace.appointmentTimes.indexOf(appointment.time);
      if (index === -1) {
        return {
          status: 0,
          message: 'there was no time',
        };
      }
      armyPlace.appointmentTimes.splice(index, 1);
      await armyPlace.save();
      appointmentEntity.armyPlaces = armyPlace;
      const date = appointment.date.split('/');
      const convertedDate = date[1] + '/' + date[0] + '/' + date[2];
      appointmentEntity.date = new Date(convertedDate);
      appointmentEntity.time = appointment.time;
      appointmentEntity.rate = 0;
      appointmentEntity.location = appointment.location;
      appointmentEntity.inProgress = true;
      appointmentEntity.shift = appointment.shift;
      await this.appointmentRepo.create(appointmentEntity);
      await appointmentEntity.save();
      return {
        appointmentEntity,
        status: new Constants().PREMADE_STATUS.Success_Created,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async deleteAppointment(appointment: string) {
    const appointmentEntity = await this.appointmentRepo.findOne({
      where: { id: appointment },
      loadRelationIds: true,
    });
    const deleted = await this.appointmentRepo.remove(appointmentEntity);
    return {
      deleted,
      status: new Constants().PREMADE_STATUS.SUCCESS_DELETED,
    };
  }

  async getUserAppointments(user: UserEntity) {
    try {
      const userAppointments = await this.appointmentRepo.find({
        where: { user: user.id },
        loadRelationIds: true,
      });
      return {
        userAppointments,
        length: userAppointments.length,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async getAllDoctorsAppointments(user: DoctorEntity) {
    try {
      const doctorAppointments = await this.appointmentRepo.find({
        where: { doctor: user.id },
        loadRelationIds: true,
      });
      return {
        doctorAppointments,
        length: doctorAppointments.length,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async getAllPlaceAppointments(place: PlaceEntity) {
    try {
      const placeAppointments = await this.appointmentRepo.find({
        where: { place: place.id },
        loadRelationIds: true,
      });
      return {
        placeAppointments,
        length: placeAppointments.length,
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
