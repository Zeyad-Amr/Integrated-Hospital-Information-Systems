import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({ required: true, example: 'Admin' })
    @IsNotEmpty()
    @IsString()
    value: string;
}
