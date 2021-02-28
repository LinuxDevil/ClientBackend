import { classToPlain, Exclude } from "class-transformer";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entities";
import { UserEntity } from "./user.entity";
import * as bcrypt from 'bcryptjs';
import { QalificationsEntity } from "./qalification.entity";
import { AppointmentEntity } from "./appointment.entity";
import { InsuranceCompanyEntity } from "./insurance.entity";
import { HospitalEntity } from "./hospital.entity";

@Entity('doctor')
export class DoctorEntity extends AbstractEntity {

    @Column()
    email: string;

    @Column()
    username: string;

    @Column({default: ''})
    phone: string;

    @Column({default: ''}) 
    bio: string;

    @Column({default: '', nullable: true})
    nationalityId: string;

    @Column({ default: '' })
    name: string;

    @Column({default: null, nullable: true})
    image: string | null;

    @Column()
    @Exclude()
    password: string;

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

    @Column({ default: '' })
    insuranceNumber: string;
    
    @Column({default: false})
    isVerified: boolean;

    @OneToMany(() => AppointmentEntity, appointment => appointment.doctor)
    @JoinTable()
    appointments: AppointmentEntity[];

    @OneToOne(() => InsuranceCompanyEntity, insurance => insurance.id)
    @JoinColumn()
    insuranceCompany: InsuranceCompanyEntity;
    
    @ManyToMany(type => UserEntity, user => user.username)
    @JoinTable()
    patients: UserEntity[];

    @OneToMany(() => QalificationsEntity, qalification => qalification.doctor)
    @JoinTable()
    qalifications: QalificationsEntity[];

    @ManyToOne(() => HospitalEntity, hospital => hospital.doctors, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    hospital: HospitalEntity;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(password: string) {
        return await bcrypt.compare(password, this.password);
    }

    toProfile(user?: DoctorEntity) {
        let patients = null;
        const profile: any = this.toJSON();
        delete profile.patients;
        return {
            ...profile, patients
        }
    }

    toJSON() {
        return classToPlain(this);       
    }

}