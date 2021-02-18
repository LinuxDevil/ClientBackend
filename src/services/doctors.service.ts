import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/entities/doctor.entity';
import { Repository } from 'typeorm';
import '../helpers/DateExt';

@Injectable()
export class DoctorsService {

    constructor(@InjectRepository(DoctorEntity) private doctorRepo: Repository<DoctorEntity>) { }

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

    async updateAppointmentDuration(upDoctor: DoctorEntity, newDuration: string) {
        let doctor = upDoctor;
        console.log('Called');
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
        })
        console.log(appointmens);
        doctor.appointmentTimes = appointmens;
        await doctor.save();
        upDoctor = doctor;
        await upDoctor.save();
        return upDoctor;
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

}
