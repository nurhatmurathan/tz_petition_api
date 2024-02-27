import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserDto } from "./../entities/user/dto/user.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./guards/auth.guard";
@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("sign-in")
    signIn(@Body() signInDto: UserDto) {
        return this.authService.signIn(signInDto.login, signInDto.password);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post("sign-up")
    signUp(@Body() signUpDto: UserDto) {
        return this.authService.signUp(signUpDto.login, signUpDto.password);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }
}
