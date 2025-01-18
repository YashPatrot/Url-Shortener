import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail } from "class-validator";

export class SignInDto {
    @ApiProperty({
        description: 'User email address',
        type: String,
        example: 'user@example.com',
        required: true
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User password',
        type: String,
        example: 'password123',
        required: true
    })
    @IsAlphanumeric()
    password: string;
}