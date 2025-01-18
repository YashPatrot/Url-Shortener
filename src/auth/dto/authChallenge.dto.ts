import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from "class-validator";



export class AuthChallengeDto {
    @ApiProperty({ description: 'User email address', example: 'user@example.com', required: true, type: String })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'User password', example: 'password123', required: true, type: String })
    @IsAlphanumeric()
    password: string;

    @ApiProperty({ example: 'NEW_PASSWORD_REQUIRED', description: 'Challenge name' })
    @IsNotEmpty()
    challengeName: (typeof ChallengeNameType)[keyof typeof ChallengeNameType];;

    @ApiProperty({ example: 'session-string', description: 'Session string' })
    @IsString()
    session: string;
}

export declare const ChallengeNameType: {
    readonly ADMIN_NO_SRP_AUTH: "ADMIN_NO_SRP_AUTH";
    readonly CUSTOM_CHALLENGE: "CUSTOM_CHALLENGE";
    readonly DEVICE_PASSWORD_VERIFIER: "DEVICE_PASSWORD_VERIFIER";
    readonly DEVICE_SRP_AUTH: "DEVICE_SRP_AUTH";
    readonly EMAIL_OTP: "EMAIL_OTP";
    readonly MFA_SETUP: "MFA_SETUP";
    readonly NEW_PASSWORD_REQUIRED: "NEW_PASSWORD_REQUIRED";
    readonly PASSWORD: "PASSWORD";
    readonly PASSWORD_SRP: "PASSWORD_SRP";
    readonly PASSWORD_VERIFIER: "PASSWORD_VERIFIER";
    readonly SELECT_CHALLENGE: "SELECT_CHALLENGE";
    readonly SELECT_MFA_TYPE: "SELECT_MFA_TYPE";
    readonly SMS_MFA: "SMS_MFA";
    readonly SMS_OTP: "SMS_OTP";
    readonly SOFTWARE_TOKEN_MFA: "SOFTWARE_TOKEN_MFA";
    readonly WEB_AUTHN: "WEB_AUTHN";
};

