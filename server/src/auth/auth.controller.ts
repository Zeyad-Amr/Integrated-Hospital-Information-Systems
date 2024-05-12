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
import { LoginDto } from './dto/login-user.dto';
import { handleError } from '../shared/http-error';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
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
  @ApiOperation({
    summary:
      'get all users (used for debugging *should be removed in production*)',
  })
  @Get()
  @Public()
  async findAll() {
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
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get('me')
  @ApiOperation({ summary: "get user's data" })
  @ApiOkResponse({ description: 'get logged in user' })
  @ApiNotFoundResponse({ description: 'user not found' })
  async findMe(@Req() req: AuthRequest) {
    try {
      const { username } = req.user;
      const { email, employee } = await this.authService.findOne(username);
      return { auth: { email, username }, ...employee };
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
      const { username } = req.user;
      await this.authService.changePassword(
        username,
        changePasswordDto.newPassword,
        changePasswordDto.oldPassword,
      );
      return { message: 'password changed successfully' };
    } catch (error) {
      throw handleError(error);
    }
  }
}
