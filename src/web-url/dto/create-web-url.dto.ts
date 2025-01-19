import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUrl } from "class-validator";

export class CreateWebUrlDto {
    @ApiProperty({
        description: 'URL to be shortened',
        type: String,
        required: true,
        example: 'https://www.google.com'
    })
    @IsUrl()
    url: string;
    @ApiProperty({
        description: 'Custom Alias for the shortened URL',
        type: String,
        required: false,
        example: 'google'
    })
    @IsOptional()
    customAlias?: string;
}
