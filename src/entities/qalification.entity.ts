import { Column, Entity, JoinTable, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entities";
import { DoctorEntity } from "./doctor.entity";

@Entity('qalification')
export class QalificationsEntity extends AbstractEntity {

    @Column()
    qalificationName: string;
    
    @Column()
    qalificationImage: string;

    @Column() 
    qalificationIssueDate: Date;

    @ManyToOne(() => DoctorEntity, (doctor: DoctorEntity) => doctor.qalifications)
    @JoinTable()
    doctor: DoctorEntity;
    
}