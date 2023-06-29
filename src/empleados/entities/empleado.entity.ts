import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'empleados'})
export class EmpleadoEntity{

    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({name:'fk_tipo_documento'})
    tipoDocumento:number;

    @Column()
    documento:string;

    @Column()
    genero:number;

    @Column({name:'fecha_nacimiento'})
    fechaNacimiento:Date;

    @Column()
    telefono:string;

    @Column({name:'lugar_espedicion_documento'})
    lugarNacimiento:string;

    @Column({name:'usuario_id'})
    usuarioId:number;


}