import { Column, Entity, JoinTable, OneToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entities";
import { UserEntity } from "./user.entity";

@Entity('pharmacyorders')
export class PharmacyOrders  extends AbstractEntity {
    @Column()
    medicine: string;

    @Column({default: null, nullable: true})
    imageUrl: string | null;

    @OneToOne(() => UserEntity, user => user.id)
    @JoinTable()
    user: UserEntity;

    //TOOD: One-One PlaceID relation
}