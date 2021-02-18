import { Column, Entity, JoinTable, OneToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entities";
import { CityEntity } from "./city.entity";
import { DoctorEntity } from "./doctor.entity";


@Entity('consult')
export class ConsultEntity extends AbstractEntity {

    @Column()
    consultIn: string;

    @Column()
    tempreture: string;

    @OneToOne(() => CityEntity, city => city.id)
    @JoinTable()
    city: CityEntity;

    @OneToOne(() => DoctorEntity, doctor => doctor.id)
    @JoinTable()
    doctor: DoctorEntity;
    
}