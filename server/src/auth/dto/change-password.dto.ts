import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    type: String,
    description: 'old password of the user',
    example: 'Admin1234',
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({
    type: String,
    description: 'new password of the user',
    example: 'Admin1',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Matches(/.*[0-9].*/, {
    message: 'password must contain at least one number',
  })
  @Matches(/.*[A-Z].*/, {
    message: 'password must contain at least one uppercase letter',
  })
  newPassword: string;
}
