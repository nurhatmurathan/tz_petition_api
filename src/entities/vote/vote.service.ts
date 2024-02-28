import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Petition } from "../petition/petition.entity";
import { Vote } from "./vote.entity";

@Injectable()
export class VoteService {
    constructor(
        @InjectRepository(Vote)
        private readonly voteRepository: Repository<Vote>
    ) {}

    async create(userId: number, petition: Petition): Promise<string> {
        console.log(await this.voted(userId, petition.id));

        if (await this.voted(userId, petition.id))
            throw new BadRequestException(`You are already voted to this petition: ${petition.name}`);

        const createdDate = new Date();

        const instance = this.voteRepository.create({
            user: { id: userId },
            petition: petition,
            createdDate,
        });

        const savedInstance = await this.voteRepository.save(instance);
        console.log(savedInstance);
        return `you have successfully voted on the ${petition.name} petition`;
    }

    async delete(userId: number, petition: Petition): Promise<string> {
        if (!(await this.voted(userId, petition.id)))
            throw new BadRequestException(`you didn't vote on this petition: ${petition.name}`);

        const removedInstance = await this.voteRepository.delete({ user: { id: userId }, petition });
        console.log(removedInstance);
        return `you have successfully cancel vote on the ${petition.name} petition`;
    }

    private async voted(userId: number, petitionId: number) {
        const instance = await this.voteRepository.findOne({
            where: { user: { id: userId }, petition: { id: petitionId } },
        });
        console.log(instance);

        if (instance) return true;
        return false;
    }
}
