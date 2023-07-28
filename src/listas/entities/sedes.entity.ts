import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'sedes'})
export class SedesEntity{

    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    codigo: number;

    @Column()
    descripcion: string;

}