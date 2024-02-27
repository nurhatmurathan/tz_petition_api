import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Golos } from "../golos/golos.entity";

@Entity()
export class Petition {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "name", type: "varchar", length: 100 })
    name: string;

    @Column({ name: "description", type: "varchar" })
    description: string;

    @Column({ name: "created_date", type: "timestamp" })
    createdDate: Date;

    @OneToMany(() => Golos, (golos) => golos.petition)
    goloses: Golos[];
}
