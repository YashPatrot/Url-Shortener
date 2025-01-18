import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthChallengeDto } from './dto/authChallenge.dto';
import { SignInDto } from './dto/signin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CognitoService } from 'src/aws/cognito/cognito.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly cognitoService: CognitoService, private readonly usersService: UsersService) {
    }

    async signup(data: SignUpDto) {
        try {
            const response = await this.cognitoService.signUp(data.name, data.email, data.password);
            await this.usersService.create({ userId: response.User.Username, name: data.name, email: data.email });
            return response;
        }
        catch (error) {
            throw error;
        }
    }

    async signin(data: SignInDto) {
        try {
            return await this.cognitoService.signIn(data.email, data.password);
        }
        catch (error) {
            throw error;
        }
    }

    async responseToAuthChallenge(data: AuthChallengeDto) {
        try {
            return await this.cognitoService.responseToAuthChallenge(data.email, data.password, data.challengeName, data.session);
        }
        catch (error) {
            throw error;
        }
    }

    async updatePassword(data: UpdatePasswordDto) {
        try {
            return await this.cognitoService.updatePassword(data.oldPassword, data.newPassword, data.accessToken);
        }
        catch (error) {
            throw error;
        }
    }
    async signout() {
        return 'signout';
    }

    async validateToken(paload: string) {
        try {
            return await this.cognitoService.validateAccessToken(paload);
        }
        catch (error) {
            throw error;
        }
    }
}
