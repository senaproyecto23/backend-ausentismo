import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'departamentos'})
export class DepartamentoEntity{

    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    codigo: number;

    @Column()
    descripcion: string;
}