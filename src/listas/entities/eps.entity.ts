import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'eps'})
export class EpsEntity{

    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    codigo: string;

    @Column()
    nombre: string;
 
}   