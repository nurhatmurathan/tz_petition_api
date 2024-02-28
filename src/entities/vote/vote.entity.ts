import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Petition } from "../petition/petition.entity";
import { User } from "../user/user.entity";

@Entity()
@Unique(["user", "petition"])
export class Vote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "created_date", type: "timestamp" })
    createdDate: Date;

    @ManyToOne(() => User, (user) => user.votes)
    user: User;

    @ManyToOne(() => Petition, (petition) => petition.votes)
    petition: Petition;
}
