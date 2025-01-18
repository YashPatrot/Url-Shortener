import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthChallengeDto } from './dto/authChallenge.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    signup(@Body() data: SignUpDto) {
        return this.authService.signup(data);
    }

    @Post('signin')
    signin(@Body() data: SignInDto) {
        return this.authService.signin(data);
    }

    @Post('challenge')
    responseToAuthChallenge(@Body() data: AuthChallengeDto) {
        return this.authService.responseToAuthChallenge(data);
    }

    @Post('update-password')
    updatePassword(@Body() data: UpdatePasswordDto) {
        return this.authService.updatePassword(data);
    }
    signout() {
        return this.authService.signout();
    }
}
