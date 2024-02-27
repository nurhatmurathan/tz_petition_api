import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Petition } from "../petition/petition.entity";
import { User } from "../user/user.entity";

@Entity()
export class Golos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "created_date", type: "timestamp" })
    createdDate: Date;

    @ManyToOne(() => User, (user) => user.goloses)
    user: User;

    @ManyToOne(() => Petition, (petition) => petition.goloses)
    petition: Petition;
}
