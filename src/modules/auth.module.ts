import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../services/jwt.strategy';
import { SmsService } from 'src/services/sms.service';
import { TwilioModule } from 'nestjs-twilio';
import { DoctorEntity } from 'src/entities/doctor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, DoctorEntity]),
    JwtModule.register({
      secret: 'AloUsHSecretKEY',
      signOptions: {
        expiresIn: 360000000000
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN
    })
  ],
  providers: [AuthService, JwtStrategy, SmsService],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy, AuthService]
})
export class AuthModule {}
