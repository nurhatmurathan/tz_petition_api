import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vote } from "../vote/vote.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "login", type: "varchar", length: 100, unique: true })
    login: string;

    @Column({ name: "password", type: "varchar" })
    password: string;

    @OneToMany(() => Vote, (vote) => vote.user)
    votes: Vote[];
}
