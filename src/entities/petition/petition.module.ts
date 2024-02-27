import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetitionController } from "./petition.controller";
import { Petition } from "./petition.entity";
import { PetitionService } from "./petition.service";

@Module({
    imports: [TypeOrmModule.forFeature([Petition])],
    controllers: [PetitionController],
    providers: [PetitionService],
    exports: [PetitionService],
})
export class PetitionModule {}
