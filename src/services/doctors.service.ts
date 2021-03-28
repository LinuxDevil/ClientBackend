import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/entities/doctor.entity';
import { InsuranceCompanyEntity } from 'src/entities/insurance.entity';
import { UpdateDoctorDTO } from 'src/models/user.model';
import { Repository } from 'typeorm';
import '../helpers/DateExt';

@Injectable()
export class DoctorsService {

    constructor(
        @InjectRepository(DoctorEntity) private doctorRepo: Repository<DoctorEntity>,
        @InjectRepository(InsuranceCompanyEntity) private insuranceRepo: Repository<InsuranceCompanyEntity>
    ) { }

    async getAllDoctors() {
        let doctors = await this.doctorRepo.find({ relations: ['appointments', 'insuranceCompany', 'patients', 'qalifications', 'hospital'] });
        return { doctors }
    }

    async getDoctorById(doctorId: string) {
        try {
            let doctor = await this.doctorRepo.findOne({ where: { id: +doctorId } })
            return { doctor };
        } catch (error) {
            return {
                message: 'there is no doctor with that id',
                status: 0
            }
        }
    }

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
        for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt).getDate() + "/" + (new Date(dt).getMonth() + 1) + "/" + new Date(dt).getFullYear() + " " + timeToAdd);
        }
        return arr;
    };

    getDaysList(startDate, endDate, timeToAdd) {
        var daylist = this.getDaysArray(new Date(startDate), new Date(endDate), timeToAdd);
        daylist.map((v) => {
            let thing: string = v.slice(0, 15);
            return thing
        }
        ).join("")
        return daylist;
    }
    async updateAppointmentDuration(upDoctor: DoctorEntity, newDuration: string) {
        let doctor = upDoctor;
        if (doctor === null) {
            return new InternalServerErrorException("Doctor Entity is null")
        }
        if (doctor.shiftDuration === null) {
            doctor.shiftDuration = 8;
        }
        if (doctor.appointmentTimes === null) {
            doctor.appointmentTimes = [];
        }
        if (doctor.appointmentDates === null || doctor.appointmentDates.length < 1) {
            doctor.appointmentDates = [];
            let date = new Date();
            doctor.appointmentDates.push(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " 08:00:00");
            doctor.appointmentDates.push((date.getDate() + 1) + "/" + date.getMonth() + "/" + date.getFullYear() + " 14:00:00");
        }
        if (doctor.appointmentDurations === null || doctor.appointmentDurations.length < 1) {
            doctor.appointmentDurations = [];
            doctor.appointmentDurations.push("02:00");
        }
        doctor.duration = newDuration;
        let appointmens = [];
        doctor.appointmentDates.forEach(appointment => {
            appointmens.push(...this.getTimes(appointment, newDuration, doctor.shiftDuration));
        });
        doctor.appointmentTimes = appointmens;
        await doctor.save();
        upDoctor = doctor;
        await upDoctor.save();
        return { doctor: upDoctor };
    }

    async updateDoctor(username: string, data: UpdateDoctorDTO) {
        let doctor = await this.doctorRepo.findOne({ where: { username: "+".concat(username) } });
        if (doctor === undefined || doctor === null) {
            return {
                status: 0,
                message: 'There is no doctor with username' + username
            }
        }
        if (data.insuranceCompanyId) {
            let insurance = await this.insuranceRepo.findOne({ where: { id: data.insuranceCompanyId } });
            if (insurance === null || insurance === undefined) {
                return {
                    status: 0,
                    message: 'There is no insurance with id' + data.insuranceCompanyId
                }
            }
            doctor.insuranceCompany = insurance;
            await doctor.save();
            delete data.insuranceCompanyId;
        }
        await this.doctorRepo.update({ username: "+".concat(username) }, data);
        let doctorUp = await this.doctorRepo.findOne({ where: { username: "+".concat(username) } });
        return {
            doctor: doctorUp
        }

    }

    async updateAppointmentDates(upDoctor: DoctorEntity, startDate: string, endDate: string) {
        let doctor = upDoctor;
        if (doctor === null) {
            return new InternalServerErrorException("Doctor Entity is null");
        }
        doctor.appointmentDates = this.getDaysList(startDate, endDate, doctor.appointmentDurations);
        await doctor.save();
        return await this.updateAppointmentDuration(doctor, doctor.duration);
    }

    async deleteDoctorById(doctorId: string) {
        try {
            return await this.doctorRepo.delete({ id: +doctorId });
        } catch (error) {
            return {
                message: 'there is no doctor with that id',
                status: 0
            }
        }
    }

}
