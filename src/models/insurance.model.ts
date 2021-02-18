import { IsOptional, IsString } from "class-validator";

export class InsuranceDTO {
    @IsString()
    @IsOptional()
    nameAr: string;
    @IsString()
    @IsOptional()
    nameEn: string;
    @IsString()
    @IsOptional()
    type: string;
}