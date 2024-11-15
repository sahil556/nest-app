import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class UsersModule{
    @ObjectIdColumn()
    id: string;

    @Column()
    userName: string;

    @Column()
    password: string
}