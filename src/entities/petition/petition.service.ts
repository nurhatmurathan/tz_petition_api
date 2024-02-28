import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Petition } from "./petition.entity";

@Injectable()
export class PetitionService {
    constructor(
        @InjectRepository(Petition)
        private readonly PetitionRepository: Repository<Petition>
    ) {}

    async create(name: string, description: string): Promise<Petition> {
        const createdDate = new Date();

        const instance = this.PetitionRepository.create({
            name,
            description,
            createdDate,
        });

        return this.PetitionRepository.save(instance);
    }

    async list(): Promise<Petition[]> {
        return this.PetitionRepository.find();
    }
}
