import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  Validate,
  ValidateNested,
} from 'class-validator';
import { LoginUserDto } from '../../auth/dto/login-user.dto';
import { CreatePersonDto } from 'src/person/dto/create-person.dto';
import { IsValidEnumValue } from 'src/shared/special-validator';
import { RoleEnum } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
  @ApiProperty({ type: CreatePersonDto, required: true })
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  personalData: CreatePersonDto;

  auth: LoginUserDto;

  @ApiProperty({
    type: String,
    example: 'RECEPTIONIST',
  })
  @IsNotEmpty()
  @Validate(IsValidEnumValue, [RoleEnum])
  role: RoleEnum;
}
