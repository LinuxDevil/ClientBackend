import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entities";
import { classToPlain, Exclude } from 'class-transformer';
import { } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { AppointmentEntity } from "./appointment.entity";
import { InsuranceCompanyEntity } from "./insurance.entity";

@Entity('users')
export class UserEntity extends AbstractEntity {
    @Column()
    email: string;
    
    @Column({default: '', nullable: true})
    nickname: string;

    @Column({default: '', nullable: true})
    nationalityId: string;

    @Column({ unique: true })
    username: string;

    @Column({ default: '' })
    name: string;

    @Column({ default: 'Amman' })
    city: string;

    @Column({ default: 'Shafa Badran' })
    district: string;

    @Column({ default: '' })
    bio: string;

    @Column({ default: null, nullable: true })
    image: string | null;

    @Column({ default: '' })
    insuranceNumber: string;

    @Column()
    @Exclude()
    password: string;

    @OneToOne(() => InsuranceCompanyEntity, insurance => insurance.id)
    @JoinColumn()
    insuranceCompany: InsuranceCompanyEntity;

    @ManyToMany(type => UserEntity, user => user.followee)
    @JoinTable()
    followers: UserEntity[];

    @ManyToMany(type => UserEntity, user => user.subUsers)
    @JoinTable()
    subUsers: UserEntity[];

    @ManyToOne(() => AppointmentEntity, appointment => appointment.user)
    @JoinTable()
    appointments: AppointmentEntity[];

    @ManyToMany(type => UserEntity, user => user.followers)
    followee: UserEntity[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(password: string) {
        return await bcrypt.compare(password, this.password);
    }

    toProfile(user?: UserEntity) {
        let following = null;
        if (user) {
            following = this.followers.includes(user);
        }
        const profile: any = this.toJSON();
        delete profile.followers;
        return {
            ...profile, following
        }
    }

    toJSON() {
        return classToPlain(this);
    }
}