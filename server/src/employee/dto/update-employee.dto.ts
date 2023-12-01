import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';
import {
    IsObject,
    IsOptional,
    IsUUID,
    Validate,
    ValidateNested,
} from 'class-validator';
import { IsValidEnumValue } from 'src/shared/special-validator';
import { RoleEnum, ShiftEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import { UpdatePersonDto } from 'src/person/dto/update-person.dto';

export class UpdateEmployeeDto {

    @ApiProperty({ type: UpdatePersonDto, required: false })
    @IsObject()
    @ValidateNested()
    @Type(() => UpdatePersonDto)
    personalData: UpdatePersonDto

    @ApiProperty({
        type: String,
        example: 'RECEPTIONIST',
    })
    @IsOptional()
    @Validate(IsValidEnumValue, [RoleEnum])
    role: RoleEnum

    @ApiProperty({
        type: String,
        example: 'MORNING12',
    })
    @IsOptional()
    @Validate(IsValidEnumValue, [ShiftEnum])
    shift: ShiftEnum;

    @ApiProperty({
        type: String,
        example: 'RECEPTIONIST',
    })
    @IsOptional()
    @IsUUID()
    departmentId: string;

}
