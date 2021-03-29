import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsuranceCompanyEntity } from 'src/entities/insurance.entity';
import { Constants } from 'src/helpers/Constants';
import { InsuranceDTO } from 'src/models/insurance.model';
import { Repository } from 'typeorm';

@Injectable()
export class InsuranceService {
  constructor(
    @InjectRepository(InsuranceCompanyEntity)
    private insuranceRepoo: Repository<InsuranceCompanyEntity>,
  ) {}

  async addInsuranceCompany(insurance: InsuranceDTO) {
    try {
      const insuranceEntity = await this.insuranceRepoo.create(insurance);
      await insuranceEntity.save();
      return {
        insuranceEntity,
        status: new Constants().PREMADE_STATUS.Success_Created,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async updateInsuranceCompany(insurance: InsuranceDTO) {
    try {
      const updatedInsurance = await this.insuranceRepoo.update(
        { nameEn: insurance.nameEn },
        insurance,
      );
      return {
        updatedInsurance,
        status: new Constants().PREMADE_STATUS.SUCCESS_UPDATED,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async deleteInsuranceCompany(id: number) {
    try {
      const insurance = await this.insuranceRepoo.findOne({ where: { id },
        loadRelationIds: true, });
      const removedInsurance = await this.insuranceRepoo.remove(insurance);
      return {
        removedInsurance,
        status: new Constants().PREMADE_STATUS.SUCCESS_DELETED,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async getInsurances() {
    try {
      const insurances = await this.insuranceRepoo.find({
        loadRelationIds: true,});
      return { insurances, status: new Constants().PREMADE_STATUS.SUCCESS_GET };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }
}
