import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetitionController } from "./petition.controller";
import { Petition } from "./petition.entity";
import { PetitionService } from "./petition.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Petition]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: { expiresIn: "5h" },
            }),
        }),
    ],
    controllers: [PetitionController],
    providers: [PetitionService],
    exports: [PetitionService],
})
export class PetitionModule {}
