import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserModule } from "src/entities/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Global()
@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: { expiresIn: "5h" },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService],
    exports: [JwtService],
})
export class AuthModule {}
