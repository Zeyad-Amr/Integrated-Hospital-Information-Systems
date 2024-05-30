import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
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
    description: 'new password of the user',
    example: 'Admin1',
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @Matches(/.*[0-9].*/, {
    message: 'password must contain at least one number',
  })
  @Matches(/.*[A-Z].*/, {
    message: 'password must contain at least one uppercase letter',
  })
  password: string;

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
    example: 1,
  })
  @IsOptional()
  @IsInt()
  roleId: number;

  @ApiProperty({
    type: Array<Number>,
    example: [4],
  })
  @IsArray()
  @IsInt({ each: true })
  suDepartmentIds: number[];

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
