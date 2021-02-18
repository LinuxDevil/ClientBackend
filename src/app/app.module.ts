import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionService } from '../services/database-connection.service';
import { AuthModule } from '../modules/auth.module';
import { UserModule } from '../modules/user.module';
import { SmsService } from '../services/sms.service';
import { MenuitemsModule } from 'src/modules/menuitems.module';
import { AppointmentModule } from 'src/modules/appointment.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: DatabaseConnectionService
  }), AuthModule, UserModule, MenuitemsModule, AppointmentModule],
  controllers: [AppController],
  providers: [AppService, SmsService],
})
export class AppModule {}