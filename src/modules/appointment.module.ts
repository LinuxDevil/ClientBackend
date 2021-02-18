import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentController } from 'src/controllers/appointments/appointment.controller';
import { AppointmentEntity } from 'src/entities/appointment.entity';
import { AppointmentService } from 'src/services/appointment.service';
import { AuthModule } from './auth.module';
import { MenuitemsModule } from './menuitems.module';
import { UserEntity } from 'src/entities/user.entity';
import { DoctorEntity } from 'src/entities/doctor.entity';
import { PlaceEntity } from 'src/entities/place.entity';
import { MenuItem } from 'src/entities/menuitem.entity';
import { MenuitemsService } from 'src/services/menuitems.service';
import { MenuitemsController } from 'src/controllers/menuitems/menuitems.controller';
import { DoctorsController } from 'src/controllers/doctors/doctors.controller';
import { DoctorsService } from 'src/services/doctors.service';
import { InsuranceCompanyEntity } from 'src/entities/insurance.entity';
import { InsuranceService } from 'src/services/insurance/insurance.service';
import { InsuranceController } from 'src/controllers/insurance/insurance.controller';


@Module({
  imports: [
    MenuitemsModule,
    TypeOrmModule.forFeature(
      [InsuranceCompanyEntity, AppointmentEntity, UserEntity, DoctorEntity, PlaceEntity, MenuItem]),
    AuthModule
  ],
  providers: [InsuranceService ,AppointmentService, MenuitemsService, DoctorsService],
  controllers: [InsuranceController ,AppointmentController, MenuitemsController, DoctorsController],
  exports: [AppointmentService, MenuitemsService, DoctorsService]
})
export class AppointmentModule { }
