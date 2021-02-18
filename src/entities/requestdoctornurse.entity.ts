import { Column, Entity, JoinTable, OneToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entities";
import { CityEntity } from "./city.entity";
import { MajorEntity } from "./major.entity";
import { UserEntity } from "./user.entity";

@Entity('requestdoctornurse')
export class RequestDoctorNurseEntity extends AbstractEntity {

    @Column()
    total: string;y

    @OneToOne(() => MajorEntity, major => major.id )
    @JoinTable()
    major: MajorEntity;

    @OneToOne(() => UserEntity, user => user.id)
    @JoinTable()
    user: UserEntity;

    @OneToOne(() => CityEntity, city => city.id)
    @JoinTable()
    city: CityEntity;

}