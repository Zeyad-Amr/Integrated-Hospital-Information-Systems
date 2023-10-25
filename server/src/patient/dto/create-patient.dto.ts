import { ApiProperty } from "@nestjs/swagger"
import { IdentityEnum, GenderEnum, KinshipEnum } from "@prisma/client"
import { Type } from "class-transformer"
import {
    IsDateString,
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Validate,
    ValidateNested,
} from "class-validator"
import { CreatePersonDto } from "src/person/dto/create-person.dto"
import { IsValidEnumValue } from "src/shared/special-validator"


export class VisitDto {

    @IsInt()
    @IsNotEmpty()
    sequenceNumber: number

    @IsOptional()
    @Validate(IsValidEnumValue, [KinshipEnum])
    kinship: KinshipEnum

    @IsOptional()
    @IsString()
    code: string
}

export class CreatePatientDto {
    @IsObject()
    @ValidateNested()
    @Type(() => CreatePersonDto)
    patient: CreatePersonDto

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => CreatePersonDto)
    companion: CreatePersonDto

    @IsObject()
    @ValidateNested()
    @Type(() => VisitDto)
    visit: VisitDto


}
