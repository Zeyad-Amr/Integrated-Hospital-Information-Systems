import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepo } from './user.repo';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepo,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    try {
      const errMsg = 'Invalid username or password';
      const exist = await this.userRepo.getByUsername(loginUserDto.username);
      if (!exist) {
        throw new UnauthorizedException(errMsg);
      }
      const validPass = bcrypt.compare(loginUserDto.password, exist.password);
      if (!validPass) {
        throw new UnauthorizedException(errMsg);
      }
      const token = await this.jwtService.signAsync({
        sub: exist.staffId,
        username: exist.username,
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
