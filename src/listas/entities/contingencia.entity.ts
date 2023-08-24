import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'contingencias'})
export class ContingenciaEntity{

    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    codigo: number;

    @Column()
    descripcion: string;

    @Column()
    activo?:boolean;

}