import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { UserDto } from "./../entities/user/dto/user.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./guards/auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    signIn(@Body() signInDto: UserDto) {
        return this.authService.signIn(signInDto.login, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }
}
