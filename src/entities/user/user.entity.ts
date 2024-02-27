import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "login", type: "varchar", length: 100, unique: true })
    login: string;

    @Column({ name: "password", type: "varchar" })
    password: string;
}
