import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login-user.dto';
import { AuthRepo } from './auth.repo';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private authRepo: AuthRepo,
    private jwtService: JwtService,
  ) { }



  async login(loginDto: LoginDto) {
    try {
      const errInvalidCredentials = 'Invalid username or password';
      const user = await this.authRepo.getByUsername(loginDto.username);
      if (!user) {
        throw new UnauthorizedException(errInvalidCredentials);
      }
      // console.log(user);

      const validPass = await bcrypt.compare(loginDto.password, user.password);
      // console.log(validPass);
      if (!validPass) {
        throw new UnauthorizedException(errInvalidCredentials);
      }
      const token = await this.jwtService.signAsync({
        sub: user.employeeId,
        username: user.username,
        role: user.employee.role.value,
      });
      return token;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(
    username: string,
    newPassword: LoginDto['password'],
    oldPassword: string,
  ) {
    try {
      const user = await this.authRepo.getByUsername(username);
      if (!user) throw new NotFoundException('Wrong username');

      const validPass = await bcrypt.compare(oldPassword, user.password);
      if (!validPass) throw new UnauthorizedException('Wrong password');

      newPassword = await this.hashPassword(newPassword);
      await this.authRepo.update(username, { password: newPassword });
    } catch (error) {
      throw error;
    }
  }

  async findOne(username: string) {
    try {
      const user = await this.authRepo.getByUsername(username);
      return user;
    } catch (error) {
      throw error;
    }
  }

  generateRandom = (length: number) => {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomValues = new Uint8Array(length);

    crypto.getRandomValues(randomValues);

    return Array.from(
      randomValues,
      (value) => charset[value % charset.length],
    ).join('');
  };

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
