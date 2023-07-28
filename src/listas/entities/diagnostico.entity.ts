import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'diagnosticos'})
export class DiagnosticoEntity{

    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    codigo: string;

    @Column()
    descripcion: string;

}