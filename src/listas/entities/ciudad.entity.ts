import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'municipios'})
export class CiudadEntity{

    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    codigo: number;

    @Column()
    descripcion: string;

    @Column({name:'departamento_codigo'})
    codigoDepartamento: number;
}