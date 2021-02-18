import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { InsuranceDTO } from 'src/models/insurance.model';
import { InsuranceService } from 'src/services/insurance/insurance.service';

@Controller('insurance')
export class InsuranceController {

    constructor(private insuranceService: InsuranceService) {}

    @Get()
    async getInsurances() {
        return await this.insuranceService.getInsurances();
    }

    @Post()
    async addInsurance(@Body() insurance: InsuranceDTO) {
        return await this.insuranceService.addInsuranceCompany(insurance);
    }
    

    @Put()
    async updateInsurance(@Body() insurance: InsuranceDTO) {
        return await this.insuranceService.updateInsuranceCompany(insurance);
    }

    @Delete()
    async deleteInsurance(@Body() body: {id: string}) {
        return await this.insuranceService.deleteInsuranceCompany(+body.id);
    }


}
