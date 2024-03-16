import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSpecializationDto {

    @ApiProperty({ required: true, example: 'Cardiology' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ required: false, example: 'Study of the heart' })
    @IsString()
    @IsOptional()
    description: string;
}
