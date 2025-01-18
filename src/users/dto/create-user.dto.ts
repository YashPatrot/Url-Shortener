import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class CreateUserDto {
    @ApiProperty({
        description: 'User Id',
        type: String,
        required: true,
        example: '123456'
    })
    @IsString()
    userId: string
    @ApiProperty({
        description: 'Name of the user',
        type: String,
        required: true,
        example: 'John Doe'
    })
    @IsString()
    name: string

    @ApiProperty({
        description: 'Email of the user',
        type: String,
        required: true,
        example: 'jonDoe@email.com'
    })
    @IsEmail()
    email: string
}
