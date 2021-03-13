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
import { DoctorPlaceEntity } from 'src/entities/doctorplace.entity';
import { DoctorplacesService } from 'src/services/doctorplaces/doctorplaces.service';
import { DoctorplacesController } from 'src/controllers/doctorplaces/doctorplaces.controller';
import { ArmyPlaceEntity } from 'src/entities/armyplaces.entity';
import { ArmyplacesService } from 'src/services/armyplaces/armyplaces.service';
import { ArmyplacesController } from 'src/controllers/armyplaces/armyplaces.controller';
import { PlacesService } from 'src/services/places/places.service';
import { PlacesController } from 'src/controllers/places/places.controller';


@Module({
  imports: [
    MenuitemsModule,
    TypeOrmModule.forFeature(
      [InsuranceCompanyEntity, AppointmentEntity, UserEntity, DoctorEntity, PlaceEntity, MenuItem, HospitalEntity, CityEntity, DoctorPlaceEntity, ArmyPlaceEntity, PlaceEntity]),
    AuthModule
  ],
  providers: [InsuranceService ,AppointmentService, MenuitemsService, DoctorsService, HospitalsService, CitiesService, DoctorplacesService, ArmyplacesService, PlacesService],
  controllers: [InsuranceController ,AppointmentController, MenuitemsController, DoctorsController, HospitalsController, CitiesController, DoctorplacesController, ArmyplacesController, PlacesController],
  exports: [AppointmentService, MenuitemsService, DoctorsService]
})
export class AppointmentModule { }
