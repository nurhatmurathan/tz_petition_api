import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GolosController } from "./golos.controller";
import { Golos } from "./golos.entity";
import { GolosService } from "./golos.service";

@Module({
    imports: [TypeOrmModule.forFeature([Golos])],
    controllers: [GolosController],
    providers: [GolosService],
    exports: [GolosService],
})
export class GolosModule {}
