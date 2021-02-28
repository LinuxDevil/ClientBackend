import { Column, Entity, JoinTable, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entities";
import { DistrictEntity } from "./district.entity";

@Entity('city')
export class CityEntity extends AbstractEntity {

    @Column()
    nameAr: string;

    @Column()
    nameEn: string;

    @OneToMany(() => DistrictEntity   , district => district.id)
    @JoinTable()
    districts: DistrictEntity[];

}