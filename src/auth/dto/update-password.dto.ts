import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsString } from "class-validator";

export class UpdatePasswordDto {

    @ApiProperty({
        description: 'Old password',
        type: String,
        example: 'Password@123',
        required: true
    })
    @IsAlphanumeric()
    oldPassword: string;

    @ApiProperty({
        description: 'New password',
        type: String,
        example: 'Password@123',
        required: true
    })
    @IsAlphanumeric()
    newPassword: string;

    @ApiProperty({
        description: 'Access token',
        type: String,
        example: 'access-token',
    })
    @IsString()
    accessToken: string;
}