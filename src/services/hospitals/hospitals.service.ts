import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/entities/city.entity';
import { DoctorEntity } from 'src/entities/doctor.entity';
import { HospitalEntity } from 'src/entities/hospital.entity';
import { HospitalDTO } from 'src/models/hospital.mode';
import { RegisterationOTP, RegistrationDTO } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class HospitalsService {

    constructor(
        @InjectRepository(HospitalEntity) private hospitalRepo: Repository<HospitalEntity>,
        @InjectRepository(CityEntity) private cityRepository: Repository<CityEntity>,
        @InjectRepository(DoctorEntity) private doctorRepo: Repository<DoctorEntity>
    ) { }

    getTimes(date, newDuration, shift) {
        let quarterHours = ["00"];
        if (newDuration === "0") {
            quarterHours = ["00", "15", "30", "45"]
        } else {
            let oldValue = +newDuration;
            while (newDuration < 60) {
                quarterHours.push(newDuration);
                newDuration = +newDuration + oldValue;
            }
        }
        let times = [];
        let appointmentStartTime = Number.parseInt(date.split(" ")[1]);
        for (let i = appointmentStartTime; i < appointmentStartTime + shift; i++) {
            for (let j = 0; j < quarterHours.length; j++) {
                let time = i + ":" + quarterHours[j];
                if (i < 10) {
                    time = "0" + time;
                }
                times.push(date.split(" ")[0] + " " + time);
            }
        }
        return times;
    }
    getDaysArray(start, end, timeToAdd) {
        for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt).getDate() + "/" + (new Date(dt).getMonth() + 1) + "/" + new Date(dt).getFullYear() + " " + timeToAdd);
        }
        return arr;
    };
    getDaysList(startDate, endDate, timeToAdd) {
        var daylist = this.getDaysArray(new Date(startDate),new Date(endDate), timeToAdd);
        daylist.map((v)=> {
            let thing: string = v.slice(0,15);
            return thing
        }
        ).join("")
        return daylist;
    }

    //Create new hospital
    async createNewHospital(hospital: HospitalDTO) {
        if (hospital === null) {
            return new Error("Invalid input");
        }
        let city = await this.cityRepository.findOne({ where: { id: hospital.cityId } });
        if (city === null) return new Error("City id is not found");
        let hospitalEntity = await this.hospitalRepo.create(hospital);
        hospitalEntity.location = city;
        await hospitalEntity.save();
        return hospitalEntity;
    }

    //Get all general hospitals
    async getAllGeneralHospitals() {
        return await this.hospitalRepo.find({ where: { type: "General" } });
    }

    //Get all private hospitals
    async getAllPrivateHospitals() {
        return await this.hospitalRepo.find({ where: { type: "private" }, relations: ['location', 'doctors'] });
    }

    //Get all private hospitals
    async getAllFilteredPrivateHospitals(cityId: string) {
        return await this.hospitalRepo.find({ where: { type: "private", location: { id: +cityId } }, relations: ['location', 'doctors'] });
    }

    //Get hospital by id
    async getHospitalById(hospitalId: string) {
        let hospital = await this.hospitalRepo.findOne({ where: { id: +hospitalId } });
        if (hospital == null) {
            return {
                status: 0,
                message: "There is no hospital with id " + hospitalId
            }
        }
        return hospital;
    }

    async deleteHospital(hospitalId: string) {
        let hospital = await this.hospitalRepo.findOne({ where: { id: +hospitalId } });
        console.log(hospital);
        if (hospital === null || hospital === undefined) return {
            status: 0,
            message: "Hospital not found"
        }
        return await hospital.remove();
    }

    async deleteAllHospitals() {
        return await this.hospitalRepo.delete({ type: 'private' });
    }

    //TODO:: Add place to hospital
    async addPlace() {

    }

    //TODO: Add doctor to hospital
    async addDoctor(doctorId: string, hospitalId: string) {
        let hospital = await this.hospitalRepo.findOne({ where: { id: +hospitalId } });
        if (hospital === null || hospital === undefined) {
            return {
                message: "There's no hospital with that id",
                status: 0
            }
        }
        let doctor = await this.doctorRepo.findOne({ where: { id: +doctorId } });
        if (doctor === null || doctor === undefined) {
            return {
                message: "There's no doctor with that id",
                status: 0
            }
        }
        if (hospital.doctors === undefined || hospital.doctors === null) {
            hospital.doctors = [];
        }
        await hospital.doctors.push(doctor);
        await hospital.save();
        return hospital;
    }

    //TODO: Generate appointment times for hospitals/ operations and everything else
    async updateHospitalOperationDurations(hospitalId: string, newDuration: string) {
        let hospital = await this.hospitalRepo.findOne({where: {id: +hospitalId}});
        if (hospital === null) {
            return new InternalServerErrorException("Hospital is null");
        }
        if (hospital.shiftDuration === null) {
            hospital.shiftDuration = 8;
        }
        if (hospital.appointmentTimes === null) {
            hospital.appointmentTimes = [];
        }
        if (hospital.appointmentDates === null || hospital.appointmentDates.length < 1) {
            hospital.appointmentDates = [];
            let date = new Date();
            hospital.appointmentDates.push(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " 08:00:00");
            hospital.appointmentDates.push((date.getDate() + 1) + "/" + date.getMonth() + "/" + date.getFullYear() + " 14:00:00");
        }
        if (hospital.appointmentDurations === null || hospital.appointmentDurations.length < 1) {
            hospital.appointmentDurations = [];
            hospital.appointmentDurations.push("02:00");
        }
        hospital.duration = newDuration;
        let appointmens = [];
        hospital.appointmentDates.forEach(appointment => {
            appointmens.push(...this.getTimes(appointment, newDuration, hospital.shiftDuration));
        });
        hospital.appointmentTimes = appointmens;
        await hospital.save();
        return hospital;
    }

    async updateHospitalOperationDates(hospitalId: string, startDate: string, endDate: string) {
        let hospital = await this.hospitalRepo.findOne({where: {id: +hospitalId}});
        if (hospital === null) {
            return new InternalServerErrorException("Hospital Entity is null");
        }
        hospital.appointmentDates = this.getDaysList(startDate, endDate, hospital.appointmentDurations);
        await hospital.save();
        return await this.updateHospitalOperationDurations(hospitalId, hospital.duration);

    }

    //TODO: Add appointment to hospital

    //TODO: Add sub hospital

    //TODO: Add appointment to sub hospital

    //TODO: Get hospital appointments

    //TODO: Get sub hospital appointments
}
