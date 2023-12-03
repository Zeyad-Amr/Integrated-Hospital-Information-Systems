import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class AuthDataDto {
  @ApiProperty({
    type: String,
    description: 'employee username (required field)',
    example: 'Admin123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username: string;

  @ApiProperty({
    type: String,
    description: 'employee password (required field)',
    example: 'Admin1234',
  })
  @IsString()
  @IsOptional()
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
  email: string
}
