import { Column, Entity, JoinTable, OneToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entities";
import { CityEntity } from "./city.entity";

@Entity()
export class OfferEntity  extends AbstractEntity {
    @Column() 
    offerName: string;

    @Column() 
    offerDescription: string;

    @Column()
    beginDate: Date;

    @Column()
    endDate: Date;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @Column({default: null, nullable: true})
    imageUrl: string | null;

    @Column()
    isAvailable: boolean;

    @OneToOne(() => CityEntity, city => city.id)
    @JoinTable()
    city: CityEntity;
}