import { IsArray, IsBoolean, IsEmail, IsNumber, IsString } from "class-validator";

export class HospitalDTO {
    @IsString()
    nameEn: string;

    @IsString()
    nameAr: string;

    @IsString()
    phone: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    imageUrl: string;

    @IsString()
    type: string;

    @IsString()
    startTime: string;

    @IsString()
    endTime: string;

    @IsBoolean()
    isAvialable: boolean;

    @IsArray()
    insurances: string[];

    @IsArray()
    holidays: Date[];

    @IsString()
    cityId: string;

}