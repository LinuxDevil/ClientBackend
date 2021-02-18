import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract-entities";

@Entity('menuitem')
export class MenuItem extends AbstractEntity {

    @Column({default: null, nullable: true})
    image_url: string| null;
    @Column()
    nameEn: string;
    @Column()
    nameAr: string;
    @Column()
    isAvailable: boolean;
    @Column()
    isUser: boolean;
    @Column({default: false, nullable: true})
    isSub: boolean;

}