import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Golos } from "../golos/golos.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "login", type: "varchar", length: 100, unique: true })
    login: string;

    @Column({ name: "password", type: "varchar" })
    password: string;

    @OneToMany(() => Golos, (golos) => golos.user)
    goloses: Golos[];
}
