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
import { HospitalEntity } from 'src/entities/hospital.entity';
import { HospitalsController } from 'src/controllers/hospitals/hospitals.controller';
import { HospitalsService } from 'src/services/hospitals/hospitals.service';
import { CityEntity } from 'src/entities/city.entity';
import { CitiesService } from 'src/services/cities.service';
import { CitiesController } from 'src/controllers/cities/cities.controller';


@Module({
  imports: [
    MenuitemsModule,
    TypeOrmModule.forFeature(
      [InsuranceCompanyEntity, AppointmentEntity, UserEntity, DoctorEntity, PlaceEntity, MenuItem, HospitalEntity, CityEntity]),
    AuthModule
  ],
  providers: [InsuranceService ,AppointmentService, MenuitemsService, DoctorsService, HospitalsService, CitiesService],
  controllers: [InsuranceController ,AppointmentController, MenuitemsController, DoctorsController, HospitalsController, CitiesController],
  exports: [AppointmentService, MenuitemsService, DoctorsService]
})
export class AppointmentModule { }
