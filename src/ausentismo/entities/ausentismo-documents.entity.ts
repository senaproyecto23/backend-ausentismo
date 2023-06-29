import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'ausentismo_documentos'})
export class AusentismoDocumentsEntity{

    @PrimaryGeneratedColumn()
    id?:number;
 
    @Column({name:'ausentismo_id'})
    ausentismoId:number;

    @Column({name:'empleado_documento'})
    empleadoDocumento:string;

    @Column({name:'path_documento'})
    pathDocumento:string;
}