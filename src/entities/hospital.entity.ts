import { Column, Entity, JoinTable, OneToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entities";
import { AppointmentEntity } from "./appointment.entity";
import { CityEntity } from "./city.entity";
import { DoctorEntity } from "./doctor.entity";
import { PlaceEntity } from "./place.entity";
import { UserEntity } from "./user.entity";


@Entity('hospital')
export class HospitalEntity extends AbstractEntity {
    
    @Column()
    nameEn: string;
    
    @Column()
    nameAr: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column() 
    imageUrl: string;

    @Column()
    type: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @Column() 
    isAvialable: boolean;

    @Column('text', {array: true})
    insurances: string[];

    @Column('date', {array: true})
    holidays: Date[];

    @OneToOne(() => CityEntity, city => city.id)
    @JoinTable()
    location: CityEntity[];

    @OneToMany(() => AppointmentEntity, appointment => appointment.id)
    @JoinTable()
    appointments: AppointmentEntity[];

    @OneToMany(() => PlaceEntity, place => place.id)
    @JoinTable()
    labs: PlaceEntity[];

    @OneToMany(() => PlaceEntity, place => place.id)
    @JoinTable()
    xrays: PlaceEntity[];

    @OneToMany(() => PlaceEntity, place => place.id)
    @JoinTable()
    pharmacies: PlaceEntity[];

    @OneToMany(() => DoctorEntity, doctor => doctor.id)
    @JoinTable()
    doctors: DoctorEntity[];

    @OneToMany(() => UserEntity, user => user.id)
    @JoinTable()
    user: UserEntity[];

    @OneToMany(() => HospitalEntity, hospital => hospital.id)
    @JoinTable()
    subHospitals: HospitalEntity[];

}