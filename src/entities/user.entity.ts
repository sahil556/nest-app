import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity({ database: 'mongodb'})
export class User{
    @ObjectIdColumn()
    id: string;

    @Column()
    userName: string;

    @Column()
    email: string;

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date
    
    @UpdateDateColumn()
    updatedAt: Date
}