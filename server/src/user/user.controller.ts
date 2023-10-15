import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { handleError } from 'src/shared/http-error';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  // this api for development only MUST be removed in production
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return { access_token: await this.userService.login(loginUserDto) }
    } catch (error) {
      throw handleError(error)
    }
  }

}
