import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entities";
import { DoctorEntity } from "./doctor.entity";


@Entity('major')
export class MajorEntity  extends AbstractEntity {

    @Column()
    nameAr: string;

    @Column()
    nameEn: string;

    @Column({default: null, nullable: true})
    imageUrl: string | null;

    @OneToMany(() => DoctorEntity, doctor => doctor.id)
    doctors: DoctorEntity[];

}