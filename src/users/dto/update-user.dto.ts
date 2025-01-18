import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({
        description: 'Name of the user',
        type: String,
        required: true,
        example: 'John Doe'
    })
    @IsString()
    name: string;
}
