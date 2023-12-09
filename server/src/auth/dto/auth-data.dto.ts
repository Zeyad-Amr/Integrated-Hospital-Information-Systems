import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, } from 'class-validator';
import { LoginDto } from './login-user.dto';

export class AuthDataDto extends LoginDto {

    @ApiProperty({
        type: String,
        example: 'ahmedraouf@gmail.com',
    })
    @IsOptional()
    @IsString()
    @IsEmail()
    email: string
}
