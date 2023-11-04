import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthRepo } from './auth.repo';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private authRepo: AuthRepo,
    private jwtService: JwtService,
  ) { }

  async login(loginUserDto: LoginUserDto) {
    try {
      const errInvalidCredentials = 'Invalid username or password';
      const user = await this.authRepo.getByUsername(loginUserDto.username);
      if (!user) {
        throw new UnauthorizedException(errInvalidCredentials);
      }
      const validPass = bcrypt.compare(loginUserDto.password, user.password);
      if (!validPass) {
        throw new UnauthorizedException(errInvalidCredentials);
      }
      const token = await this.jwtService.signAsync({
        sub: user.employeeId,
        username: user.username,
        role: user.employee.role
      });
      return token;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.authRepo.getAll();
  }

  hashPassword = async (password: string) => {
    //hash password using bcrypt package
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
  };
}
