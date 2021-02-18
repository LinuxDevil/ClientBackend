import { classToPlain, Exclude } from "class-transformer";
import { BeforeInsert, Column, Entity, JoinTable, OneToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entities";
import { AppointmentEntity } from "./appointment.entity";
import { CityEntity } from "./city.entity";
import { ConsultEntity } from "./consult.entity";
import { MedicineEntity } from "./medicine.entity";
import { PharmacyOrders } from "./pharmacyorder.entity";
import * as bcrypt from 'bcryptjs';
import { InsuranceCompanyEntity } from "./insurance.entity";

@Entity('place')
export class PlaceEntity extends AbstractEntity {

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column() 
    bio: string;
    
    @Column()
    @Exclude()
    password: string;

    @Column()
    placeName: string;

    @Column()
    locationName: string;

    @Column() 
    date: Date;

    @Column()
    time: Date;

    @Column({default: null, nullable: true}) 
    imageUrl: string | null;

    @Column()
    watchers: number;

    @Column()
    visitors: number;

    @OneToMany(() => InsuranceCompanyEntity, insurance => insurance.id)
    @JoinTable()
    insuranceCompany: InsuranceCompanyEntity[];

    @Column()
    insuranceNumber: string;

    @Column()
    type: string;

    @Column()
    phoneNumber: string;

    @OneToOne(() => CityEntity, city => city.id)
    @JoinTable()
    city: CityEntity;

    @OneToMany(() => MedicineEntity, medicine => medicine.id)
    @JoinTable()
    medicineAvailable: MedicineEntity[];

    @OneToMany(() => AppointmentEntity, appointment => appointment.id)
    @JoinTable()
    appointments: AppointmentEntity[];

    @OneToMany(() => ConsultEntity, consult => consult.id)
    @JoinTable()
    consultation: ConsultEntity[];

    @OneToMany(() => PharmacyOrders, pharmacyOrder => pharmacyOrder.id)
    @JoinTable()
    orders: PharmacyOrders[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(password: string) {
        return await bcrypt.compare(password, this.password);
    }

    toProfile(place?: PlaceEntity) {
        const profile: any = this.toJSON();
        delete profile.orders;
        return {
            ...profile
        }
    }

    toJSON() {
        return classToPlain(this);    
    }

}