import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'ocupaciones'})
export class OcupacionEntity{

    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    codigo: number;

    @Column()
    descripcion: string;

}