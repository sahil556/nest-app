import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class User{
    @ObjectIdColumn()
    id: string;

    @Column()
    userName: string;

    @Column()
    password: string
}