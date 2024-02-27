import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { GolosModule } from "./entities/golos/golos.module";
import { PetitionModule } from "./entities/petition/petition.module";
import { UserModule } from "./entities/user/user.module";
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: ".env.local", isGlobal: true }),
        DatabaseModule,
        UserModule,
        PetitionModule,
        GolosModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
