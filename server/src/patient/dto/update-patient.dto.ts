import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePersonDto } from 'src/person/dto/create-person.dto';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePatientDto {

    @ApiProperty({ type: CreatePersonDto, required: true })
    @ValidateNested()
    @Type(() => CreatePersonDto)
    patient: CreatePersonDto

    @ApiProperty({ type: CreatePersonDto })
    @IsOptional()
    @ValidateNested()
    @Type(() => CreatePersonDto)
    companion: CreatePersonDto

    @ApiProperty({ type: String, example: "202310311", required: true })
    @IsNotEmpty()
    @IsString()
    visitCode: string
}
