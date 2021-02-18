import { Column, Entity, JoinTable, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entities";
import { CityEntity } from "./city.entity";

@Entity('district')
export class DistrictEntity extends AbstractEntity {

    @Column()
    nameAr: string;

    @Column()
    nameEn: string;

    @ManyToOne(() => CityEntity, city => city.id)
    @JoinTable()
    city: CityEntity;

}