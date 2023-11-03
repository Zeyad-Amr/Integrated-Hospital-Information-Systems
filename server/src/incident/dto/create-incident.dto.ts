import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Length, MaxLength, MinLength, ValidateNested } from "class-validator";
import { CreatePersonDto } from "src/person/dto/create-person.dto";


class CarNumber {
    @ApiProperty({ type: String, example: "و" })
    @IsString()
    @Length(1)
    firstChar: string

    @ApiProperty({ type: String, example: "س" })
    @IsString()
    @Length(1)
    @IsOptional()
    secondChar: string

    @ApiProperty({ type: String, example: "أ" })
    @IsString()
    @Length(1)
    @IsOptional()
    thirdChar: string

    @ApiProperty({ type: Number, example: "136" })
    @IsNumber()
    @IsNotEmpty()
    number: number
}

export class CreateIncidentDto {
    @ApiProperty({ type: String, example: "Accident" })
    @IsString()
    @IsOptional()
    describtion: string

    @ApiProperty({ type: Number, example: 10 })
    @IsInt()
    @IsNotEmpty()
    numerOfPatients: number

    @IsOptional()
    @IsObject()
    @ApiProperty({ type: CarNumber })
    @ValidateNested()
    @Type(() => CarNumber)
    car: CarNumber

    @ApiProperty({ type: [CreatePersonDto]})
    @IsArray()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreatePersonDto)
    companions: CreatePersonDto[]
}

