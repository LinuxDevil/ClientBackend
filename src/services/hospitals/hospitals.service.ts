import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HospitalEntity } from 'src/entities/hospital.entity';
import { HospitalDTO } from 'src/models/hospital.mode';
import { Repository } from 'typeorm';

@Injectable()
export class HospitalsService {

    constructor(@InjectRepository(HospitalEntity) private hospitalRepo: Repository<HospitalEntity>) {}

    //Create new hospital
    async createNewHospital(hospital: HospitalDTO) {

    }

    //Get all general hospitals

    async getAllGeneralHospitals() {
        return await this.hospitalRepo.find({where: {type: "General"}});
    }

    //Get all private hospitals
    async getAllPrivateHospitals() {
        return await this.hospitalRepo.find({where: {type: "Private"}});
    }

    //Get hospital by id
    async getHospitalById(hospitalId: string) {
        let hospital = await this.hospitalRepo.findOne({where: {id: +hospitalId}});
        if (hospital == null) {
            return {
                status: 0,
                message: "There is no hospital with id " + hospitalId
            }
        }
        return hospital;
    } 

    //TODO:: Add place to hospital

    //TODO: Add doctor to hospital

    //TODO: Add appointment to hospital

    //TODO: Add sub hospital

    //TODO: Add appointment to sub hospital

    //TODO: Get hospital appointments

    //TODO: Get sub hospital appointments
}
