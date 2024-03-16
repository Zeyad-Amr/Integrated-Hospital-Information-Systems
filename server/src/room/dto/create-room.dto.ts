import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoomDto {

    @ApiProperty({ required: true, example: 'Room 1' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ required: false, example: 'Triage Department' })
    @IsString()
    @IsOptional()
    location: string;
}
