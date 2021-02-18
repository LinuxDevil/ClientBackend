import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract-entities";

@Entity('insurance')
export class InsuranceCompanyEntity extends AbstractEntity {

    @Column()
    nameAr: string;

    @Column() 
    nameEn: string;

    @Column() 
    type: string;

}