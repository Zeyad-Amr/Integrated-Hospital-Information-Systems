import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { IsValidEnumValue } from 'src/shared/special-validator';
import { RoleEnum, ShiftEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import { UpdatePersonDto } from 'src/person/dto/update-person.dto';

export class AuthUpdateDto {
  @ApiProperty({
    type: String,
    description: 'employee username (required field)',
    example: 'Admin123',
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  username: string;

  @ApiProperty({
    type: String,
    example: 'ahmedraouf@gmail.com',
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;
}
export class UpdateEmployeeDto {
  @ApiProperty({ type: UpdatePersonDto, required: false })
  @IsObject()
  @ValidateNested()
  @Type(() => UpdatePersonDto)
  personalData: UpdatePersonDto;

  @ApiProperty({
    type: String,
    example: 'EMPLOYEE',
  })
  @IsOptional()
  @Validate(IsValidEnumValue, [RoleEnum])
  role: RoleEnum;

  @ApiProperty({
    type: String,
    example: 'MORNING12',
  })
  @IsOptional()
  @Validate(IsValidEnumValue, [ShiftEnum])
  shift: ShiftEnum;

  @ApiProperty({
    type: String,
    example: 'c6527fcc-2b70-4572-a415-7e74c6d0df65',
  })
  @IsOptional()
  @IsUUID()
  departmentId: string;

  @ApiProperty({ type: AuthUpdateDto, required: true })
  @IsObject()
  @ValidateNested()
  @Type(() => AuthUpdateDto)
  auth: AuthUpdateDto;
}
