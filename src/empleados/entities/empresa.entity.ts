import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'empresa'})
export class EmpresaEntity{

    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    nombre: string;

    @Column()
    nit: string;

    @Column({name:'tipo_documento'})
    tipoDocumento: string;

    @Column()
    activo?:boolean;
 
}   