import { IsString } from "class-validator";


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

    @IsString()
    place: string;
}