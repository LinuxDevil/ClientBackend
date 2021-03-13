import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entities";
import { AppointmentEntity } from "./appointment.entity";
import { CityEntity } from "./city.entity";
import { DoctorEntity } from "./doctor.entity";
import { HospitalEntity } from "./hospital.entity";
import { PlaceEntity } from "./place.entity";
import { UserEntity } from "./user.entity";


@Entity('doctorplace')
export class DoctorPlaceEntity extends AbstractEntity {
    
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

    @Column({default: 8, nullable: true})
    shiftDuration: number;

    @Column({default: '10', nullable: true})
    duration: string;

    @Column('text', {array: true, nullable: true})
    appointmentTimes: string[];

    @Column('text', {array: true, nullable: true})
    appointmentDurations: string[];

    @Column('text', {array: true, nullable: true})
    appointmentDates: string[];

    @Column('text', {array: true})
    insurances: string[];

    @Column('date', {array: true})
    holidays: Date[];

    @ManyToOne(() => CityEntity, city => city.id, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    @JoinColumn()
    location: CityEntity;

    @OneToMany(() => AppointmentEntity, appointment => appointment.id, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    @JoinTable()
    JoinColumn: AppointmentEntity[];

    @OneToMany(() => PlaceEntity, place => place.id, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    @JoinColumn()
    labs: PlaceEntity[];

    @OneToMany(() => PlaceEntity, place => place.id, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    @JoinColumn()
    xrays: PlaceEntity[];

    @OneToMany(() => PlaceEntity, place => place.id, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    @JoinColumn()
    pharmacies: PlaceEntity[];

    @OneToMany(() => DoctorEntity, doctor => doctor.hospital, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    @JoinColumn({name: 'doctors'})
    doctors: DoctorEntity[];

    @OneToMany(() => UserEntity, user => user.id, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    @JoinColumn()
    user: UserEntity[];

    @OneToMany(() => HospitalEntity, hospital => hospital.id, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    @JoinColumn()
    subHospitals: HospitalEntity[];

    @ManyToOne(() => AppointmentEntity, appointment => appointment.hospital)
    @JoinTable()
    appointments: AppointmentEntity[];
}