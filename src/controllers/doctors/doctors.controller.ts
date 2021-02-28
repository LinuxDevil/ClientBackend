import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Doctor } from 'src/decorators/user.decorator';
import { DoctorEntity } from 'src/entities/doctor.entity';
import { UpdateDoctorDTO } from 'src/models/user.model';
import { DoctorsService } from 'src/services/doctors.service';

@Controller('doctors')
export class DoctorsController {

    constructor(private doctorService: DoctorsService) {}
    
    @Get('/all')
    async getAllDoctors() {
        return await this.doctorService.getAllDoctors();
    }

    @Get()
    async getDoctorById(@Body() body: {id: string}) {
        return await this.doctorService.getDoctorById(body.id);
    }

    @Post('times')
    @UseGuards(AuthGuard())
    async updateDoctorAppointmentDuration(@Doctor() doctor, @Body() newDuratonObject: {duration: string}) {
        return await this.doctorService.updateAppointmentDuration(doctor, newDuratonObject.duration);
    }

    @Post('dates')
    @UseGuards(AuthGuard())
    async updateDoctorAppointmentDates(@Doctor() doctor, @Body() dates: {beginDate: string, endDate: string}) {
        return await this.doctorService.updateAppointmentDates(doctor, dates.beginDate, dates.endDate);
    }

    @Put()
    update(@Query('username') username: string, @Body(new ValidationPipe({transform: true, whitelist: true})) data: UpdateDoctorDTO) {
        return this.doctorService.updateDoctor(username, data);
    }


    @Delete('/delete')
    async deleteDoctorById(@Body() body: {id: string}) {
        return await this.doctorService.deleteDoctorById(body.id);
    }

}
