import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Doctor } from 'src/decorators/user.decorator';
import { AppointmentDTO } from 'src/models/appointment.model';
import { DoctorsService } from 'src/services/doctors.service';

@Controller('doctors')
export class DoctorsController {

    constructor(private doctorService: DoctorsService) {}

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

}
