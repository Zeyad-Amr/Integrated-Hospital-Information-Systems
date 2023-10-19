import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepo } from './auth.repo';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepo,
    private jwtService: JwtService,
  ) { }

  async login(loginUserDto: LoginUserDto) {
    try {
      const errInvalidCredentials = 'Invalid username or password';
      const user = await this.userRepo.getByUsername(loginUserDto.username);
      if (!user) {
        throw new UnauthorizedException(errInvalidCredentials);
      }
      const validPass = bcrypt.compare(loginUserDto.password, user.password);
      if (!validPass) {
        throw new UnauthorizedException(errInvalidCredentials);
      }
      const token = await this.jwtService.signAsync({
        sub: user.staffId,
        username: user.username,
      });
      return token;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.userRepo.getAll();
  }

  hashPassword = async (password: string) => {
    //hash password using bcrypt package
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
  };
}
