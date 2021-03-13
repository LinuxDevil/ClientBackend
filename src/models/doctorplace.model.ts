import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";

export class DoctorPlaceDTO {

    @IsString()
    @IsOptional()
    nameEn: string;

    @IsString()
    @IsOptional()
    nameAr: string;

    @IsString()
    @IsOptional()
    phone: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    imageUrl: string;

    @IsString()
    @IsOptional()
    type: string;

    @IsString()
    @IsOptional()
    startTime: string;

    @IsString()
    @IsOptional()
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