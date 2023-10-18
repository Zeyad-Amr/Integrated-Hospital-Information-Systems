import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    type: String,
    description: 'staff username (required field)',
    example: 'ahmed12',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    description: 'staff password (required field)',
    example: 'Raouf1234',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/.*[0-9].*/, {
    message: 'password must contain at least one number',
  })
  @Matches(/.*[A-Z].*/, {
    message: 'password must contain at least one uppercase letter',
  })
  password: string;
}
