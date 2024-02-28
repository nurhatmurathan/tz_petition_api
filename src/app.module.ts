import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { PetitionModule } from "./entities/petition/petition.module";
import { UserModule } from "./entities/user/user.module";
import { VoteModule } from "./entities/vote/vote.module";

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: ".env.local", isGlobal: true }),
        DatabaseModule,
        UserModule,
        PetitionModule,
        VoteModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
