import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "./../entities/user/user.entity";
import { UserService } from "./../entities/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(login: string, password: string) {
        const user = await this.userService.findOneByLogin(login);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException();
        }

        return this.getAccessRefreshToken(user);
    }

    async signUp(login: string, password: string) {
        const user = await this.userService.findOneByLogin(login);

        if (user) {
            throw new BadRequestException("This user is already loged in!");
        }

        await this.userService.create(login, password);

        return this.signIn(login, password);
    }

    private async getAccessRefreshToken(user: User) {
        const payload = { sub: user.id, login: user.login };
        console.log("get-tokens", user);

        return {
            access: await this.jwtService.signAsync(payload),
            refresh: await this.jwtService.signAsync(payload, {
                expiresIn: "24h",
            }),
        };
    }
}
