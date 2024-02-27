import { Module } from "@nestjs/common";
import { PetitionController } from "./petition.controller";
import { PetitionService } from "./petition.service";

@Module({
    controllers: [PetitionController],
    providers: [PetitionService],
})
export class PetitionModule {}
