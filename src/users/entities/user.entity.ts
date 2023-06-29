import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class UserEntity{

    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    token?:string;

    @Column()
    rol:number;

}