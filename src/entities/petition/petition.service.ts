import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VoteService } from "../vote/vote.service";
import { Petition } from "./petition.entity";

@Injectable()
export class PetitionService {
    constructor(
        @InjectRepository(Petition)
        private readonly petitionRepository: Repository<Petition>,
        private voteService: VoteService
    ) {}

    async create(name: string, description: string): Promise<Petition> {
        const createdDate = new Date();

        const instance = this.petitionRepository.create({
            name,
            description,
            createdDate,
        });

        return this.petitionRepository.save(instance);
    }

    async list(): Promise<Petition[]> {
        return this.petitionRepository.find({ relations: { votes: true } });
    }

    async addVote(userId: number, id: number): Promise<string> {
        const instance = await this.petitionRepository.findOne({ where: { id } });

        if (!instance) throw new BadRequestException(`There is no Petition with this id: ${id}`);

        return await this.voteService.create(userId, instance);
    }

    async cancelVote(userId: number, id: number): Promise<string> {
        const instance = await this.petitionRepository.findOne({ where: { id } });

        if (!instance) throw new BadRequestException(`There is no Petition with this id: ${id}`);

        return await this.voteService.delete(userId, instance);
    }
}
