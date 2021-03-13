import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArmyPlaceEntity } from 'src/entities/armyplaces.entity';
import { CityEntity } from 'src/entities/city.entity';
import { DoctorEntity } from 'src/entities/doctor.entity';
import { ArmyPlaceDTO } from 'src/models/armyplace.model';
import { Repository } from 'typeorm';

@Injectable()
export class ArmyplacesService {
    constructor(
        @InjectRepository(ArmyPlaceEntity) private armyPlaceRepo: Repository<ArmyPlaceEntity>,
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

    //Create new armyPlace
    async createNewArmyPlace(armyPlace: ArmyPlaceDTO) {
        if (armyPlace === null) {
            return new Error("Invalid input");
        }
        let city = await this.cityRepository.findOne({ where: { id: armyPlace.cityId } });
        if (city === null) return new Error("City id is not found");
        let armyPlaceEntity = await this.armyPlaceRepo.create(armyPlace);
        armyPlaceEntity.location = city;
        await armyPlaceEntity.save();
        return armyPlaceEntity;
    }

    //Get all general armyPlaces
    async getAllGeneralArmyPlaces() {
        return await this.armyPlaceRepo.find();
    }

    //Get all private armyPlaces
    async getAllPrivateArmyPlaces() {
        return await this.armyPlaceRepo.find({ where: { type: "private" }, relations: ['location', 'doctors'] });
    }

    //Get all private armyPlaces
    async getAllFilteredPrivateArmyPlaces(cityId: string) {
        return await this.armyPlaceRepo.find({ where: { type: "private", location: { id: +cityId } }, relations: ['location', 'doctors'] });
    }
    //Get all private armyPlaces
    async getAllFilteredGeneralArmyPlaces(cityId: string) {
        return await this.armyPlaceRepo.find({ where: { type: "general", location: { id: +cityId } }, relations: ['location', 'doctors'] });
    }

    //Get armyPlace by id
    async getArmyPlaceById(armyPlaceId: string) {
        let armyPlace = await this.armyPlaceRepo.findOne({ where: { id: +armyPlaceId } });
        if (armyPlace == null) {
            return {
                status: 0,
                message: "There is no armyPlace with id " + armyPlaceId
            }
        }
        return armyPlace;
    }

    async deleteArmyPlace(armyPlaceId: string) {
        let armyPlace = await this.armyPlaceRepo.findOne({ where: { id: +armyPlaceId } });
        console.log(armyPlace);
        if (armyPlace === null || armyPlace === undefined) return {
            status: 0,
            message: "ArmyPlace not found"
        }
        return await armyPlace.remove();
    }

    async deleteAllArmyPlaces() {
        return await this.armyPlaceRepo.delete({ type: 'private' });
    }

    //TODO:: Add place to armyPlace
    async addPlace() {

    }

    //TODO: Add doctor to armyPlace
    async addDoctor(doctorId: string, armyPlaceId: string) {
        let armyPlace = await this.armyPlaceRepo.findOne({ where: { id: +armyPlaceId } });
        if (armyPlace === null || armyPlace === undefined) {
            return {
                message: "There's no armyPlace with that id",
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
        if (armyPlace.doctors === undefined || armyPlace.doctors === null) {
            armyPlace.doctors = [];
        }
        await armyPlace.doctors.push(doctor);
        await armyPlace.save();
        return armyPlace;
    }

    //TODO: Generate appointment times for armyPlaces/ operations and everything else
    async updateArmyPlaceOperationDurations(armyPlaceId: string, newDuration: string) {
        let armyPlace = await this.armyPlaceRepo.findOne({where: {id: +armyPlaceId}});
        if (armyPlace === null) {
            return new InternalServerErrorException("ArmyPlace is null");
        }
        if (armyPlace.shiftDuration === null) {
            armyPlace.shiftDuration = 8;
        }
        if (armyPlace.appointmentTimes === null) {
            armyPlace.appointmentTimes = [];
        }
        if (armyPlace.appointmentDates === null || armyPlace.appointmentDates.length < 1) {
            armyPlace.appointmentDates = [];
            let date = new Date();
            armyPlace.appointmentDates.push(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " 08:00:00");
            armyPlace.appointmentDates.push((date.getDate() + 1) + "/" + date.getMonth() + "/" + date.getFullYear() + " 14:00:00");
        }
        if (armyPlace.appointmentDurations === null || armyPlace.appointmentDurations.length < 1) {
            armyPlace.appointmentDurations = [];
            armyPlace.appointmentDurations.push("02:00");
        }
        armyPlace.duration = newDuration;
        let appointmens = [];
        armyPlace.appointmentDates.forEach(appointment => {
            appointmens.push(...this.getTimes(appointment, newDuration, armyPlace.shiftDuration));
        });
        armyPlace.appointmentTimes = appointmens;
        await armyPlace.save();
        return armyPlace;
    }

    async updateArmyPlaceOperationDates(armyPlaceId: string, startDate: string, endDate: string) {
        let armyPlace = await this.armyPlaceRepo.findOne({where: {id: +armyPlaceId}});
        if (armyPlace === null) {
            return new InternalServerErrorException("ArmyPlace Entity is null");
        }
        armyPlace.appointmentDates = this.getDaysList(startDate, endDate, armyPlace.appointmentDurations);
        await armyPlace.save();
        return await this.updateArmyPlaceOperationDurations(armyPlaceId, armyPlace.duration);

    }

    //TODO: Add appointment to armyPlace

    //TODO: Add sub armyPlace

    //TODO: Add appointment to sub armyPlace

    //TODO: Get armyPlace appointments

    //TODO: Get sub armyPlace appointments
}
