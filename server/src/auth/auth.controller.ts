import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { handleError } from '../shared/http-error';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from '../shared/decorators/public.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthRequest } from './auth.interface';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // ******* this api for development only MUST be removed in production *******
  @ApiOperation({ summary: 'get all users (used for debugging *should be removed in production*)' })
  @Get()
  @Public()
  async findAll() {
    console.log(this.authService.generatePassword(8));
    return await this.authService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({ description: 'User logged in successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized user (invalid username or password)',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return { access_token: await this.authService.login(loginUserDto) };
    } catch (error) {
      throw handleError(error);
    }
  }

  @ApiOperation({ summary: "Change user's password" })
  @ApiOkResponse({ description: 'change the password of the user' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized user (invalid username or password)',
  })
  @HttpCode(HttpStatus.OK)
  @Post('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: AuthRequest,
  ) {
    try {
      const user = req.user;
      await this.authService.changePassword(
        user.username,
        changePasswordDto.newPassword,
        changePasswordDto.oldPassword,
      );
      return { message: 'password changed successfully' };
    } catch (error) {
      throw handleError(error);
    }
  }
}
