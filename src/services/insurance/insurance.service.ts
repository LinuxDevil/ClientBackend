import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsuranceCompanyEntity } from 'src/entities/insurance.entity';
import { InsuranceDTO } from 'src/models/insurance.model';
import { Repository } from 'typeorm';

@Injectable()
export class InsuranceService {

    constructor(@InjectRepository(InsuranceCompanyEntity) private insuranceRepoo: Repository<InsuranceCompanyEntity>) { }

    async addInsuranceCompany(insurance: InsuranceDTO) {
        try {
            let insuranceEntity = await this.insuranceRepoo.create(insurance);
            await insuranceEntity.save();
            return {
                insuranceEntity,
                status: 1,
                message: 'Success'
            };
        } catch (error) {
            return {
                status: 0,
                message: 'There was an error',
                error
            }
        }
    }

    async updateInsuranceCompany(insurance: InsuranceDTO) {
        try {
            let updatedInsurance = await this.insuranceRepoo.update({ nameEn: insurance.nameEn }, insurance);
            return {
                updatedInsurance,
                status: 1,
                message: 'Success'
            };
        } catch (error) {
            return {
                status: 0,
                message: 'There was an error',
                error
            }
        }
    }

    async deleteInsuranceCompany(id: number) {
        try {
            let insurance = await this.insuranceRepoo.findOne({ where: { id } });
            let removedInsurance = await this.insuranceRepoo.remove(insurance);
            return {
                removedInsurance,
                status: 1,
                message: 'Success'
            };

        } catch (error) {
            return {
                status: 0,
                message: 'There was an error',
                error
            }
        }
    }

    async getInsurances() {
        try {
            let insurances = await this.insuranceRepoo.find();
            return { insurances };
        } catch (error) {
            return {
                status: 0,
                message: 'There was an error',
                error
            }

        }
    }

}
