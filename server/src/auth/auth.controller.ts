import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { handleError } from '../shared/http-error';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // this api for development only MUST be removed in production
  @Get()
  async findAll() {
    return await this.authService.findAll();
  }

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
}
