import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user/user.controller';
import { ProfileController } from '../controllers/profile/profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/modules/auth.module';
import { AuthService } from 'src/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { InsuranceCompanyEntity } from 'src/entities/insurance.entity';
import { InsuranceService } from 'src/services/insurance/insurance.service';
import { InsuranceController } from 'src/controllers/insurance/insurance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, InsuranceCompanyEntity]), AuthModule],
  providers: [UserService, InsuranceService],
  controllers: [UserController, ProfileController, InsuranceController]
})
export class UserModule {}
