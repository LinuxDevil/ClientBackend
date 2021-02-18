import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { doc } from 'prettier';
import { User } from 'src/decorators/user.decorator';
import { AppointmentEntity } from 'src/entities/appointment.entity';
import { DoctorEntity } from 'src/entities/doctor.entity';
import { PlaceEntity } from 'src/entities/place.entity';
import { UserEntity } from 'src/entities/user.entity';
import { AppointmentDTO } from 'src/models/appointment.model';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(AppointmentEntity) private appointmentRepo: Repository<AppointmentEntity>,
        @InjectRepository(DoctorEntity) private doctorRepo: Repository<DoctorEntity>,
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        @InjectRepository(PlaceEntity) private placeRepo: Repository<PlaceEntity>
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
        appointmentEntity.doctor = doctor;
        appointmentEntity.place = place;
        appointmentEntity.date = new Date(appointment.date);
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
