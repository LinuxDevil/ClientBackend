import {
    IsEmail, IsOptional, IsString, Max, MaxLength, Min, MinLength
} from 'class-validator';
import { InsuranceCompanyEntity } from 'src/entities/insurance.entity';
import { IsNull } from 'typeorm';

export class LoginDTO {
    @IsEmail()
    @IsString()
    @MinLength(4)
    email: string;
    @IsString()
    @MinLength(4)
    password: string;
}

export class LoginOTP {
    @IsString()
    @MinLength(9)
    @MaxLength(13)
    username: string;
}



export class RegisterationOTP {
    @IsString()
    @MinLength(9)
    @MaxLength(13)
    username: string;
}

export class RegistrationDTO extends LoginDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
}

export class UpdateUserDTO {
    @IsString()
    @IsOptional()
    name: string;
    @IsEmail()
    @IsOptional()
    email: string;
    @IsOptional()
    image: string;
    @IsOptional()
    bio: string;
    @IsString()
    @IsOptional()
    insuranceNumber: string;
    @IsString()
    @IsOptional()
    insuranceCompanyId: string;
    @IsString()
    @IsOptional()
    city: string;
    @IsString()
    @IsOptional()
    district: string;
    @IsString()
    @IsOptional()
    nickname: string;
    @IsString()
    @IsOptional()
    nationalityId: string;
}

export class UpdateDoctorDTO {
    @IsString()
    @IsOptional()
    name: string;
    @IsEmail()
    @IsOptional()
    email: string;
    @IsOptional()
    image: string;
    @IsOptional()
    bio: string;
    @IsString()
    @IsOptional()
    insuranceNumber: string;
    @IsString()
    @IsOptional()
    insuranceCompanyId: string;
    @IsString()
    @IsOptional()
    nationalityId: string;
}

export interface AuthPayload {
    username: string;
}
