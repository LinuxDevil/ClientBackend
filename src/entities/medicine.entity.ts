import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract-entities";


@Entity('medicine')
export class MedicineEntity extends AbstractEntity {

    @Column() 
    name: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column()
    description: string;

    @Column()
    imageUrl: string;

    @Column()
    currency: string;

}