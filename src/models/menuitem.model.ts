import { IsBoolean, IsString } from "class-validator";

export class MenuItemmDTO {
    @IsString()
    nameEn: string;

    @IsString()
    nameAr: string;

    @IsBoolean()
    isAvailable: boolean;

    @IsBoolean()
    isUser: boolean;
    
}