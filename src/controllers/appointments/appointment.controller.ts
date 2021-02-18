import { Body, Controller, Delete, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { doc } from 'prettier';
import { Doctor, Place, User } from 'src/decorators/user.decorator';
import { DoctorEntity } from 'src/entities/doctor.entity';
import { PlaceEntity } from 'src/entities/place.entity';
import { UserEntity } from 'src/entities/user.entity';
import { AppointmentDTO } from 'src/models/appointment.model';
import { AppointmentService } from 'src/services/appointment.service';

@Controller('appointment')
export class AppointmentController {

    constructor(private appointmentService: AppointmentService) {}

    @Get()
    @UseGuards(AuthGuard())
    findCurrentUser(@User() {username}: UserEntity) {
        return this.appointmentService.findUser(username);
    }

    @Get()
    @UseGuards(AuthGuard())
    findCurrentDoctor(@Doctor() {username}: DoctorEntity) {
        return this.appointmentService.findDoctor(username);
    }

    @Post()
    @UseGuards(AuthGuard())
    createNewAppointment(@User() user: UserEntity, @Body(new ValidationPipe({transform: true, whitelist: true})) data: AppointmentDTO) {
        return this.appointmentService.addAppointment(data);
    }

    @Delete('/delete')
    @UseGuards(AuthGuard())
    deleteAppointment(@Body(new ValidationPipe({transform: true})) appointmentId: {appointmentId: string}) {
        return this.appointmentService.deleteAppointment(appointmentId.appointmentId);
    }

    @Post('/getUserAppointments')
    @UseGuards(AuthGuard())
    getAppointmentsForUser(@User() user: UserEntity) {
        return this.appointmentService.getUserAppointments(user);
    }

    @Post('/getDoctorAppointments')
    @UseGuards(AuthGuard())
    getAppointmentsForDoctor(@Doctor() doctor: DoctorEntity) {
        return this.appointmentService.getAllDoctorsAppointments(doctor);
    }

    @Post('/getAllPlaceAppointments')
    @UseGuards(AuthGuard())
    getAppointmentsForPlace(@Place() place: PlaceEntity) {
        return this.appointmentService.getAllPlaceAppointments(place);
    }
}
