import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { IsValidEnumValue } from 'src/shared/special-validator';
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
  @IsInt()
  roleId: number;

  @ApiProperty({
    type: String,
    example: 'MORNING12',
  })
  @IsOptional()
  @IsInt()
  shiftId: number;


  @ApiProperty({ type: AuthUpdateDto, required: true })
  @IsObject()
  @ValidateNested()
  @Type(() => AuthUpdateDto)
  auth: AuthUpdateDto;
}
