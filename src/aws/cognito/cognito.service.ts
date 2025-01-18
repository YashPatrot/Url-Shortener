import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminCreateUserCommandInput, AdminInitiateAuthCommand, AdminInitiateAuthCommandInput, ChangePasswordCommandInput, ChangePasswordCommand, RespondToAuthChallengeCommandInput, RespondToAuthChallengeCommand, ChallengeNameType, AdminCreateUserCommandOutput, AdminInitiateAuthCommandOutput, RespondToAuthChallengeCommandOutput, ChangePasswordCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import crypto from 'crypto';

@Injectable()
export class CognitoService {
    private readonly AWS_COGNITO_USER_POOL_ID: string;
    private readonly AWS_COGNITO_CLIENT_ID: string;
    private readonly AWS_COGNITO_CLIENT_SECRET: string;
    private readonly cognitoIdentityProviderClient: CognitoIdentityProviderClient;
    constructor(private readonly configService: ConfigService) {
        this.AWS_COGNITO_USER_POOL_ID = this.configService.get<string>('AWS_COGNITO_USER_POOL_ID');
        this.AWS_COGNITO_CLIENT_ID = this.configService.get<string>('AWS_COGNITO_CLIENT_ID');
        this.AWS_COGNITO_CLIENT_SECRET = this.configService.get<string>('AWS_COGNITO_CLIENT_SECRET');
        this.cognitoIdentityProviderClient = new CognitoIdentityProviderClient({
            region: this.configService.get<string>('AWS_REGION'),
        });
    }

    /**
     * This function is used to sign up a user in the Cognito User Pool
     * @param name 
     * @param email 
     * @param password 
     * @returns  Promise<AdminCreateUserCommandOutput>
     * 
     */
    async signUp(name: string, email: string, password: string): Promise<AdminCreateUserCommandOutput> {
        try {
            const createUserParams: AdminCreateUserCommandInput = {
                UserPoolId: this.AWS_COGNITO_USER_POOL_ID,
                Username: email,
                UserAttributes: [
                    {
                        Name: 'email',
                        Value: email
                    },
                    {
                        Name: 'name',
                        Value: name
                    }
                ],
                TemporaryPassword: password,
                MessageAction: 'SUPPRESS',
                DesiredDeliveryMediums: ['EMAIL']
            };
            return await this.cognitoIdentityProviderClient.send(new AdminCreateUserCommand(createUserParams));
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * This function is used to sign in a user in the Cognito User Pool
     * @param email 
     * @param password 
     * @returns Promise<AdminInitiateAuthCommandOutput>
     */
    async signIn(email: string, password: string): Promise<AdminInitiateAuthCommandOutput> {
        try {
            const secretHash = this.generateSecretHash(this.AWS_COGNITO_CLIENT_ID, this.AWS_COGNITO_CLIENT_SECRET, email);
            const singInParams: AdminInitiateAuthCommandInput = {
                UserPoolId: this.AWS_COGNITO_USER_POOL_ID,
                AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
                AuthParameters: {
                    'USERNAME': email,
                    'PASSWORD': password,
                    'SECRET_HASH': secretHash
                },
                ClientId: this.AWS_COGNITO_CLIENT_ID
            };
            return await this.cognitoIdentityProviderClient.send(new AdminInitiateAuthCommand(singInParams));
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * This function is used to respond to the auth challenge
     * @param userName 
     * @param password 
     * @param challengeName 
     * @param session 
     * @returns Promise<RespondToAuthChallengeCommandOutput>
     */
    async responseToAuthChallenge(userName: string, password: string, challengeName: ChallengeNameType, session: string): Promise<RespondToAuthChallengeCommandOutput> {
        try {
            const secretHash = this.generateSecretHash(this.AWS_COGNITO_CLIENT_ID, this.AWS_COGNITO_CLIENT_SECRET, userName);
            const challengeResponseParams: RespondToAuthChallengeCommandInput = {
                ClientId: this.AWS_COGNITO_CLIENT_ID,
                ChallengeName: challengeName,
                ChallengeResponses: {
                    'USERNAME': userName,
                    'NEW_PASSWORD': password,
                    'SECRET_HASH': secretHash
                },
                Session: session,
            };
            return await this.cognitoIdentityProviderClient.send(new RespondToAuthChallengeCommand(challengeResponseParams));
        }
        catch (error) {
            throw error;
        }

    }

    /**
     * This function is used to update the password of the user
     * @param oldPassword 
     * @param newPassord 
     * @param accessToken 
     * @returns  Promise<ChangePasswordCommandOutput>
     */

    async updatePassword(oldPassword: string, newPassord: string, accessToken: string): Promise<ChangePasswordCommandOutput> {
        try {
            const updatePasswordParams: ChangePasswordCommandInput = {
                PreviousPassword: oldPassword,
                ProposedPassword: newPassord,
                AccessToken: accessToken
            };
            return await this.cognitoIdentityProviderClient.send(new ChangePasswordCommand(updatePasswordParams));
        }
        catch (error) {
            throw error;
        }
    }

    /**************************************HELPER FUNCTIONS******************************************************/
    generateSecretHash(clientId: string, clientSecret: string, username: string) {
        const hmac = crypto.createHmac('sha256', clientSecret);
        hmac.update(username + clientId);
        return hmac.digest('base64');
    }
}
