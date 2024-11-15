import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ database: 'mongodb'})
export class User{
    @ObjectIdColumn()
    id: string;

    @Column()
    userName: string;

    @Column()
    password: string
}