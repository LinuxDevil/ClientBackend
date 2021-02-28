import { IsString } from "class-validator";

export class CityDTO {

    @IsString()
    nameAr: string;

    @IsString()
    nameEn: string;

}