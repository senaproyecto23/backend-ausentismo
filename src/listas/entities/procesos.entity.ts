import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'procesos'})
export class ProcesosEntity{

    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    codigo: number;

    @Column()
    descripcion: string;

}