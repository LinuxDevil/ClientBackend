import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { doc } from 'prettier';
import { User } from 'src/decorators/user.decorator';
import { AppointmentEntity } from 'src/entities/appointment.entity';
import { DoctorEntity } from 'src/entities/doctor.entity';
import { HospitalEntity } from 'src/entities/hospital.entity';
import { PlaceEntity } from 'src/entities/place.entity';
import { UserEntity } from 'src/entities/user.entity';
import { AppointmentDTO } from 'src/models/appointment.model';
import { HospitalDTO } from 'src/models/hospital.mode';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(AppointmentEntity) private appointmentRepo: Repository<AppointmentEntity>,
        @InjectRepository(DoctorEntity) private doctorRepo: Repository<DoctorEntity>,
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        @InjectRepository(PlaceEntity) private placeRepo: Repository<PlaceEntity>,
        @InjectRepository(HospitalEntity) private hospitalRepo: Repository<HospitalEntity>
        ) {}

    async findUser(username: string, user?: UserEntity): Promise<UserEntity> {
        console.log('findUser');
        return (await this.userRepo.findOne({ where: { username } })).toProfile(user);
    } 
    
    async findDoctor(username: string, doctor?: DoctorEntity): Promise<DoctorEntity> {
        console.log('findDoctorCalled');
        return (await this.doctorRepo.findOne({ where: { username }})).toProfile(doctor);
    } 

    async addAppointment(appointment: AppointmentDTO) {
        let doctor = await this.doctorRepo.findOne({where: {username: appointment.doctor}});
        let user = await this.userRepo.findOne({where: {username: appointment.user}});
        let place = await this.placeRepo.findOne({where: {placeName: appointment.place}});
        let appointmentEntity: AppointmentEntity = new AppointmentEntity();
        appointmentEntity.user = user;
        let index = doctor.appointmentTimes.indexOf(appointment.time);
        if (index === -1) {
            return {
                status: 0,
                message: 'there was no time'
            }
        }
        doctor.appointmentTimes.splice(index, 1);
        await doctor.save();
        appointmentEntity.doctor = doctor;
        appointmentEntity.place = place;
        let date = appointment.date.split("/");
        let convertedDate = date[1] + "/" + date[0] + "/" + date[2];
        appointmentEntity.date = new Date(convertedDate);
        appointmentEntity.time = appointment.time;
        appointmentEntity.rate = 0;
        appointmentEntity.location = appointment.location;
        appointmentEntity.inProgress = true;
        appointmentEntity.shift = appointment.shift;
        await this.appointmentRepo.create(appointmentEntity);
        await appointmentEntity.save();
        return appointmentEntity;
    }

    /**
     * when the user clicks on add appointment.
     * External for example, he get's an appointment inside the hospital.
     * So here, update the hospital appointemnts to that, with the corresponding type.
     */
    async addHospitalAppointment(appointment: AppointmentDTO) {
        let hospital = await this.hospitalRepo.findOne({where: {id: +appointment.hospitalId}});
        let user = await this.userRepo.findOne({where: {username: appointment.user}});
        let place = await this.placeRepo.findOne({where: {placeName: appointment.place}});
        let appointmentEntity: AppointmentEntity = new AppointmentEntity();
        appointmentEntity.user = user;
        let index = hospital.appointmentTimes.indexOf(appointment.time);
        if (index === -1) {
            return {
                status: 0,
                message: 'there was no time'
            }
        }
        hospital.appointmentTimes.splice(index, 1);
        await hospital.save();
        appointmentEntity.hospital = hospital;
        appointmentEntity.place = place;
        let date = appointment.date.split("/");
        let convertedDate = date[1] + "/" + date[0] + "/" + date[2];
        appointmentEntity.date = new Date(convertedDate);
        appointmentEntity.time = appointment.time;
        appointmentEntity.rate = 0;
        appointmentEntity.location = appointment.location;
        appointmentEntity.inProgress = true;
        appointmentEntity.shift = appointment.shift;
        await this.appointmentRepo.create(appointmentEntity);
        await appointmentEntity.save();
        return appointmentEntity;
    }

    async deleteAppointment(appointment: string) {
        let appointmentEntity = await this.appointmentRepo.findOne({where: {id: appointment}});
        return await this.appointmentRepo.remove(appointmentEntity);
    }

    async getUserAppointments(user: UserEntity) {
        return await this.appointmentRepo.find({where: {user: user.id}});
    }

    async getAllDoctorsAppointments(user: DoctorEntity) {
        console.log(user);
        return await this.appointmentRepo.find({where: {doctor: user.id}});
    }

    async getAllPlaceAppointments(place: PlaceEntity) {
        return await this.appointmentRepo.find({where: {place: place.id}});
    }

}
