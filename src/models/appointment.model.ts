import { IsOptional, IsString } from "class-validator";


export class AppointmentDTO {
    @IsString()
    date: string;

    @IsString()
    time: string;

    @IsString()
    location: string;

    @IsString()
    shift: string;

    @IsString()
    user: string;

    @IsString()
    doctor: string;

    @IsOptional()
    @IsString()
    place: string;

    @IsOptional()
    @IsString()
    hospitalId;

    @IsOptional()
    @IsString()
    type: string;

    @IsOptional()
    @IsString()
    tests: string;

}