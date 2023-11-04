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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from '../shared/decorators/public.decorator';

@ApiTags('user')
@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // ******* this api for development only MUST be removed in production *******
  @Get()
  @Public()
  async findAll(@Req() req) {
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
}
