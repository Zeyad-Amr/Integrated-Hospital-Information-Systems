import { ApiProperty } from "@nestjs/swagger"
import { GenderEnum, IdentityEnum } from "@prisma/client"
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Validate } from "class-validator"
import { IsValidEnumValue } from "src/shared/special-validator"

export class CreatePersonDto {
    @ApiProperty({
        type: String,
        example: 'Ahmed',
    })
    @IsNotEmpty()
    @IsString()
    firstName: string

    @ApiProperty({
        type: String,
        example: 'Raouf',
    })
    @IsNotEmpty()
    @IsString()
    secondName: string

    @ApiProperty({
        type: String,
        example: 'Mohamed',
    })
    @IsNotEmpty()
    @IsString()
    thirdName: string

    @ApiProperty({
        type: String,
        example: 'Hussein',
    })
    @IsNotEmpty()
    @IsString()
    fourthName: string

    @ApiProperty({
        type: String,
        example: '30002103105556',
    })
    @IsOptional()
    @IsString()
    SSN: string

    @ApiProperty({
        type: String,
        example: 'NATIONALIDCARD',
    })

    @IsOptional()
    @Validate(IsValidEnumValue, [IdentityEnum])
    verificationMethod: IdentityEnum

    @ApiProperty({
        type: String,
        example: 'MALE',
    })
    @IsString()
    @IsNotEmpty()
    @Validate(IsValidEnumValue, [GenderEnum])
    gender: GenderEnum

    @ApiProperty({
        type: String,
        example: '2000-05-10T00:00:00.000Z',
    })
    @IsDateString()
    @IsOptional()
    birthDate: Date

    @ApiProperty({
        type: String,
        example: '+201098157522',
    })
    @IsOptional()
    @IsPhoneNumber()
    phone: string

    @ApiProperty({
        type: String,
        example: 'Giza',
    })
    @IsOptional()
    @IsString()
    governate: string

    @ApiProperty({
        type: String,
        example: '6th of october',
    })
    @IsOptional()
    @IsString()
    address: string
}
