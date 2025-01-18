import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsString } from "class-validator";

export class SignUpDto {
    @ApiProperty(
        {
            description: 'Name of the user',
            type: String,
            required: true,
            example: 'John Doe'

        }
    )
    @IsString()
    name: string;

    @ApiProperty(
        {
            description: 'Email of the user',
            type: String,
            required: true,
            example: 'johndoe@mail.com'
        }
    )
    @IsEmail()
    email: string;

    @ApiProperty(
        {
            description: 'Password of the user',
            type: String,
            required: true,
            example: 'Password@123'
        }
    )
    @IsAlphanumeric()
    password: string;

}