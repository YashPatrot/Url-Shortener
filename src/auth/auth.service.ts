import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthChallengeDto } from './dto/authChallenge.dto';
import { SignInDto } from './dto/signin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CognitoService } from 'src/aws/cognito/cognito.service';
import { UsersService } from 'src/users/users.service';
import { Strings } from 'src/constants';

@Injectable()
export class AuthService {
    constructor(private readonly cognitoService: CognitoService, private readonly usersService: UsersService) {
    }

    async signup(data: SignUpDto) {
        try {
            const user = await this.cognitoService.signUp(data.name, data.email, data.password);
            await this.usersService.create({ userId: user.User.Username, name: data.name, email: data.email });
            const emailAttr = user.User.Attributes.find(attr => attr.Name === 'email');
            const nameAttr = user.User.Attributes.find(attr => attr.Name === 'name');
            const userIdAttr = user.User.Attributes.find(attr => attr.Name === 'sub');
            const userCreatedDate = user.User.UserCreateDate;
            return {
                status: "success",
                message: Strings.AUTH.SIGNUP_SUCCESS,
                data: {
                    userId: userIdAttr,
                    email: emailAttr,
                    name: nameAttr,
                    userStatus: "FORCE_CHANGE_PASSWORD",
                    createdAt: userCreatedDate
                }
            }

        }
        catch (error) {
            if (error.__type === Strings.AUTH.SIGNUP_FAILURE.USERNAME_EXISTS_EXCEPTION.TYPE) {
                throw new ConflictException(Strings.AUTH.SIGNUP_FAILURE.USERNAME_EXISTS_EXCEPTION.MESSAGE);
            } else if (error.__type === Strings.AUTH.SIGNUP_FAILURE.INVALID_PASSWORD_EXCEPTION.TYPE) {
                throw new BadRequestException(Strings.AUTH.SIGNUP_FAILURE.INVALID_PASSWORD_EXCEPTION.MESSAGE);
            } else {
                throw new InternalServerErrorException('An error occurred during signup. Please try again later.');
            }
        }
    }

    async signin(data: SignInDto) {
        try {
            const user = await this.cognitoService.signIn(data.email, data.password);
            if (user.ChallengeName) {
                const challengeName = user.ChallengeName;
                const userIdForSrp = user.ChallengeParameters.userIdForSrp;
                const requiredAttributes = user.ChallengeParameters.requiredAttributes;
                const userAttributes = user.ChallengeParameters.userAttributes;
                const session = user.Session;
                return {
                    status: "success",
                    data: {
                        challengeName: challengeName,
                        challengeParameters: {
                            userIdForSrp: userIdForSrp,
                            requiredAttributes: requiredAttributes,
                            userAttributes: userAttributes
                        },
                        session: session
                    }
                };
            }

            else {
                const accessToken = user.AuthenticationResult.AccessToken
                const expiresIn = user.AuthenticationResult.ExpiresIn
                const idToken = user.AuthenticationResult.IdToken
                const refreshToken = user.AuthenticationResult.RefreshToken
                const tokenType = user.AuthenticationResult.TokenType

                return {
                    status: "success",
                    data: {
                        AccessToken: accessToken,
                        ExpiresIn: expiresIn,
                        IdToken: idToken,
                        RefreshToken: refreshToken,
                        TokenType: tokenType
                    }
                }

            }
        }
        catch (error) {
            if (error.__type === Strings.AUTH.LOGIN_FAILURE.NOT_AUTHORIZED_EXCEPTION.TYPE) {
                throw new ConflictException(Strings.AUTH.LOGIN_FAILURE.NOT_AUTHORIZED_EXCEPTION.MESSAGE);
            } else {
                throw new InternalServerErrorException('An error occurred during signup. Please try again later.');
            }
        }
    }

    async responseToAuthChallenge(data: AuthChallengeDto) {
        try {
            const user = await this.cognitoService.responseToAuthChallenge(data.email, data.password, data.challengeName, data.session);
            const accessToken = user.AuthenticationResult.AccessToken
            const expiresIn = user.AuthenticationResult.ExpiresIn
            const idToken = user.AuthenticationResult.IdToken
            const refreshToken = user.AuthenticationResult.RefreshToken
            const tokenType = user.AuthenticationResult.TokenType

            return {
                status: "success",
                data: {
                    AccessToken: accessToken,
                    ExpiresIn: expiresIn,
                    IdToken: idToken,
                    RefreshToken: refreshToken,
                    TokenType: tokenType
                }
            }
        }
        catch (error) {
            if (error.__type === Strings.AUTH.LOGIN_FAILURE.NOT_AUTHORIZED_EXCEPTION.TYPE) {
                throw new ConflictException(Strings.AUTH.LOGIN_FAILURE.NOT_AUTHORIZED_EXCEPTION.MESSAGE);
            } else {
                throw new InternalServerErrorException('An error occurred during signup. Please try again later.');
            }
        }
    }

    async updatePassword(data: UpdatePasswordDto) {
        try {
            await this.cognitoService.updatePassword(data.oldPassword, data.newPassword, data.accessToken);
            return {
                status: 'success',
                message: Strings.AUTH.UPDATE_PASSWORD.SUCCESS_MESSAGE
            }
        }
        catch (error) {
            if (error.__type === Strings.AUTH.LOGIN_FAILURE.NOT_AUTHORIZED_EXCEPTION.TYPE) {
                throw new ConflictException(Strings.AUTH.LOGIN_FAILURE.NOT_AUTHORIZED_EXCEPTION.MESSAGE);
            } else {
                throw new InternalServerErrorException(Strings.AUTH.UPDATE_PASSWORD.FAILURE_MESSAGE);
            }
        }
    }
    async signout(accessToken: string) {
        try {
            await this.cognitoService.signOut(accessToken)
            return {
                status: 'success',
                message: Strings.AUTH.SIGNOUT.SUCCESS_MESSAGE
            }
        }
        catch (error) {
            if (error.__type === Strings.AUTH.LOGIN_FAILURE.NOT_AUTHORIZED_EXCEPTION.TYPE) {
                throw new ConflictException(Strings.AUTH.LOGIN_FAILURE.NOT_AUTHORIZED_EXCEPTION.MESSAGE);
            } else {
                throw new InternalServerErrorException(Strings.AUTH.SIGNOUT.FAILURE_MESSAGE);
            }
        }
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
