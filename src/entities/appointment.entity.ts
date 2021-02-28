import { Delete } from "@nestjs/common";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entities";
import { DoctorEntity } from "./doctor.entity";
import { HospitalEntity } from "./hospital.entity";
import { PlaceEntity } from "./place.entity";
import { UserEntity } from "./user.entity";

@Entity('appointment')
export class AppointmentEntity extends AbstractEntity {

    @Column()
    date: Date;

    @Column()
    time: string;

    @Column() 
    location: string;

    @Column({default: null, nullable: true}) 
    imageUrl: string | null;

    @Column()
    rate: number;

    @Column()
    inProgress: boolean;

    @Column()
    shift: string;

    @Column({default: '', nullable: true})
    tests: string;

    @ManyToOne(() => DoctorEntity, (doctor: DoctorEntity) => doctor.appointments, {
        onDelete: 'CASCADE'
    })
    @JoinTable()
    doctor: DoctorEntity;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.appointments, {
        onDelete: 'CASCADE'
    })
    @JoinTable()
    user: UserEntity;

    @ManyToOne(() => HospitalEntity, (hospital: HospitalEntity) => hospital.appointments, {
        onDelete: 'CASCADE'
    })
    @JoinTable()
    hospital: HospitalEntity;

    // M-M with place
    @ManyToOne(() => PlaceEntity, (place: PlaceEntity) => place.id, {
        onDelete: 'CASCADE'
    })
    @JoinTable()
    place: PlaceEntity;

    // M-M with hospitals

}